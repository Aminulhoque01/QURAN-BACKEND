import express from "express";
import { QuranController } from "./quran.controller";

const quranRoutes = express.Router();

quranRoutes.get("/surahs", QuranController.getAllSurahs);
quranRoutes.get("/surahs/:id", QuranController.getSingleSurah);
quranRoutes.get("/search", QuranController.searchAyah);

export default quranRoutes;