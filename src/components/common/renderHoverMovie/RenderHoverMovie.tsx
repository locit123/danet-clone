import React from "react";
import styles from "./RenderHoverMovie.module.scss";
import classNames from "classnames/bind";
import MovieMetaDataShare from "../movieMetaDataShare/MovieMetaDataShare";
import PlayIcon from "@assets/playicon.svg?react";
import HelpIcon from "@assets/helpicon.svg?react";
import { IMovie } from "@models/Movie.models";
const cx = classNames.bind(styles);

interface IRenderHoverMovieProps {
  idx: number;
  indexItem: number;
  movie: IMovie;
  handleMouseEnter: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    idx: number
  ) => void;
  handleMouseLeave: () => void;
  isHoverItem: boolean;
  className?: string;
}

const RenderHoverMovie = ({
  handleMouseEnter,
  handleMouseLeave,
  idx,
  indexItem,
  movie,
  isHoverItem = false,
  className,
}: IRenderHoverMovieProps) => {
  const classes = cx(
    "box-movie",
    idx === indexItem ? "hoverItem" : "",
    className ? { [className]: true } : undefined
  );
  return (
    <div
      className={classes}
      key={movie.uid}
      onMouseEnter={(e) => handleMouseEnter(e, idx)}
      onMouseLeave={handleMouseLeave}
    >
      <div className={cx("box-movie-item")}>
        <img
          src={movie.banner}
          alt={movie.uid}
          className={cx("img", {
            isHoverItem: indexItem === idx,
          })}
        />
      </div>
      {isHoverItem && indexItem === idx && (
        <div className={cx("box-hidden")}>
          <div className={cx("box-hidden-text")}>
            <h6>Hành Trình Kỳ Thú</h6>
            <MovieMetaDataShare {...movie} />
          </div>
          <div className={cx("box-bt")}>
            <div className={cx("bt")}>
              <PlayIcon className={cx("play-icon")} />
              <p className={cx("bt-text")}>Xem ngay</p>
            </div>
            <div className={cx("bt2")}>
              <HelpIcon className={cx("help-icon")} />
              <p className={cx("bt-text")}>Chi tiết</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RenderHoverMovie;
