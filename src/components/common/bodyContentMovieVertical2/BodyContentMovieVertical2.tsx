import React, { useCallback, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./BodyContentMovieVertical2.module.scss";
import { DATA } from "@utils/dataMovieSlide";
import PlayIcon from "@assets/playicon.svg?react";
import {
  handleClickNext,
  handleClickPrev,
} from "@utils/generalFunction/GeneralFunction";
import NavigationComponent from "@components/NavigationComponent/NavigationComponent";
import { IMovie } from "@models/Movie.models";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(styles);
const BodyContentMovieVertical2 = React.memo(() => {
  const containerMovieRef = useRef<HTMLDivElement>(null);
  const [nextScroll, setNextScroll] = useState(0);
  const [maxScroll, setMaxScroll] = useState(1);
  const navigate = useNavigate();

  const handleScrollPrev = useCallback(() => {
    handleClickPrev({ containerMovieRef, nextScroll, setNextScroll, step: 3 });
  }, [nextScroll]);

  const handleScrollNext = useCallback(() => {
    handleClickNext({
      containerMovieRef,
      nextScroll,
      setNextScroll,
      step: 3,
      setMaxScroll,
    });
  }, [nextScroll]);

  const handleClickVideo = (movie: IMovie) => {
    navigate(`detail-movie/${movie.slug}-${movie.uid}`, { state: movie });
  };
  return (
    <div className={cx("wrapper-body-content-movie-vertical")}>
      <div className={cx("items-movie-vertical")} ref={containerMovieRef}>
        {DATA.slice(0, 3).map((movie, idx) => {
          return (
            <div key={idx} className={cx("item-movie-vertical")}>
              <div className={cx("box-img-vertical")}>
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className={cx("img-vertical")}
                />
              </div>
              <div className={cx("box-title-vertical")}>
                <p className={cx("title-vertical")}>{movie.title}</p>
              </div>
              <div
                className={cx("box-icon-play-hidden")}
                onClick={() => handleClickVideo(movie)}
              >
                <div className={cx("box-icon-play")}>
                  <PlayIcon className={cx("icon-play")} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <NavigationComponent
        handleScrollNext={handleScrollNext}
        handleScrollPrev={handleScrollPrev}
        maxScroll={maxScroll}
        nextScroll={nextScroll}
      />
    </div>
  );
});

export default BodyContentMovieVertical2;
