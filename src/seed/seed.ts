import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import dns from "dns";
import { Surah } from "../app/modules/quran/quran.model";
import axios from "axios";

dotenv.config();

// Fix MongoDB Atlas DNS issue
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const seedQuranData = async () => {
  try {
    await mongoose.connect(
      process.env.DATABASE_URL as string
    );

    console.log("✅ Database connected");

    const { data } = await axios.get(
      "https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/quran_en.json"
    );

    console.log("✅ Quran data fetched");

    const formattedData = data.map(
      (surah: any) => ({
        surahNumber: surah.id,
        arabicName: surah.name,
        englishName: surah.transliteration,
        ayahs: surah.verses.map(
          (ayah: any) => ({
            number: ayah.id,
            arabicText: ayah.text,
            translation:
              ayah.translation,
          })
        ),
      })
    );

    await Surah.deleteMany({});
    await Surah.insertMany(formattedData);

    console.log(
      "✅ All 114 surahs seeded successfully"
    );

    process.exit(0);
  } catch (error) {
    console.log("❌ Seed Error", error);
    process.exit(1);
  }
};

seedQuranData();