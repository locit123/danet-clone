import React, { useCallback, useContext, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./BodyContentMovieAnime.module.scss";
import { DATA } from "@utils/dataMovieSlide";

import {
  handleClickNext,
  handleClickPrev,
} from "@utils/generalFunction/GeneralFunction";
import { ContextHover, IContextHover } from "src/providers/providerHover";
import NavigationComponent from "@components/NavigationComponent/NavigationComponent";
const cx = classNames.bind(styles);
const BodyContentMovieAnime = React.memo(() => {
  const containerMovieRef = useRef<HTMLDivElement>(null);
  const [nextScroll, setNextScroll] = useState(0);
  const [maxScroll, setMaxScroll] = useState(1);
  const timeRef = useRef<number>();
  //contextcontext
  const context = useContext(ContextHover);
  const {
    setIsBoundingRect,
    setCurrentItem,
    setIsToggle,
    setItemIndex,
    isBoundingRect,
    isToggle,
    itemIndex,
    currentItem,
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
      isBoundingRect,
      isToggle,
      itemIndex,
      setCurrentItem,
      setIsBoundingRect,
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
    <div className={cx("wrapper-content-movie-anime")}>
      <div className={cx("items-movie-anime")} ref={containerMovieRef}>
        {DATA.map((movie, idx) => {
          return (
            <div
              className={cx("item-anime")}
              key={idx}
              onMouseEnter={(e) => handleMouseEnter(e, idx)}
            >
              <div className={cx("box-img-anime")}>
                <img
                  src={movie.banner}
                  alt={`movie-${idx}`}
                  className={cx("img-anime")}
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

export default BodyContentMovieAnime;
