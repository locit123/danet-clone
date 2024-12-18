import React from "react";
import GooglePlay from "@assets/images/google-play.png";
import AppStore from "@assets/images/app-store.png";
import FacebookIcon from "@assets/facebook.svg?react";
import LogoSale from "@assets/images/logoSaleNoti.png";
import Instagram from "@assets/intergram.svg?react";
import styles from "./Footer.module.scss";

import classNames from "classnames/bind";
const cx = classNames.bind(styles);
const Footer = () => {
  return (
    <footer className={cx("container-footer")}>
      <div className={cx("wrapper-footer")}>
        <div className={cx("wrapper-footer-content")}>
          <div className={cx("wrapper-footer-box")}>
            <ul className={cx("wrapper-footer-ul")}>
              <li className={cx("item-li")}>Giới Thiệu</li>
              <li className={cx("item-li")}>Quảng cáo</li>
              <li className={cx("item-li")}>Quyền riêng tư</li>
              <li className={cx("item-li")}>Điều khoản sử dụng</li>
              <li className={cx("item-li")}>Hướng dẫn sử dụng</li>
            </ul>
            <div className={cx("wrapper-footer-right")}>
              <p className={cx("title")}>Tải ứng dụng:</p>
              <div className={cx("box-img")}>
                <img alt="ch-play" src={GooglePlay} className={cx("img")} />
              </div>
              <div className={cx("box-img")}>
                <img alt="app-store" src={AppStore} className={cx("img")} />
              </div>
            </div>
          </div>
          <div className={cx("wrapper-footer-box-2")}>
            <div className={cx("box-icon")}>
              <div className={cx("ic-item")}>
                <FacebookIcon className={cx("icon")} />
              </div>
              <div className={cx("ic-item")}>
                <Instagram className={cx("icon")} />
              </div>
            </div>
            <div className={cx("box-text")}>
              <p className={cx("title-text")}>Công ty TNHH Hãng Phim Việt -</p>
              <p className={cx("title-text")}>Mã số doanh nghiệp: 0101356355</p>
            </div>
            <div>
              <p className={cx("title-text")}>
                Giấy phép cung cấp dịch vụ phát thanh, truyền hình trái tuyến số
                191/GP-BTTTT Do Bộ Thông tin và Truyền thông cấp ngày 04/05/2018
              </p>
            </div>
            <p className={cx("title-text")}>
              Người chịu trách nhiệm nội dung: Bà Ngô Thị Bích Hạnh
            </p>
            <p className={cx("title-text", "title-margin")}>
              Hợp tác cùng Công ty TNHH Bình Hạnh Đan
            </p>
            <p className={cx("title-text")}>
              Tầng 11 tòa nhà Hồng Hà Center, 25 Lý Thường Kiệt, Quận Hoàn Kiếm,
              Hà Nội
            </p>
          </div>
          <div className={cx("wrapper-footer-box-3")}>
            <div className={cx("box-img-sale")}>
              <img alt="logo-sale" src={LogoSale} className={cx("img-sale")} />
            </div>
            <p className={cx("box-p-footer")}>
              Copyright ©
              <a href="#" className={cx("a")}>
                DANET
              </a>
              2024.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
