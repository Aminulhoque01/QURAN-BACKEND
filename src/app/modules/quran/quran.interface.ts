export interface IAyah {
  number: number;
  arabicText: string;
  translation: string;
}

export interface ISurah {
  surahNumber: number;
  arabicName: string;
  englishName: string;
  ayahs: IAyah[];
}