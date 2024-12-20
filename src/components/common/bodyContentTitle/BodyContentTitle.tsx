import React, { useRef, useState } from "react";

import { DATA } from "@utils/dataMovieSlide";
import classNames from "classnames/bind";
import styles from "./BodyContentTitle.module.scss";
import { FcNext, FcPrevious } from "react-icons/fc";
import {
  handleClickNext,
  handleClickPrev,
} from "@utils/generalFunction/GeneralFunction";
import RenderHoverMovie from "../renderHoverMovie/RenderHoverMovie";
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

  return (
    <div className={cx("wrapper-body-content")}>
      <div
        className={cx("box-movies", { isHoverItem })}
        ref={containerMovieRef}
      >
        {DATA.map((movie, idx) => {
          return (
            <>
              {RenderHoverMovie({
                handleMouseEnter,
                handleMouseLeave,
                idx,
                indexItem,
                isHoverItem,
                movie,
              })}
            </>
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
                  step: 3,
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
                  step: 3,
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
