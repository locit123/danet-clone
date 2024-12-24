import { FcNext, FcPrevious } from "react-icons/fc";
import classNames from "classnames/bind";
import styles from "./NavigationComponent.module.scss";

const cx = classNames.bind(styles);
interface INavigationComponent {
  nextScroll: number;
  maxScroll: number;
  handleScrollPrev: () => void;
  handleScrollNext: () => void;
}

const NavigationComponent = ({
  maxScroll,
  nextScroll,
  handleScrollNext,
  handleScrollPrev,
}: INavigationComponent) => {
  return (
    <div>
      {nextScroll !== 0 && (
        <div className={cx("prev-movie")}>
          <FcPrevious
            color="red"
            size={50}
            className={cx("ic-prev")}
            onClick={handleScrollPrev}
          />
        </div>
      )}

      {nextScroll < maxScroll && (
        <div className={cx("next-movie")}>
          <FcNext
            color="red"
            size={50}
            className={cx("ic-next")}
            onClick={handleScrollNext}
          />
        </div>
      )}
    </div>
  );
};

export default NavigationComponent;
