"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuranService = void 0;
const quran_model_1 = require("./quran.model");
const getAllSurahs = async (query) => {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const search = query.search || "";
    const skip = (page - 1) * limit;
    const searchConditions = [];
    // string search
    searchConditions.push({ englishName: { $regex: search, $options: "i" } }, { arabicName: { $regex: search, $options: "i" } }, { "ayahs.translation": { $regex: search, $options: "i" } });
    // number search (IMPORTANT FIX)
    if (!isNaN(Number(search))) {
        searchConditions.push({
            surahNumber: Number(search),
        });
    }
    const filter = search ? { $or: searchConditions } : {};
    const data = await quran_model_1.Surah.find(filter)
        .select("surahNumber arabicName englishName")
        .skip(skip)
        .limit(limit)
        .sort({ surahNumber: 1 });
    const total = await quran_model_1.Surah.countDocuments(filter);
    return {
        data,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        },
    };
};
const getSingleSurah = async (id) => {
    const surahId = Number(id);
    if (isNaN(surahId)) {
        throw new Error("Invalid surah id");
    }
    return await quran_model_1.Surah.findOne({
        surahNumber: surahId,
    });
};
exports.QuranService = {
    getAllSurahs,
    getSingleSurah,
};
