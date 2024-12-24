import classNames from "classnames/bind";

import styles from "./BodySlide.module.scss";
const cx = classNames.bind(styles);
import { FcNext, FcPrevious } from "react-icons/fc";
import { DATA_SLIDE } from "@utils/dataMovieSlide";
import { useEffect, useRef, useState } from "react";
import BannerSlide from "./BannerSlide";

const BodySlide = () => {
  const divContainerRef = useRef<HTMLDivElement>(null);
  const [indexItem, setIndexItem] = useState(0);
  const visibleItemsCount = 6;

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (indexItem + 1) % DATA_SLIDE.length;
      setIndexItem(nextIndex);
      if (nextIndex === 0) {
        scrollStart();
      } else if (nextIndex % visibleItemsCount === 0) {
        scrollNext();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [indexItem]);

  const handleClickIndex = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setIndexItem(index);

    if (index === 0) {
      scrollStart();
    } else if (index % visibleItemsCount === 0) {
      scrollNext();
    }
  };

  const scrollNext = () => {
    const container = divContainerRef.current;
    if (container) {
      const clientWidth = container.clientWidth;
      const scrollWidth = container.scrollWidth;
      const maxScroll = scrollWidth - clientWidth;
      const scrollLeft = container.scrollLeft;
      const next = Math.floor(
        (scrollWidth / DATA_SLIDE.length) * visibleItemsCount
      );
      container.scrollTo({
        behavior: "smooth",
        left: Math.min(scrollLeft + next, maxScroll),
      });
    }
  };

  const scrollStart = () => {
    const container = divContainerRef.current;
    if (container) {
      container.scrollTo({
        behavior: "smooth",
        left: 0,
      });
    }
  };

  const handleClickNext = () => {
    const container = divContainerRef.current;
    if (container) {
      const widthImage = container.children[0].clientWidth;
      const scrollLeft = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;
      const nextScrollLeft = Math.min(scrollLeft + widthImage + 10, maxScroll);

      container.scrollTo({
        behavior: "smooth",
        left: nextScrollLeft,
      });
    }
  };
  const handleClickPrev = () => {
    const container = divContainerRef.current;
    if (container) {
      const widthImage = container.children[0].clientWidth;
      const scrollLeft = container.scrollLeft;
      const prevScrollLeft = Math.max(scrollLeft - widthImage - 10, 0);
      container.scrollTo({
        behavior: "smooth",
        left: prevScrollLeft,
      });
    }
  };

  return (
    <div className={cx("wrapper-body-slide")}>
      <div className={cx("wrapper-banner-slide")}>
        <BannerSlide {...DATA_SLIDE[indexItem]} />
      </div>
      <div className={cx("wrapper-body-slide-bottom")}>
        <div className={cx("slide-show-items")} ref={divContainerRef}>
          {DATA_SLIDE.map((movie, index) => {
            return (
              <div
                key={movie.id}
                className={cx("slide-show-item")}
                onClick={(e) => handleClickIndex(e, index)}
              >
                <img
                  style={{
                    border:
                      index === indexItem ? "3px solid rgb(138, 191, 64)" : "",
                  }}
                  src={movie.horizontal_banner}
                  alt={`movie${movie.id}`}
                  className={cx("img-slide")}
                  loading="lazy"
                  draggable="false"
                />
              </div>
            );
          })}
        </div>
        <div className={cx("prev-slide")} onClick={handleClickPrev}>
          <FcPrevious color="red" size={50} className={cx("ic-prev")} />
        </div>
        <div className={cx("next-slide")} onClick={handleClickNext}>
          <FcNext color="red" size={50} className={cx("ic-next")} />
        </div>
      </div>
    </div>
  );
};

export default BodySlide;
