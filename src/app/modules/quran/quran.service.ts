import { calculatePagination } from "../../utils/pagination";
import { Surah } from "./quran.model";

const getAllSurahs = async (query: any) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const search = query.search || "";

  const skip = (page - 1) * limit;

  const searchConditions: any[] = [];

  // string search
  searchConditions.push(
    { englishName: { $regex: search, $options: "i" } },
    { arabicName: { $regex: search, $options: "i" } },
    { "ayahs.translation": { $regex: search, $options: "i" } }
  );

  // number search (IMPORTANT FIX)
  if (!isNaN(Number(search))) {
    searchConditions.push({
      surahNumber: Number(search),
    });
  }

  const filter =
    search ? { $or: searchConditions } : {};

  const data = await Surah.find(filter)
    .select("surahNumber arabicName englishName")
    .skip(skip)
    .limit(limit)
    .sort({ surahNumber: 1 });

  const total = await Surah.countDocuments(filter);

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

const getSingleSurah = async (id: string) => {
  const surahId = Number(id);

  if (isNaN(surahId)) {
    throw new Error("Invalid surah id");
  }

  return await Surah.findOne({
    surahNumber: surahId,
  });
};

 

export const QuranService = {
  getAllSurahs,
  getSingleSurah,
   
};