"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuranController = void 0;
const quran_service_1 = require("./quran.service");
const getAllSurahs = async (req, res) => {
    const result = await quran_service_1.QuranService.getAllSurahs(req.query);
    res.status(200).json({
        success: true,
        message: "Surahs fetched successfully",
        data: result.data,
        pagination: result.pagination,
    });
};
const getSingleSurah = async (req, res) => {
    const result = await quran_service_1.QuranService.getSingleSurah(req.params.id);
    res.status(200).json({
        success: true,
        data: result,
    });
};
exports.QuranController = {
    getAllSurahs,
    getSingleSurah,
};
