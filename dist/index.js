"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("./routes/users"));
const login_1 = __importDefault(require("./routes/login"));
const app = (0, express_1.default)();
const cors = require("cors");
const port = 3001;
app.use(cors());
app.use(express_1.default.json());
app.use("/login", login_1.default);
app.use("/users", users_1.default);
app.get("/", (req, res) => {
    res.send("Kamu apa kabar ? xixixixi");
});
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map