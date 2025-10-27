import express, { type Request, type Response } from "express";
import { supabase } from "../utils/supabaseClient.js";

const router = express.Router();

router.post("/pin-login", async (req: Request, res: Response) => {
  try {
    const { email, pin } = req.body;

    if (!email || !pin) {
      return res.status(400).json({ error: "Missing email or pin" });
    }

    const { data: user, error } = await supabase
      .from("authentication")
      .select("uuid, email, pin")
      .eq("email", email)
      .maybeSingle();

    if (error) throw error;
    if (!user) return res.status(404).json({ error: "User not found" });

    if (Number(pin) !== Number(user.pin)) {
      return res.status(401).json({ error: "Invalid pin" });
    }

    return res.status(200).json({
      message: "Pin login successful",
      user: {
        uuid: user.uuid,
        email: user.email,
      },
    });
  } catch (err: any) {
    console.error("Pin login error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;