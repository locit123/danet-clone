import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./Header.module.scss";
import classNames from "classnames/bind";
import { FaSearch } from "react-icons/fa";
import Notification from "@assets/notification.svg?react";
import UserHeader from "@assets/user.svg?react";
import logo from "@assets/images/logo-danet.png";
import MenuIcon from "@assets/drawble.svg?react";
import {
  DataShareContext,
  IDataShareContext,
} from "src/providers/providerDataShare";
const cx = classNames.bind(styles);

const Header = () => {
  const contextDataShare = useContext(DataShareContext);
  const { setIsOpenMenu } = contextDataShare as IDataShareContext;
  const divInputRef = useRef<HTMLDivElement>(null);
  const [isClick, setIsClick] = useState(false);
  const [maxWidth, setMaxWidth] = useState("");

  const handleClickInput = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    const target = divInputRef.current;
    if (target) {
      const { width } = target.getBoundingClientRect();
      const widthClient = width.toFixed(2);
      if (isClick) {
        const maxWidthDiv = Math.min(Number(maxWidth), Number(widthClient));
        target.style.width = `${parseFloat(String(maxWidthDiv)) + 300}px`;
      } else {
        target.style.width = `${parseFloat(widthClient) + 300}px`;
        setIsClick(true);
      }
      target.style.transition = "width .3s linear";

      target.addEventListener("transitionend", () => {
        setMaxWidth(target.style.width);
      });
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const targetDivInputRef = divInputRef.current;
      const targetContainer: EventTarget | null = e.target;

      if (targetDivInputRef && targetContainer instanceof Node) {
        if (!targetDivInputRef.contains(targetContainer)) {
          const { width } = targetDivInputRef.getBoundingClientRect();
          const widthClient = width.toFixed(2);
          targetDivInputRef.style.width = `${parseFloat(widthClient) - 300}px`;
          setIsClick(false);
        }
      }
    };

    if (isClick) {
      window.addEventListener("click", (e) => handleOutsideClick(e));
    }

    return () => window.removeEventListener("click", handleOutsideClick);
  }, [isClick]);

  const handleClickMenu = () => {
    setIsOpenMenu(true);
  };
  return (
    <header className={cx("wrapper-header")}>
      <div className={cx("header")}>
        <div className={cx("header-left")}>
          <div className={cx("icon-menu")} onClick={handleClickMenu}>
            <MenuIcon className={cx("icon")} />
          </div>
          <div className={cx("parent-img")}>
            <img src={logo} alt="logo-header" className={cx("img-logo")} />
          </div>
          <ul className={cx("box-ul")}>
            <li className={cx("item-li")}>Miễn Phí</li>
            <li className={cx("item-li")}>Phim Gói</li>
            <li className={cx("item-li")}>Truyền Hình</li>
          </ul>
        </div>
        <div className={cx("header-right")}>
          <div className={cx("header-right-notify")}>
            <Notification className={cx("ic-size")} />
          </div>
          <div className={cx("bt-register")}>
            <p className={cx("text-register")}>Đăng kí gói</p>
          </div>
          <div
            className={cx("item-search")}
            ref={divInputRef}
            onClick={(e) => handleClickInput(e)}
          >
            <div className={cx("box-ic")}>
              <FaSearch className={cx("ic-input")} size={18.71} />
            </div>
            <div className={cx("box-input")}>
              <input className={cx("input")} />
            </div>
          </div>
          <div className={cx("item-user")}>
            <UserHeader className={cx("ic-size")} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
