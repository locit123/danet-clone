import React from "react";
import classNames from "classnames/bind";
import styles from "./BodyMovie5.module.scss";
import { BodyContentMovieAnime, Heading } from "@components/common";

const cx = classNames.bind(styles);
const BodyMovie5 = () => {
  return (
    <div className={cx("wrapper-body-5")}>
      <Heading title="ANIME MỚI HÀNG TUẦN" />
      <BodyContentMovieAnime />
    </div>
  );
};

export default BodyMovie5;
