import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./BodyContentTrending.module.scss";
import { DATA } from "@utils/dataMovieSlide";
import { FcNext, FcPrevious } from "react-icons/fc";
import {
  handleClickNext,
  handleClickPrev,
} from "@utils/generalFunction/GeneralFunction";
import RenderHoverMovie from "../renderHoverMovie/RenderHoverMovie";
const cx = classNames.bind(styles);
const BodyContentTrending = () => {
  const containerMovieRef = useRef<HTMLDivElement>(null);
  const [maxScroll, setMaxScroll] = useState(1);
  const [nextScroll, setNextScroll] = useState(0);
  const [indexItem, setIndexItem] = useState(-1);
  const [isHoverItem, setIsHoverItem] = useState(false);
  const timeRef = useRef<number | null>(null);

  useEffect(() => {
    if (containerMovieRef.current) {
      const target = containerMovieRef.current;
      console.log(target);
    }
  }, []);

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    idx: number
  ) => {
    if (timeRef.current) {
      clearTimeout(timeRef.current);
    }

    timeRef.current = setTimeout(() => {
      setIsHoverItem(true);
      setIndexItem(idx);
    }, 500);
  };
  const handleMouseLeave = () => {
    if (timeRef.current) {
      clearTimeout(timeRef.current);
    }

    timeRef.current = setTimeout(() => {
      setIsHoverItem(false);
      setIndexItem(-1);
    }, 500);
  };
  return (
    <div className={cx("wrapper-content-trending")}>
      <div className={cx("items-trending")} ref={containerMovieRef}>
        {DATA.map((movie, idx) => (
          <div
            className={cx("item")}
            key={idx}
            onMouseEnter={(e) => handleMouseEnter(e, idx)}
            onMouseLeave={handleMouseLeave}
          >
            <div className={cx("box-rank")}>
              <img src={movie.rank} alt="rank" className={cx("rank")} />
            </div>
            <div className={cx("box-img")}>
              <img src={movie.poster} alt="img" className={cx("img")} />
            </div>
            {isHoverItem &&
              indexItem === idx &&
              RenderHoverMovie({
                handleMouseEnter,
                handleMouseLeave,
                idx,
                movie,
                indexItem,
                isHoverItem: isHoverItem,
                className: cx(indexItem === idx ? "hover-movie-2" : ""),
                isTrigger: false,
              })}
          </div>
        ))}
      </div>
      {nextScroll !== 0 && (
        <div className={cx("prev-movie")}>
          <FcPrevious
            color="red"
            size={50}
            className={cx("ic-prev")}
            onClick={() =>
              handleClickPrev({
                containerMovieRef,
                nextScroll,
                setNextScroll,
                step: 5.8,
              })
            }
          />
        </div>
      )}
      {nextScroll < maxScroll && (
        <div className={cx("next-movie")}>
          <FcNext
            color="red"
            size={50}
            className={cx("ic-next")}
            onClick={() =>
              handleClickNext({
                containerMovieRef,
                nextScroll,
                setMaxScroll,
                setNextScroll,
                step: 5.8,
              })
            }
          />
        </div>
      )}
    </div>
  );
};

export default BodyContentTrending;
