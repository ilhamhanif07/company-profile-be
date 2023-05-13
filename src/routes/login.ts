import express, { Request, Response } from "express";
import db from "../database";

const router = express.Router();
router.post("/", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await db.one("SELECT * FROM users WHERE email = $1 AND password = $2", [
      email,
      password,
    ]);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Email atau password salah" });
  }
});

export default router;
