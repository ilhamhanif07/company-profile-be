import express, { Request, Response } from "express";
import usersRouter from "./routes/users";
import loginRouter from "./routes/login";

const app = express();
const cors = require("cors");

const port = 3001;

app.use(cors());
app.use(express.json());
app.use("/login", loginRouter);
app.use("/users", usersRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Kamu apa kabar ? xixixixi");
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
