import React, { useRef, useState } from "react";

import { DATA } from "@utils/dataMovieSlide";
import MovieMetaDataShare from "../movieMetaDataShare/MovieMetaDataShare";
import PlayIcon from "@assets/playicon.svg?react";
import HelpIcon from "@assets/helpicon.svg?react";
import classNames from "classnames/bind";
import styles from "./BodyContentTitle.module.scss";
import { FcNext, FcPrevious } from "react-icons/fc";
import {
  handleClickNext,
  handleClickPrev,
} from "@utils/generalFunction/GeneralFunction";
import { IMovie } from "@models/Movie.models";
const cx = classNames.bind(styles);

const BodyContentTitle = () => {
  const containerMovieRef = useRef<HTMLDivElement>(null);
  const [maxScroll, setMaxScroll] = useState(1);
  const [nextScroll, setNextScroll] = useState(0);
  const [indexItem, setIndexItem] = useState(-1);
  const [isHoverItem, setIsHover] = useState(false);
  const saveTimeoutRef = useRef<number | null>(null);

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    idx: number
  ) => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      setIsHover(true);
      setIndexItem(idx);
    }, 700);
  };
  const handleMouseLeave = () => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      setIsHover(false);
      setIndexItem(-1);
    }, 700);
  };

  const renderHover = (idx: number, movie: IMovie) => {
    if (isHoverItem && indexItem === idx) {
      return (
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
      );
    }
  };
  return (
    <div className={cx("wrapper-body-content")}>
      <div
        className={cx("box-movies", { isHoverItem })}
        ref={containerMovieRef}
      >
        {DATA.map((movie, idx) => {
          return (
            <div
              className={cx("box-movie", idx === indexItem ? "hoverItem" : "")}
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
              {renderHover(idx, movie)}
            </div>
          );
        })}
      </div>
      <>
        {nextScroll !== 0 && (
          <div className={cx("prev-movie")}>
            <FcPrevious
              color="red"
              size={50}
              className={cx("ic-prev")}
              onClick={() =>
                handleClickPrev({
                  containerMovieRef,
                  setNextScroll,
                  nextScroll,
                })
              }
            />
          </div>
        )}
      </>

      <>
        {nextScroll < maxScroll && (
          <div className={cx("next-movie")}>
            <FcNext
              color="red"
              size={50}
              className={cx("ic-next")}
              onClick={() =>
                handleClickNext({
                  containerMovieRef,
                  setMaxScroll,
                  setNextScroll,
                  nextScroll,
                })
              }
            />
          </div>
        )}
      </>
    </div>
  );
};

export default BodyContentTitle;
