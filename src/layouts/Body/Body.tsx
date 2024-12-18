import React from "react";
import classNames from "classnames/bind";
import styles from "./Body.module.scss";
import { BodySlide } from "@components/index";
import BodyContentTitle from "@components/common/bodyContentTitle/BodyContentTitle";

const cx = classNames.bind(styles);
const Body = () => {
  return (
    <div className={cx("wrapper-body")}>
      <BodySlide />
      <div className={cx("body-content")}>
        <div className={cx("body-content-title")}>
          <BodyContentTitle />
        </div>
      </div>
    </div>
  );
};

export default Body;
