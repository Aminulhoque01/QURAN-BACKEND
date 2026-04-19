"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const quran_controller_1 = require("./quran.controller");
const quranRoutes = express_1.default.Router();
quranRoutes.get("/surahs", quran_controller_1.QuranController.getAllSurahs);
quranRoutes.get("/surahs/:id", quran_controller_1.QuranController.getSingleSurah);
exports.default = quranRoutes;
