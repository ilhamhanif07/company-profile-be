"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("../database"));
const router = express_1.default.Router();
// GET all users
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield database_1.default.any("SELECT * FROM users");
        res.json(users);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Terjadi kesalahan" });
    }
}));
// GET a user by ID
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const user = yield database_1.default.one("SELECT * FROM users WHERE user_id = $1", id);
        res.json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Terjadi kesalahan" });
    }
}));
// POST a new user
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    try {
        const newUser = yield database_1.default.one("INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING user_id", [username, email, password]);
        res.json(Object.assign(Object.assign({}, newUser), { status: "ok" }));
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Terjadi kesalahan" });
    }
}));
// PUT update user by ID
router.put("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, id, password } = req.body;
    try {
        const updatedUser = yield database_1.default.one("UPDATE users SET username = $1, email = $2, password = $3 WHERE id = $4 RETURNING *", [username, email, password, id]);
        res.json(updatedUser);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Terjadi kesalahan" });
    }
}));
// DELETE a user by ID
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        yield database_1.default.none("DELETE FROM users WHERE id = $1", [id]);
        res.json({ message: "Pengguna berhasil dihapus" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Terjadi kesalahan" });
    }
}));
exports.default = router;
//# sourceMappingURL=users.js.map