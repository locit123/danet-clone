import PlayIcon from "@assets/playicon.svg?react";
import { IMovieBannerSlide } from "@models/MovieBannerSlide.models";
import styles from "./BodySlide.module.scss";
import classNames from "classnames/bind";
import MovieMetaDataShare from "../movieMetaDataShare/MovieMetaDataShare";
const cx = classNames.bind(styles);
const BannerSlide = ({ logo, title, movie }: IMovieBannerSlide) => {
  return (
    <div className={cx("wrapper-body-slide-top")}>
      <div className={cx("box-img")}>
        <img
          draggable="false"
          src={movie?.poster}
          alt={movie?.title}
          className={cx("img-banner")}
        />
      </div>
      <div className={cx("wrapper-position")}>
        <div className={cx("wrapper-position-img")}>
          <img src={logo} alt="banner-2" className={cx("position-img")} />
        </div>
        <h4 className={cx("title")}>{title}</h4>
        {movie && <MovieMetaDataShare {...movie} />}
        <div className={cx("box-text-p")}>
          <p>{movie?.summary}</p>
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
