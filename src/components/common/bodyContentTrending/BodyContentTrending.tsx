import React, { useCallback, useContext, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./BodyContentTrending.module.scss";
import { DATA } from "@utils/dataMovieSlide";
import {
  handleClickNext,
  handleClickPrev,
} from "@utils/generalFunction/GeneralFunction";
import { ContextHover, IContextHover } from "src/providers/providerHover";
import NavigationComponent from "@components/NavigationComponent/NavigationComponent";
const cx = classNames.bind(styles);
const BodyContentTrending = React.memo(() => {
  const containerMovieRef = useRef<HTMLDivElement>(null);
  const [maxScroll, setMaxScroll] = useState(1);
  const [nextScroll, setNextScroll] = useState(0);
  const timeRef = useRef<number>(0);

  //contextcontext
  const context = useContext(ContextHover);
  const {
    setIsBoundingRect,
    setIsToggle,
    setItemIndex,
    setCurrentItem,
    currentItem,
    isBoundingRect,
    itemIndex,
    isToggle,
  } = context as IContextHover;

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>, idx: number) => {
      console.log({ currentItem });

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

  const handleMouseLeave = () => {
    if (timeRef.current) {
      clearTimeout(timeRef.current);
    }
  };

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
    <div className={cx("wrapper-content-trending")}>
      <div className={cx("items-trending")} ref={containerMovieRef}>
        {DATA.map((movie, idx) => (
          <div
            className={cx("item")}
            key={idx}
            onMouseEnter={(e) => handleMouseEnter(e, idx)}
            onMouseLeave={handleMouseLeave}
          >
            <div className={cx("item-trending")}>
              <div className={cx("box-rank")}>
                <img src={movie.rank} alt="rank" className={cx("rank")} />
              </div>
              <div className={cx("box-img")}>
                <img src={movie.poster} alt="img" className={cx("img")} />
              </div>
            </div>
          </div>
        ))}
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

export default BodyContentTrending;
