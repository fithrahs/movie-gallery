interface ApiConfig {
  getMovieTopRated: string,
  getSearchMovie: string,
  getDetailMovie: string,
  getSearchKeyword: string,
}


export const DEFAULT_API_CONFIG: ApiConfig = {
  getMovieTopRated: 'movie/top_rated',
  getSearchMovie: 'search/movie',
  getDetailMovie: 'movie',
  getSearchKeyword: 'search/keyword',
}
