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

    // make functions for correct email and password formats

    const { data: existingUser, error: selectError } = await supabase
        .from("authentication")
        .select("email")
        .eq("email", email)
        .maybeSingle();

        if (selectError) throw selectError;
        if (existingUser) {
        return res.status(409).json({ error: "Email is already connected to an account." });
        }

    await sendVerificationEmail(email); 

    const { data, error } = await supabase
      .from("authentication")
      .insert([
        {
          email,
          password: await hashPassword(password),
          pin: Number(pin), 
        },
      ])
      .select();

    if (error) throw error;

    return res.status(201).json({
      message: "Signup successful. Verification email sent.",
      user: data[0],
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}

export default router;