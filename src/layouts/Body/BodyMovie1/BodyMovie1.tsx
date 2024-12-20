import { Heading } from "@components/common";
import classNames from "classnames/bind";
import styles from "./BodyMovie1.module.scss";
import BodyContentTitle from "@components/common/bodyContentTitle/BodyContentTitle";

import Img from "@assets/images/anhMovie.jpg";

const cx = classNames.bind(styles);

const BodyMovie1 = () => {
  return (
    <div className={cx("body-content-th")}>
      <Heading title="SHOW HAY THỊNH HÀNH" />
      <BodyContentTitle />
      <div className={cx("box-img-banner")}>
        <img src={Img} alt="qc" />
      </div>
    </div>
  );
};

export default BodyMovie1;
