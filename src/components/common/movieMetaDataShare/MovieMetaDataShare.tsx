import styles from "./MovieMetaDataShare.module.scss";
import classNames from "classnames/bind";
import { IMovie } from "@models/Movie.models";
const cx = classNames.bind(styles);

type IMovieMetaDataShareProps = IMovie;
const MovieMetaDataShare = ({
  quality,
  qualifier,
  release_year,
  total_episodes,
}: IMovieMetaDataShareProps) => {
  return (
    <div className={cx("box-content")}>
      <div className={cx("box-content-item-hd", "box-content-item")}>
        <span className={cx("sp-hd")}>{quality}</span>
      </div>
      <div className={cx("box-content-item-t16", "box-content-item")}>
        <span className={cx("sp-t16")}>{qualifier}</span>
      </div>
      <div className={cx("box-content-item")}>
        <span className={cx("text")}>{release_year}</span>
      </div>
      <div className={cx("box-content-item")}>
        <span className={cx("text")}>{total_episodes} tập</span>
      </div>
    </div>
  );
};

export default MovieMetaDataShare;
