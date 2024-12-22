import { BodyContentMovieVertical2, Heading } from "@components/common";
import React from "react";
import classNames from "classnames/bind";
import styles from "./BodyMovie4.module.scss";
const cx = classNames.bind(styles);
const BodyMovie4 = () => {
  return (
    <div className={cx("wrapper-body-3")}>
      <Heading title="PHIM GÓI - REMEMBERING ALAIN DELON" />
      <BodyContentMovieVertical2 />
    </div>
  );
};

export default BodyMovie4;
