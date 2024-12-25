import React, { useContext } from "react";
import classNames from "classnames/bind";
import styles from "./Navbar.module.scss";
import UserIcon from "@assets/user2.svg?react";
import CoinsIcon from "@assets/coinsIcon.svg?react";
import LockIcon from "@assets/lockIcon.svg?react";
import { FaSearch } from "react-icons/fa";
import {
  DataShareContext,
  IDataShareContext,
} from "src/providers/providerDataShare";
const cx = classNames.bind(styles);
const Navbar = () => {
  const contextDataShare = useContext(DataShareContext);
  const { isOpenMenu, setIsOpenMenu } = contextDataShare as IDataShareContext;
  const handleClickExistMenu = () => {
    setIsOpenMenu(false);
  };
  return (
    <div
      className={cx("wrapper-navbar", { isOpenMenu })}
      onClick={handleClickExistMenu}
    >
      <div
        className={cx("over-lay", { openMenu: isOpenMenu })}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={cx("o")}>
          <div className={cx("box", "box-1")}>
            <ul className={cx("box-ul")}>
              <li className={cx("li-ic-user", "li")}>
                <UserIcon className={cx("ic-user")} />
              </li>
              <li className={cx("li-title", "li")}>Xin chào khách</li>
            </ul>
            <div className={cx("box-bt")}>
              <div className={cx("bt-icon-title")}>
                <CoinsIcon className={cx("ic-coins")} />
                <p className={cx("bt-title")}>Đăng kí gói</p>
              </div>
            </div>
          </div>
          <div className={cx("box", "box-2")}>
            <div className={cx("box-search")}>
              <div className={cx("box-icon-search")}>
                <FaSearch className={cx("icon-search")} />
              </div>
              <input type="text" className={cx("ip-search")} />
            </div>
            <div className={cx("box-title-movie")}>
              <ul className={cx("box-movie-ul")}>
                <li className={cx("li-title")}>Miễn Phí</li>
                <li className={cx("li-title")}>Phim Gói</li>
                <li className={cx("li-title")}>Truyền Hình</li>
              </ul>
            </div>
          </div>
          <div className={cx("box", "box-3")}>
            <div className={cx("box-bt")}>
              <div className={cx("bt-icon-title")}>
                <LockIcon className={cx("ic-coins", "icon-lock")} />
                <p className={cx("bt-title", "title-dn")}>Đăng nhập</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
