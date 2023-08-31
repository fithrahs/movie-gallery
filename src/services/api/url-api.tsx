interface ApiConfig {
  getMovieTopRated: string,
  getSearchMovie: string,
}


export const DEFAULT_API_CONFIG: ApiConfig = {
  getMovieTopRated: 'movie/top_rated',
  getSearchMovie: 'search/movie',
  
}
