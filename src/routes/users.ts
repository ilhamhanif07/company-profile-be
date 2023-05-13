import express, { Request, Response } from "express";
import db from "../database";

const router = express.Router();

// GET all users
router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await db.any("SELECT * FROM users");
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan" });
  }
});

// GET a user by ID
router.get("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const user = await db.one("SELECT * FROM users WHERE user_id = $1", id);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan" });
  }
});

// POST a new user
router.post("/", async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    const newUser = await db.one(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING user_id",
      [username, email, password]
    );
    res.json({ ...newUser, status: "ok" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan" });
  }
});

// PUT update user by ID
router.put("/", async (req: Request, res: Response) => {
  const { username, email, id, password } = req.body;
  try {
    const updatedUser = await db.one(
      "UPDATE users SET username = $1, email = $2, password = $3 WHERE id = $4 RETURNING *",
      [username, email, password, id]
    );
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan" });
  }
});

// DELETE a user by ID
router.delete("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    await db.none("DELETE FROM users WHERE id = $1", [id]);
    res.json({ message: "Pengguna berhasil dihapus" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan" });
  }
});

export default router;
