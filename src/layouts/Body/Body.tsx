import classNames from "classnames/bind";
import styles from "./Body.module.scss";
import { BodySlide } from "@components/index";
import BodyMovie1 from "./BodyMovie1/BodyMovie1";
const cx = classNames.bind(styles);
const Body = () => {
  return (
    <div className={cx("wrapper-body")}>
      <BodySlide />
      <div className={cx("body-content")}>
        <div className={cx("body-overflow")}>
          <BodyMovie1 />
        </div>
      </div>
    </div>
  );
};

export default Body;
