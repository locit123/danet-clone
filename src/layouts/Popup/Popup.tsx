import React from "react";
import classNames from "classnames/bind";
import styles from "./Popup.module.scss";
const cx = classNames.bind(styles);
import PlayIcon from "@assets/playicon.svg?react";
import HelpIcon from "@assets/helpicon.svg?react";
import { MovieMetaDataShare } from "@components/common";
import { IMovie } from "@models/Movie.models";
import { DATA } from "@utils/dataMovieSlide";
interface IPopupProps {
  setIsToggle: (value: React.SetStateAction<boolean>) => void;
  handleMouseLeave: () => void;
  isToggle: boolean;
  itemIndex: number;
  isVisible: boolean;
  style: {
    top: number | undefined;
    left: number | undefined;
    width: number | undefined;
  };
  currentItem: IMovie | undefined;
}

const Popup = ({
  handleMouseLeave,
  isToggle,
  setIsToggle,
  itemIndex,
  isVisible,
  style,
  currentItem,
}: IPopupProps) => {
  return (
    <div onMouseEnter={() => setIsToggle(true)} onMouseLeave={handleMouseLeave}>
      {isToggle && (
        <div
          className={cx(
            "popup",
            itemIndex === 0
              ? "first-child"
              : itemIndex === DATA.length - 1
              ? "last-child"
              : "",
            {
              show: isVisible,
            }
          )}
          style={{
            ...style,
            position: "absolute",
            bottom: "auto",
            cursor: "pointer",
          }}
        >
          <div className={cx("popup-img")}>
            <img
              src={currentItem?.banner}
              alt={`movie-${currentItem?.title}`}
              className={cx("img")}
            />
          </div>
          <div className={cx("popup-footer")}>
            <div className={cx("title-p")}>
              <h6 className={cx("p")}>{currentItem?.title}</h6>
            </div>
            {currentItem && <MovieMetaDataShare {...currentItem} />}
            <div className={cx("box-bt")}>
              <div className={cx("bt")}>
                <PlayIcon className={cx("icon")} />
                <p className={cx("bt-title")}>Xem ngay</p>
              </div>
              <div className={cx("bt", "bt-help")}>
                <HelpIcon className={cx("icon", "icon-help")} />
                <p className={cx("bt-title", "bt-title-2")}>Chi tiết</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popup;
