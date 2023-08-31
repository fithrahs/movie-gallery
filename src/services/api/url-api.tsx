interface ApiConfig {
  getMovieTopRated: string
}


export const DEFAULT_API_CONFIG: ApiConfig = {
  getMovieTopRated: 'movie/top_rated',
}
