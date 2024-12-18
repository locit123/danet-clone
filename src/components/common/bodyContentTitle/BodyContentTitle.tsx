import React, { useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./BodyContentTitle.module.scss";
import Banner from "@assets/images/test.jpg";
import { FcNext, FcPrevious } from "react-icons/fc";
import { DATA } from "@utils/dataMovie";
const cx = classNames.bind(styles);
interface IBodyContentTitleProps {
  title: string;
}
const BodyContentTitle = () => {
  const containerMovieRef = useRef<HTMLDivElement>(null);
  const [maxScroll, setMaxScroll] = useState(0);
  const [nextScroll, setNextScroll] = useState(0);
  console.log(maxScroll, nextScroll);

  const handleClickNext = () => {
    const container = containerMovieRef.current;
    if (container) {
      const widthImage = container.children[0].clientWidth;
      const scrollLeft = container.scrollLeft;

      const maxScroll = container.scrollWidth - container.clientWidth;
      const nextMovie = Math.min(scrollLeft + widthImage * 3, maxScroll);
      container.scrollTo({
        behavior: "smooth",
        left: nextMovie,
      });
      setMaxScroll(maxScroll);
      setNextScroll(nextMovie);
    }
  };

  const handleClickPrev = () => {
    const container = containerMovieRef.current;
    if (container) {
      const widthImage = container.children[0].clientWidth;
      const scrollLeft = container.scrollLeft;
      const prevMovie = Math.max(scrollLeft - widthImage * 3, 0);
      container.scrollTo({
        left: prevMovie,
        behavior: "smooth",
      });
      setNextScroll(prevMovie);
    }
  };
  return (
    <div className={cx("wrapper-body-content")}>
      <div className={cx("box-title")}>
        <p className={cx("title")}>SHOW HAY THỊNH HÀNH</p>
        <a href="#" className={cx("link")}>
          <p>Xem tất cả</p>
        </a>
      </div>
      {/* film movie */}
      <div style={{ position: "relative" }}>
        <div className={cx("box-container-movies")} ref={containerMovieRef}>
          {DATA.map((movie) => {
            return (
              <div className={cx("box-movie")} key={movie.uid}>
                <div className={cx("box-movie-item")}>
                  <img
                    src={movie.banner}
                    alt={movie.uid}
                    className={cx("img")}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {nextScroll !== 0 && (
          <div className={cx("prev-movie")}>
            <FcPrevious
              color="red"
              size={50}
              className={cx("ic-prev")}
              onClick={handleClickPrev}
            />
          </div>
        )}
        {nextScroll < maxScroll && (
          <div className={cx("next-movie")}>
            <FcNext
              color="red"
              size={50}
              className={cx("ic-next")}
              onClick={handleClickNext}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BodyContentTitle;
