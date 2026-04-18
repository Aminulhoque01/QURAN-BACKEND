import { Schema, model } from "mongoose";
import { ISurah } from "./quran.interface";

const ayahSchema = new Schema({
  number: Number,
  arabicText: String,
  translation: String,
});

const surahSchema = new Schema<ISurah>({
  surahNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  arabicName: {
    type: String,
    required: true,
  },
  englishName: {
    type: String,
    required: true,
  },
  ayahs: [ayahSchema],
});

surahSchema.index({
  englishName: "text",
  "ayahs.translation": "text",
});

export const Surah = model<ISurah>(
  "Surah",
  surahSchema
);