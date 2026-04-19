"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Surah = void 0;
const mongoose_1 = require("mongoose");
const ayahSchema = new mongoose_1.Schema({
    number: Number,
    arabicText: String,
    translation: String,
});
const surahSchema = new mongoose_1.Schema({
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
exports.Surah = (0, mongoose_1.model)("Surah", surahSchema);
