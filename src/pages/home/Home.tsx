import { Body, Footer, Header } from "@layouts/index";
import React from "react";
import classNames from "classnames/bind";
import styles from "./Home.module.scss";

const cx = classNames.bind(styles);
const Home = () => {
  return (
    <div>
      <Header />
      <div className={cx("content-body")}>
        <Body />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
