import React from "react";
import classNames from "classnames/bind";
import styles from "./Heading.module.scss";

const cx = classNames.bind(styles);

const Heading = ({ title }: { title: string }) => {
  return (
    <div className={cx("box-title")}>
      <p className={cx("title")}>{title}</p>
      <a href="#" className={cx("link")}>
        <p>Xem tất cả</p>
      </a>
    </div>
  );
};

export default Heading;
