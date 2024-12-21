import React, { useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./BodyContentMovieVertical.module.scss";
import { FcNext, FcPrevious } from "react-icons/fc";
import { DATA } from "@utils/dataMovieSlide";
import PlayIcon from "@assets/playicon.svg?react";
import {
  handleClickNext,
  handleClickPrev,
} from "@utils/generalFunction/GeneralFunction";
const cx = classNames.bind(styles);
const BodyContentMovieVertical = () => {
  const containerMovieRef = useRef<HTMLDivElement>(null);
  const [nextScroll, setNextScroll] = useState(0);
  const [maxScroll, setMaxScroll] = useState(1);
  return (
    <div className={cx("wrapper-body-content-movie-vertical")}>
      <div className={cx("items-movie-vertical")} ref={containerMovieRef}>
        {DATA.map((movie, idx) => {
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
              <div className={cx("box-icon-play-hidden")}>
                <div className={cx("box-icon-play")}>
                  <PlayIcon className={cx("icon-play")} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {nextScroll !== 0 && (
        <div className={cx("prev-movie")}>
          <FcPrevious
            size={50}
            onClick={() =>
              handleClickPrev({
                containerMovieRef,
                nextScroll,
                setNextScroll,
                step: 3,
              })
            }
          />
        </div>
      )}
      {nextScroll < maxScroll && (
        <div className={cx("next-movie")}>
          <FcNext
            size={50}
            onClick={() =>
              handleClickNext({
                containerMovieRef,
                nextScroll,
                setMaxScroll,
                setNextScroll,
                step: 3,
              })
            }
          />
        </div>
      )}
    </div>
  );
};

export default BodyContentMovieVertical;
