import React from "react";
import styles from "./BodyMovie2.module.scss";
import classNames from "classnames/bind";
import { BodyContentTrending, Heading } from "@components/common";
const cx = classNames.bind(styles);
const BodyMovie2 = () => {
  return (
    <div className={cx("wrapper-body-2")}>
      <Heading title="TOP 10 TRONG NGÀY" />
      <BodyContentTrending />
    </div>
  );
};

export default BodyMovie2;
