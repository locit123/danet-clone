import React, { useCallback, useContext, useRef, useState } from "react";

import { DATA } from "@utils/dataMovieSlide";
import classNames from "classnames/bind";
import styles from "./BodyContentTitle.module.scss";
import {
  handleClickNext,
  handleClickPrev,
} from "@utils/generalFunction/GeneralFunction";
import { ContextHover, IContextHover } from "src/providers/providerHover";
import NavigationComponent from "@components/NavigationComponent/NavigationComponent";
const cx = classNames.bind(styles);

const BodyContentTitle = React.memo(() => {
  const containerMovieRef = useRef<HTMLDivElement>(null);
  const [maxScroll, setMaxScroll] = useState(1);
  const [nextScroll, setNextScroll] = useState(0);
  const timeRef = useRef<number>(0);
  //useContext
  const context = useContext(ContextHover);
  const {
    setIsBoundingRect,
    setItemIndex,
    setCurrentItem,
    setIsToggle,
    isToggle,
    currentItem,
    isBoundingRect,
    itemIndex,
  } = context as IContextHover;

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>, idx: number) => {
      const target = e.currentTarget;
      if (
        timeRef.current &&
        isBoundingRect &&
        isToggle &&
        currentItem &&
        itemIndex
      ) {
        clearTimeout(timeRef.current);
        setIsToggle(false);
        setCurrentItem(undefined);
        setIsBoundingRect(undefined);
        setItemIndex(0);
      }
      timeRef.current = setTimeout(() => {
        if (target) {
          setIsToggle(true);
          const { top, width, left } = target.getBoundingClientRect();
          setIsBoundingRect({ top, width, left });
          setItemIndex(idx);
          setCurrentItem(DATA[idx]);
        }
      }, 700);
    },
    [
      currentItem,
      isToggle,
      itemIndex,
      isBoundingRect,
      setIsBoundingRect,
      setCurrentItem,
      setIsToggle,
      setItemIndex,
    ]
  );

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
  return (
    <div className={cx("wrapper-body-content")}>
      <div className={cx("box-movies")} ref={containerMovieRef}>
        {DATA.map((movie, idx) => {
          return (
            <div
              className={cx("item-movie")}
              key={idx}
              onMouseEnter={(e) => handleMouseEnter(e, idx)}
            >
              <div className={cx("box-img")}>
                <img
                  src={movie.banner}
                  alt={`movie-${idx}`}
                  className={cx("img-movie")}
                />
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

export default BodyContentTitle;
