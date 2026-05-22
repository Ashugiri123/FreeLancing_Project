import { supabase, supabaseAdmin, supabaseForToken } from "../config/supabase.js";

function filePath(file) {
  return file ? `/uploads/${file.filename}` : undefined;
}

function buildStudentProfile(body, files) {
  return {
    alternatePhone: body.alternatePhone,
    collegeName: body.collegeName,
    course: body.course,
    graduationYear: body.graduationYear ? Number(body.graduationYear) : null,
    aadhaarNumber: body.aadhaarNumber,
    bankDetails: {
      accountNumber: body.accountNumber,
      ifsc: body.ifsc
    },
    purpose: body.purpose,
    profilePhotoUrl: filePath(files?.profilePhoto?.[0]),
    approvalDocumentUrl: filePath(files?.approvalDocument?.[0])
  };
}

function toAppUser(profile) {
  return {
    id: profile.id,
    _id: profile.id,
    email: profile.email,
    role: profile.role,
    fullName: profile.full_name,
    phoneNumber: profile.phone,
    studentProfile: profile.student_profile,
    customerProfile: profile.customer_profile
  };
}

async function insertUserProfile({ authUser, session, body, files }) {
  const profile = {
    id: authUser.id,
    email: authUser.email,
    full_name: body.fullName,
    phone: body.phoneNumber,
    role: body.role,
    student_profile: body.role === "student" ? buildStudentProfile(body, files) : null,
    customer_profile: body.role === "customer" ? { address: body.address } : null
  };

  const client = process.env.SUPABASE_SERVICE_ROLE_KEY
    ? supabaseAdmin
    : session?.access_token
      ? supabaseForToken(session.access_token)
      : null;

  if (!client) {
    throw new Error(
      "Supabase did not return a registration session. Add SUPABASE_SERVICE_ROLE_KEY or disable email confirmation."
    );
  }

  console.log(`[auth] Inserting ${body.role} profile for ${authUser.email}`);

  const { data, error } = await client.from("users").insert(profile).select().single();

  if (error) {
    console.error("[auth] Supabase profile insert failed:", error.message);
    throw error;
  }

  return data;
}

export async function register(req, res) {
  try {
    const { fullName, email, password, phoneNumber, role, address } = req.body;
    console.log(`[auth] Registration request received for role=${role}, email=${email}`);

    if (!["student", "customer"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone: phoneNumber,
          role
        }
      }
    });

    if (signUpError) {
      console.error("[auth] Supabase signup failed:", signUpError.message);
      return res.status(400).json({ message: signUpError.message });
    }

    const authUser = authData.user;
    const profile = await insertUserProfile({
      authUser,
      session: authData.session,
      body: { ...req.body, fullName, phoneNumber, role, address },
      files: req.files
    });

    console.log(`[auth] Registration completed for ${authUser.email}`);

    return res.status(201).json({
      token: authData.session?.access_token ?? null,
      user: toAppUser(profile),
      message: authData.session ? undefined : "Registration saved. Confirm your email before logging in."
    });
  } catch (error) {
    console.error("[auth] Registration failed:", error.message);
    return res.status(500).json({ message: "Registration failed", error: error.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password, role } = req.body;
    console.log(`[auth] Login request received for role=${role}, email=${email}`);
    const { data: authData, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (signInError) {
      console.error("[auth] Supabase login failed:", signInError.message);
      return res.status(401).json({ message: "Invalid email, password, or role" });
    }

    const profileClient = supabaseForToken(authData.session.access_token);
    const { data: profile, error: profileError } = await profileClient
      .from("users")
      .select("*")
      .eq("id", authData.user.id)
      .single();

    if (profileError || !profile || profile.role !== role) {
      console.error("[auth] Login profile lookup failed:", profileError?.message || "Role mismatch or missing profile");
      return res.status(401).json({ message: "Invalid email, password, or role" });
    }

    return res.json({
      token: authData.session.access_token,
      user: toAppUser(profile)
    });
  } catch (error) {
    return res.status(500).json({ message: "Login failed", error: error.message });
  }
}

export function me(req, res) {
  return res.json({ user: req.user });
}
