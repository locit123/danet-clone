import classNames from "classnames/bind";
import styles from "./Body.module.scss";
import { BodySlide } from "@components/index";
import BodyMovie1 from "./BodyMovie1/BodyMovie1";
import BodyMovie2 from "./BodyMovie2/BodyMovie2";
const cx = classNames.bind(styles);
const Body = () => {
  return (
    <div className={cx("wrapper-body")}>
      <BodySlide />
      <div className={cx("body-content")}>
        <div className={cx("body-overflow")}>
          <BodyMovie1 />
          <BodyMovie2 />
        </div>
      </div>
    </div>
  );
};

export default Body;
