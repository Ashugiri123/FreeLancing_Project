import { createContext, useContext, useMemo, useState } from "react";
import { requireSupabase } from "../config/supabase.js";

const AuthContext = createContext(null);
const USER_STORAGE_KEY = "univenda_user";

function getStoredUser() {
  const stored = localStorage.getItem(USER_STORAGE_KEY);
  return stored ? JSON.parse(stored) : null;
}

function setStoredUser(user) {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
}

function clearStoredUser() {
  localStorage.removeItem(USER_STORAGE_KEY);
}

function buildStudentProfile(formData) {
  const profilePhoto = formData.get("profilePhoto");
  const approvalDocument = formData.get("approvalDocument");

  return {
    alternatePhone: formData.get("alternatePhone") || "",
    collegeName: formData.get("collegeName") || "",
    course: formData.get("course") || "",
    graduationYear: formData.get("graduationYear") ? Number(formData.get("graduationYear")) : null,
    aadhaarNumber: formData.get("aadhaarNumber") || "",
    bankDetails: {
      accountNumber: formData.get("accountNumber") || "",
      ifsc: formData.get("ifsc") || ""
    },
    purpose: formData.get("purpose") || "",
    profilePhotoName: profilePhoto instanceof File ? profilePhoto.name : "",
    approvalDocumentName: approvalDocument instanceof File ? approvalDocument.name : "",
    isApproved: false
  };
}

function formDataToProfile(formData) {
  const role = formData.get("role");

  return {
    email: formData.get("email"),
    role,
    full_name: formData.get("fullName"),
    phone: formData.get("phoneNumber"),
    student_profile: role === "student" ? buildStudentProfile(formData) : null,
    customer_profile: role === "customer" ? { address: formData.get("address") || "" } : null
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

async function loadProfile(userId) {
  const supabase = requireSupabase();
  const { data, error } = await supabase.from("users").select("*").eq("id", userId).single();

  if (error) {
    console.error("[supabase] Profile lookup failed:", error.message);
    throw new Error("Could not load your profile. Check the users table and RLS policies.");
  }

  return data;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getStoredUser());

  async function login({ email, password, role }) {
    const supabase = requireSupabase();
    console.log(`[supabase] Signing in ${email}`);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.error("[supabase] Login failed:", error.message);
      throw new Error(error.message);
    }

    const profile = await loadProfile(data.user.id);

    if (profile.role !== role) {
      await supabase.auth.signOut();
      clearStoredUser();
      setUser(null);
      throw new Error("Invalid email, password, or role");
    }

    const appUser = toAppUser(profile);
    setStoredUser(appUser);
    setUser(appUser);
    return appUser;
  }

  async function register(formData) {
    const supabase = requireSupabase();
    const profile = formDataToProfile(formData);
    const password = formData.get("password");

    console.log(`[supabase] Signing up ${profile.email} as ${profile.role}`);

    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email: profile.email,
      password,
      options: {
        data: {
          role: profile.role,
          full_name: profile.full_name,
          phone: profile.phone,
          student_profile: profile.student_profile,
          customer_profile: profile.customer_profile
        }
      }
    });

    if (signUpError) {
      console.error("[supabase] Registration failed:", signUpError.message);
      throw new Error(signUpError.message);
    }

    if (!authData.user) {
      throw new Error("Registration failed. Supabase did not return a user.");
    }

    const profileRow = {
      id: authData.user.id,
      ...profile
    };

    if (authData.session) {
      const { data: savedProfile, error: profileError } = await supabase
        .from("users")
        .upsert(profileRow, { onConflict: "id" })
        .select()
        .single();

      if (profileError) {
        console.error("[supabase] Profile save failed:", profileError.message);
        throw new Error(profileError.message);
      }

      const appUser = toAppUser(savedProfile);
      setStoredUser(appUser);
      setUser(appUser);

      return { token: authData.session.access_token, user: appUser };
    }

    return {
      token: null,
      user: toAppUser(profileRow),
      message: "Registration submitted. Confirm your email before logging in."
    };
  }

  function logout() {
    try {
      const supabase = requireSupabase();
      supabase.auth.signOut();
    } catch (error) {
      console.warn("[supabase] Logout skipped:", error.message);
    }
    clearStoredUser();
    setUser(null);
  }

  const value = useMemo(() => ({ user, login, register, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
