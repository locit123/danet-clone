import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { DATA } from "@utils/dataMovieSlide";
import classNames from "classnames/bind";
import styles from "./BodyContentTitle.module.scss";
import {
  handleClickNext,
  handleClickPrev,
} from "@utils/generalFunction/GeneralFunction";
import { ContextHover, IContextHover } from "src/providers/providerHover";
import NavigationComponent from "@components/NavigationComponent/NavigationComponent";
import { IMovie } from "@models/Movie.models";
import instanceAxios from "src/server/api";
const cx = classNames.bind(styles);

const BodyContentTitle = React.memo(() => {
  const containerMovieRef = useRef<HTMLDivElement>(null);
  const [maxScroll, setMaxScroll] = useState(1);
  const [nextScroll, setNextScroll] = useState(0);
  const timeRef = useRef<number>(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const [data, setData] = useState<IMovie[]>([]);

  const getApi = async () => {
    const res = await instanceAxios.get<IMovie[]>("http://localhost:3000/");
    setData(res.data);
  };
  useEffect(() => {
    getApi();
  }, []);

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

  //drag
  // Dragging logic
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const container = containerMovieRef.current;
    if (!container) return;

    isDragging.current = true;
    startX.current = e.pageX - container.offsetLeft;
    scrollLeft.current = container.scrollLeft;
    container.style.cursor = "grabbing";
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isDragging.current || !containerMovieRef.current) return;

    const container = containerMovieRef.current;
    const x = e.pageX - container.offsetLeft;
    const distance = x - startX.current;

    container.scrollLeft = scrollLeft.current - distance;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    if (containerMovieRef.current) {
      containerMovieRef.current.style.cursor = "grab";
    }
  };

  return (
    <div className={cx("wrapper-body-content")}>
      <div
        className={cx("box-movies")}
        ref={containerMovieRef}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {data.map((movie, idx) => {
          return (
            <div
              className={cx("item-movie")}
              key={idx}
              onMouseEnter={(e) => handleMouseEnter(e, idx)}
              onMouseLeave={handleMouseLeave}
            >
              <div className={cx("box-img")}>
                <img
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
