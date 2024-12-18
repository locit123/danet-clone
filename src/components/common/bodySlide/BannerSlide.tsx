import React from "react";
import Banner2 from "@assets/images/test2.png";
import PlayIcon from "@assets/playicon.svg?react";
import styles from "./BodySlide.module.scss";
import classNames from "classnames/bind";
import { IMovie } from "@models/Movie.models";
const cx = classNames.bind(styles);
const BannerSlide = ({
  title,
  quality,
  qualifier,
  release_year,
  total_episodes,
  summary,
  banner,
}: IMovie) => {
  return (
    <div className={cx("wrapper-body-slide-top")}>
      <img
        draggable="false"
        src={banner}
        alt="test-img"
        className={cx("img-banner")}
      />
      <div className={cx("wrapper-position")}>
        <div className={cx("wrapper-position-img")}>
          <img src={Banner2} alt="banner-2" className={cx("position-img")} />
        </div>
        <h4 className={cx("title")}>{title}</h4>
        <div className={cx("box-content")}>
          <div className={cx("box-content-item-hd", "box-content-item")}>
            <span className={cx("sp-hd")}>{quality}</span>
          </div>
          <div className={cx("box-content-item-t16", "box-content-item")}>
            <span className={cx("sp-t16")}>{qualifier}</span>
          </div>
          <div className={cx("box-content-item")}>
            <span>{release_year}</span>
          </div>
          <div className={cx("box-content-item")}>
            <span>{total_episodes} tập</span>
          </div>
        </div>
        <div className={cx("box-text-p")}>
          <p>{summary}</p>
        </div>
        <button className={cx("bt")}>
          <PlayIcon className={cx("bt-icon")} />
          <p className={cx("bt-p")}>Xem ngay</p>
        </button>
      </div>
    </div>
  );
};

export default BannerSlide;
