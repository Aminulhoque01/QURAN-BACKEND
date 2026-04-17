import { Schema, model } from "mongoose";
import { ISurah } from "./quran.interface";

const ayahSchema = new Schema({
  number: {
    type: Number,
    required: true,
  },
  arabicText: {
    type: String,
    required: true,
  },
  translation: {
    type: String,
    required: true,
  },
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

export const Surah = model<ISurah>("Surah", surahSchema);