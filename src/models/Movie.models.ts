export interface IMovieGenres {
  id: number;
  name: string;
}
export interface IMovie {
  uid: string;
  slug: string;
  title: string;
  title_en: string;
  title_original: string | null;
  summary: string;
  imdb: null;
  quality: string;
  qualifier: string;
  release_year: number;
  orientation: string;
  total_episodes: number;
  count_episodes: number;
  duration: number | null;
  poster: string;
  banner: string;
  movie_genres?: IMovieGenres[];
}
