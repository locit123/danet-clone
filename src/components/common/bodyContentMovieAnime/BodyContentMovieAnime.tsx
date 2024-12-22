import React, { useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./BodyContentMovieAnime.module.scss";
import { FcNext, FcPrevious } from "react-icons/fc";
import { DATA } from "@utils/dataMovieSlide";
import MovieMetaDataShare from "../movieMetaDataShare/MovieMetaDataShare";
import PlayIcon from "@assets/playicon.svg?react";
import Helps from "@assets/helpicon.svg?react";
import {
  handleClickNext,
  handleClickPrev,
} from "@utils/generalFunction/GeneralFunction";
const cx = classNames.bind(styles);
const BodyContentMovieAnime = () => {
  const [hoverItemIndex, setHoverItemIndex] = useState(-1);
  const timeRef = useRef<number | null>(null);
  const containerMovieRef = useRef<HTMLDivElement>(null);
  const [nextScroll, setNextScroll] = useState(0);
  const [maxScroll, setMaxScroll] = useState(1);
  const handleMouseEnter = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    idx: number
  ) => {
    if (timeRef.current) {
      clearTimeout(timeRef.current);
    }

    timeRef.current = setTimeout(() => {
      setHoverItemIndex(idx);
    }, 700);
  };

  const handleMouseLeave = () => {
    if (timeRef.current) {
      clearTimeout(timeRef.current);
    }

    timeRef.current = setTimeout(() => {
      setHoverItemIndex(-1);
    }, 700);
  };
  return (
    <div className={cx("wrapper-content-movie-anime")}>
      <div className={cx("items-movie-anime")} ref={containerMovieRef}>
        {DATA.map((movie, idx) => {
          return (
            <div
              className={cx(
                "item-anime",
                hoverItemIndex === idx ? "hoverItem" : ""
              )}
              key={idx}
              onMouseEnter={(e) => handleMouseEnter(e, idx)}
              onMouseLeave={handleMouseLeave}
            >
              <div className={cx("box-img-anime")}>
                <img
                  src={movie.banner}
                  alt={`movie-${idx}`}
                  className={cx(
                    "img-anime",
                    hoverItemIndex === idx ? "hoverImage" : ""
                  )}
                />
              </div>
              {hoverItemIndex === idx && (
                <div className={cx("box-hidden")}>
                  <div className={cx("box-p-title")}>
                    <p className={cx("title-p")}>{movie.title}</p>
                  </div>
                  <MovieMetaDataShare {...movie} />
                  <div className={cx("box-bt")}>
                    <div className={cx("box-icon-play")}>
                      <PlayIcon className={cx("ic-play", "ic")} />
                      <p className={cx("bt-title")}>Xem ngay</p>
                    </div>
                    <div className={cx("box-icon-help")}>
                      <Helps className={cx("ic", "ic-help")} />
                      <p className={cx("bt-title", "bt-detail")}>Chi tiết</p>
                    </div>
                  </div>
                </div>
              )}
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

export default BodyContentMovieAnime;
