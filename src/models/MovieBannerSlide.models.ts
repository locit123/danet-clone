import { IMovie } from "./Movie.models";

export interface IMovieBannerSlide {
  id: number;
  title: string;
  description: string;
  horizontal_banner: string;
  vertical_banner: string;
  ref_type: string;
  external_uri?: string;
  external_url?: string;
  logo?: string;
  movie?: IMovie;
}
