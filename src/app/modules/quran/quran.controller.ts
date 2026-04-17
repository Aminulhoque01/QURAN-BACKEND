import { Request, Response } from "express";
import { QuranService } from "./quran.service";
 

const getAllSurahs = async (
  req: Request,
  res: Response
) => {
  const result = await QuranService.getAllSurahs();

  res.status(200).json({
    success: true,
    message: "Surahs fetched successfully",
    data: result,
  });
};

const getSingleSurah = async (
  req: Request,
  res: Response
) => {
  const result = await QuranService.getSingleSurah(
    req.params.id as string
  );

  res.status(200).json({
    success: true,
    data: result,
  });
};

const searchAyah = async (
  req: Request,
  res: Response
) => {
  const result = await QuranService.searchAyah(
    req.query.q as string
  );

  res.status(200).json({
    success: true,
    data: result,
  });
};

export const QuranController = {
  getAllSurahs,
  getSingleSurah,
  searchAyah,
};