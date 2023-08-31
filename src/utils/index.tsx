import { IMovieTopRatedResult } from '@/interfaces/index';

// disini kita memfilter release date yang ada pada data menjadi sebuah arry yang unik / tidak duplikat
// contoh hasil dari variable year ini adalah [2021, 2022, 2023]
export const mapYear = (payload: IMovieTopRatedResult[]) => {
  return [...new Set(payload.map(item => new Date(item.release_date).getFullYear()))];
}
