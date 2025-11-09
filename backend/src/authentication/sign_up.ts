import crypto from "crypto";
import type { Request, Response } from "express";
import express from "express";
import { sendVerificationEmail } from "../authentication/email_verification.js";
import { supabase } from "../utils/supabaseClient.js";

const router = express.Router();

router.post("/signup", async (req: Request, res: Response) => {
  try {
    const { email, password, pin } = req.body;

    if (!email || !password || !pin) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const passwordStrength = checkPasswordStrength(password);
    if (passwordStrength !== "strong") {
      return res.status(400).json({ error: "Weak password. Please use a stronger password." });
    }

    function checkPasswordStrength(password: string): string {
      if (password.length < 8) return "weak";
      if (!/[A-Z]/.test(password)) return "weak";
      if (!/[a-z]/.test(password)) return "weak";
      if (!/[0-9]/.test(password)) return "weak";
      if (!/[!@#$%^&*.]/.test(password)) return "weak";
      return "strong";
    }

    const pinRegex = /^\d{4}$/;
    if (!pinRegex.test(pin)) {
      return res.status(400).json({ error: "Invalid PIN format. Please use a 4-digit PIN." });
    }

    const { data: existingUser, error: selectError } = await supabase
      .from("authentication")
      .select("email")
      .eq("email", email)
      .maybeSingle();

    if (selectError) throw selectError;
    if (existingUser) {
      return res.status(409).json({
        error: "Email is already connected to an account.",
      });
    }

    const hashedPassword = await hashPassword(password);

    const { data: newUser, error: insertError } = await supabase
      .from("authentication")
      .insert([
        {
          email,
          password: hashedPassword,
          pin: Number(pin),
          email_verified: false,
        },
      ])
      .select()
      .maybeSingle();

    if (insertError) throw insertError;

    const user_uuid = newUser!.uuid;
    const token = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();

    const { error: verificationError } = await supabase
      .from("email_verifications")
      .insert([
        {
          user_uuid,
          token,
          expires_at: expiresAt,
        },
      ]);

    if (verificationError) throw verificationError;

    await sendVerificationEmail(email, token);

    return res.status(201).json({
      message:
        "Check your inbox to proceed with email verification.",
      user: newUser,
    });
  } catch (err: any) {
    console.error("Signup error:", err);
    res.status(500).json({ error: err.message });
  }
});

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export default router;
