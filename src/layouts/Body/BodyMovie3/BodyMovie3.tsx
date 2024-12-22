import { BodyContentMovieVertical, Heading } from "@components/common";
import React from "react";
import classNames from "classnames/bind";
import styles from "./BodyMovie3.module.scss";
const cx = classNames.bind(styles);
const BodyMovie3 = () => {
  return (
    <div className={cx("wrapper-body-3")}>
      <Heading title="PHIM TRUNG HOA 2024" />
      <BodyContentMovieVertical />
    </div>
  );
};

export default BodyMovie3;
