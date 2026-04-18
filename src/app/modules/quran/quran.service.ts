import { calculatePagination } from "../../utils/pagination";
import { Surah } from "./quran.model";

const getAllSurahs = async () => {
  return await Surah.find().select(
    "surahNumber arabicName englishName"
  );
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

const searchAyahWithPagination = async (
  searchTerm: string,
  page = 1,
  limit = 10
) => {
  const { skip } = calculatePagination(page, limit);

  const filter = searchTerm
    ? {
        $text: {
          $search: searchTerm,
        },
      }
    : {};

  const [result, total] = await Promise.all([
    Surah.find(filter)
      .select(
        "surahNumber arabicName englishName ayahs"
      )
      .skip(skip)
      .limit(limit)
      .lean(),

    Surah.countDocuments(filter),
  ]);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
    },
    data: result,
  };
};

export const QuranService = {
  getAllSurahs,
  getSingleSurah,
  searchAyahWithPagination
};