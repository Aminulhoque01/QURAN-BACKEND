"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dns_1 = __importDefault(require("dns"));
// FIX DNS
dns_1.default.setServers(["8.8.8.8", "1.1.1.1"]);
dns_1.default.setDefaultResultOrder("ipv4first");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const quran_route_1 = __importDefault(require("./app/modules/quran/quran.route"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api", quran_route_1.default);
app.get("/", (req, res) => {
    res.send("Quran Server is Running");
});
const startServer = async () => {
    try {
        await mongoose_1.default.connect(process.env.DATABASE_URL);
        console.log("✅ MongoDB Connected");
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error("❌ DB Error:", error);
        process.exit(1);
    }
};
startServer();
