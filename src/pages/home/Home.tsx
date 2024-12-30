import { Body, Footer, Header, Navbar, Popup } from "@layouts/index";
import React, { useCallback, useContext, useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import { ContextHover, IContextHover } from "src/providers/providerHover";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);
const Home = React.memo(() => {
  const context = useContext(ContextHover);
  const navigate = useNavigate();

  const {
    isBoundingRect,
    isToggle,
    currentItem,
    setIsToggle,
    setCurrentItem,
    setIsBoundingRect,
    setItemIndex,
    itemIndex,
  } = context as IContextHover;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isBoundingRect) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [isBoundingRect]);

  const style = {
    top: isBoundingRect && isBoundingRect.top + window.scrollY,
    left: isBoundingRect && isBoundingRect.left + window.scrollX,
    width: isBoundingRect && isBoundingRect.width,
  };

  const handleMouseLeave = useCallback(() => {
    setIsToggle(false);
    setCurrentItem(undefined);
    setIsBoundingRect(undefined);
    setItemIndex(0);
  }, [setCurrentItem, setIsBoundingRect, setItemIndex, setIsToggle]);
  const handleClickVideo = () => {
    navigate(`detail-movie/${currentItem?.slug}-${currentItem?.uid}`, {
      state: currentItem,
    });
  };
  return (
    <div>
      <Header />
      <div className={cx("content-body")}>
        <Body />
        <Footer />
        <Popup
          currentItem={currentItem}
          handleMouseLeave={handleMouseLeave}
          isToggle={isToggle}
          isVisible={isVisible}
          itemIndex={itemIndex}
          setIsToggle={setIsToggle}
          style={style}
          handleClick={handleClickVideo}
        />
        <Navbar />
      </div>
    </div>
  );
});

export default Home;
