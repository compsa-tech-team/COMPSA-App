import crypto from "crypto";
import express, { type Request, type Response } from "express";
import { supabase } from "../utils/supabaseClient.js";

const router = express.Router();

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  return hashHex;
}

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Missing email or password" });
    }

    const { data: user, error: selectError } = await supabase
      .from("authentication")
      .select("uuid, email, password, pin, email_verified")
      .eq("email", email)
      .maybeSingle();

    if (selectError) throw selectError;
    if (!user) {
      return res.status(404).json({ error: "Account not found." });
    }

    const hashedInput = await hashPassword(password);
    if (hashedInput !== user.password) {
      return res.status(401).json({ error: "Invalid password." });
    }

    return res.status(200).json({
      message: "Login successful",
      user: {
        uuid: user.uuid,
        email: user.email,
        pin: user.pin,
      },
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
