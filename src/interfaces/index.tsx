export interface ISearchKeyword {
  "id": number,
  "name": string,
}

export interface IFlatrate {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
}
export interface IProvider {
  [key: string]: {
    link: string;
    flatrate: IFlatrate[];
  };
}

export interface IBelongsToCollection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

export interface IGenres {
  id: number;
  name: string;
}

export interface IProductCompanies {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface IProductCountries {
  iso_3166_1: string;
  name: string;
}

export interface ISpokenLanguages {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface IDetailMovie {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: IBelongsToCollection;
  budget: number;
  genres: IGenres[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: IProductCompanies[];
  production_countries: IProductCountries[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: ISpokenLanguages[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IMovieTopRatedResult {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IMovieTopRated {
  page: number;
  results: IMovieTopRatedResult[];
  total_pages: number;
  total_results: number;
}
