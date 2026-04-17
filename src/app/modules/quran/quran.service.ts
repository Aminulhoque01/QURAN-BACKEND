import { Surah } from "./quran.model";

const getAllSurahs = async () => {
  return await Surah.find().select(
    "surahNumber arabicName englishName"
  );
};

const getSingleSurah = async (id: string) => {
  return await Surah.findOne({
    surahNumber: Number(id),
  });
};

const searchAyah = async (text: string) => {
  return await Surah.find({
    "ayahs.translation": {
      $regex: text,
      $options: "i",
    },
  });
};

export const QuranService = {
  getAllSurahs,
  getSingleSurah,
  searchAyah,
};