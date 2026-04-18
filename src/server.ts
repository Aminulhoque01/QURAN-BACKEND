import dotenv from "dotenv";
dotenv.config();

import dns from "dns";

// FIX DNS
dns.setServers(["8.8.8.8", "1.1.1.1"]);
dns.setDefaultResultOrder("ipv4first");

import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import quranRoutes from "./app/modules/quran/quran.route";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api", quranRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Quran Server is Running");
});

const startServer = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL as string);

    console.log("✅ MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ DB Error:", error);
    process.exit(1);
  }
};

startServer();