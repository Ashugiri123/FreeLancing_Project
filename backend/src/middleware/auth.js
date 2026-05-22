import { supabase, supabaseForToken } from "../config/supabase.js";

export async function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;

    if (!token) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const { data: authData, error: authError } = await supabase.auth.getUser(token);

    if (authError || !authData.user) {
      return res.status(401).json({ message: "Invalid session" });
    }

    const profileClient = supabaseForToken(token);
    const { data: profile, error: profileError } = await profileClient
      .from("users")
      .select("*")
      .eq("id", authData.user.id)
      .single();

    if (profileError || !profile) {
      return res.status(401).json({ message: "Invalid session" });
    }

    req.user = {
      id: profile.id,
      _id: profile.id,
      email: profile.email,
      role: profile.role,
      fullName: profile.full_name,
      phoneNumber: profile.phone,
      studentProfile: profile.student_profile,
      customerProfile: profile.customer_profile
    };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired session" });
  }
}

export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "You do not have access to this route" });
    }

    next();
  };
}
