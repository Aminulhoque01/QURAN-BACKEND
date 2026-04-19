"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const dns_1 = __importDefault(require("dns"));
const quran_model_1 = require("../app/modules/quran/quran.model");
const axios_1 = __importDefault(require("axios"));
dotenv_1.default.config();
// Fix MongoDB Atlas DNS issue
dns_1.default.setServers(["8.8.8.8", "1.1.1.1"]);
const seedQuranData = async () => {
    try {
        await mongoose_1.default.connect(process.env.DATABASE_URL);
        console.log("✅ Database connected");
        const { data } = await axios_1.default.get("https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/quran_en.json");
        console.log("✅ Quran data fetched");
        const formattedData = data.map((surah) => ({
            surahNumber: surah.id,
            arabicName: surah.name,
            englishName: surah.transliteration,
            ayahs: surah.verses.map((ayah) => ({
                number: ayah.id,
                arabicText: ayah.text,
                translation: ayah.translation,
            })),
        }));
        await quran_model_1.Surah.deleteMany({});
        await quran_model_1.Surah.insertMany(formattedData);
        console.log("✅ All 114 surahs seeded successfully");
        process.exit(0);
    }
    catch (error) {
        console.log("❌ Seed Error", error);
        process.exit(1);
    }
};
seedQuranData();
