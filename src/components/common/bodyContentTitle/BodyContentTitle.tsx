import React, { useCallback, useContext, useRef, useState } from "react";

import { DATA } from "@utils/dataMovieSlide";
import classNames from "classnames/bind";
import styles from "./BodyContentTitle.module.scss";
import {
  handleClickNext,
  handleClickPrev,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
} from "@utils/generalFunction/GeneralFunction";
import { ContextHover, IContextHover } from "src/providers/providerHover";
import NavigationComponent from "@components/NavigationComponent/NavigationComponent";
import { useNavigate } from "react-router-dom";
import { IMovie } from "@models/Movie.models";

const cx = classNames.bind(styles);

const BodyContentTitle = React.memo(() => {
  const containerMovieRef = useRef<HTMLDivElement>(null);
  const [maxScroll, setMaxScroll] = useState(1);
  const [nextScroll, setNextScroll] = useState(0);
  const timeRef = useRef<number>(0);
  const isDragging = useRef(false);
  const [isDrag, setIsDrag] = useState(0);
  const startX = useRef(0);
  const navigate = useNavigate();

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
      if (isDragging.current) return;
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

  const handleMouseLeave = () => {
    if (containerMovieRef.current) {
      containerMovieRef.current.style.cursor = "grab";
    }

    if (timeRef.current) {
      clearTimeout(timeRef.current);
    }
  };

  const handleScrollPrev = useCallback(() => {
    handleClickPrev({
      containerMovieRef,
      nextScroll,
      setNextScroll,
      step: 3,
    });
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

  // Dragging logic
  const mouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    handleMouseDown({ containerMovieRef, e, isDragging, startX });
  };

  const mouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    handleMouseMove({
      containerMovieRef,
      e,
      isDrag,
      isDragging,
      scrollTo: 10,
      setIsDrag,
      startX,
    });
  };

  const mouseUp = () => {
    handleMouseUp({ containerMovieRef, isDragging });
  };
  const handleClickVideo = (movie: IMovie) => {
    navigate(`detail-movie/${movie.slug}-${movie.uid}`, { state: movie });
  };
  return (
    <div className={cx("wrapper-body-content")}>
      <div
        className={cx("box-movies")}
        ref={containerMovieRef}
        onMouseLeave={handleMouseLeave}
        onMouseDown={mouseDown}
        onMouseMove={mouseMove}
        onMouseUp={mouseUp}
      >
        {DATA.map((movie, idx) => {
          return (
            <div
              className={cx("item-movie")}
              key={idx}
              onMouseEnter={(e) => handleMouseEnter(e, idx)}
              onMouseLeave={handleMouseLeave}
            >
              <div className={cx("box-img")}>
                <img
                  onClick={() => handleClickVideo(movie)}
                  loading="lazy"
                  draggable={false}
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
