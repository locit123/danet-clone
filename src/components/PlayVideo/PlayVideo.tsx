import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./PlayVideo.module.scss";
import PlayIcon from "@assets/playicon.svg?react";
import NextMovieIcon from "@assets/nextMovieIcon.svg?react";
import SoundIcon from "@assets/sounIcon.svg?react";
import NextMiliseconIcon from "@assets/nextMilisecon.svg?react";
import PrevMiliseconIcon from "@assets/prevMilisecon.svg?react";
import SettingIcon from "@assets/settingIcon.svg?react";
import TabListIcon from "@assets/tabListIcon.svg?react";
import FullScreenIcon from "@assets/fullScreenIcon.svg?react";
import PauseIcon from "@assets/pauseIcon.svg?react";
import NoneSound from "@assets/noneSoundIcon.svg?react";

const cx = classNames.bind(styles);
interface IPlayVideo {
  value: number;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  currentTime: number;
  duration: number;
  toggle: boolean;
  valueVolume: number;
  handleVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  toggleSound: boolean;
  handlePlayPause: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  handleClickSound: () => void;
  handleClickPrevNext: (type: "p" | "n") => void;
}
const PlayVideo = ({
  handleChange,
  value,
  currentTime,
  duration,
  toggle,
  handleVolumeChange,
  valueVolume,
  toggleSound,
  handlePlayPause,
  handleClickSound,
  handleClickPrevNext,
}: IPlayVideo) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [isTooltipPosition, setIsTooltipPosition] = useState(0);
  const [hoverTime, setHoverTime] = useState(0);
  // Format time (hh:mm:ss)
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  const rangeStyle = {
    background: `linear-gradient(to right, var(--color-green) ${
      value + 2
    }%, rgba(0, 0, 0, 0.1) ${value}%)`,
  };

  const handleHover = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.stopPropagation();
    const target = e.target as HTMLInputElement;
    const rect = target.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const width = rect.width;
    // Tính số giây tại vị trí chuột
    const time = Math.floor((offsetX / width) * duration);
    setHoverTime(time);

    setIsTooltipPosition(offsetX);
    setIsTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setIsTooltipVisible(false);
  };
  return (
    <div className={cx("wrapper-play-video")}>
      {/* TOP */}
      <div className={cx("box-play-video-top")}>
        <span>{formatTime(currentTime)}</span>
        <div className={cx("box-range")}>
          <input
            value={value}
            onChange={handleChange}
            type="range"
            className={cx("ip-range")}
            min={0}
            max={100}
            style={rangeStyle}
            onMouseMove={(e) => handleHover(e)}
            onMouseLeave={handleMouseLeave}
          />
          {isTooltipVisible && (
            <div
              className={cx("tooltip")}
              style={{
                left: `${isTooltipPosition + 72}px`,
              }}
            >
              {formatTime(hoverTime)}
            </div>
          )}
        </div>
        <span>{formatTime(duration)}</span>
      </div>
      {/* BOTTOM */}
      <div className={cx("box-play-video-bottom")}>
        <div className={cx("box-left")}>
          <div className={cx("box-icon")} onClick={handlePlayPause}>
            {toggle ? (
              <PauseIcon className={cx("ic")} />
            ) : (
              <PlayIcon className={cx("ic")} />
            )}
          </div>
          <div className={cx("box-icon")}>
            <NextMovieIcon className={cx("ic")} />
          </div>
          <div className={cx("box-icon")} onClick={handleClickSound}>
            {toggleSound ? (
              <NoneSound className={cx("ic")} />
            ) : (
              <SoundIcon className={cx("ic")} />
            )}
          </div>
          <div className={cx("box-ip-sound")}>
            <input
              value={valueVolume}
              onChange={handleVolumeChange}
              type="range"
              min={0}
              max={100}
              className={cx("ip-sound")}
            />
          </div>
        </div>
        <div className={cx("box-right")}>
          <div className={cx("box-icon")}>
            <PrevMiliseconIcon
              className={cx("ic")}
              onClick={() => handleClickPrevNext("p")}
            />
          </div>
          <div className={cx("box-icon")}>
            <NextMiliseconIcon
              className={cx("ic")}
              onClick={() => handleClickPrevNext("n")}
            />
          </div>
          <div className={cx("box-right-title")}>
            <div className={cx("box-icon")}>
              <SettingIcon className={cx("ic")} />
            </div>
            <span>Chất lượng</span>
          </div>
          <div className={cx("box-right-title")}>
            <div className={cx("box-icon")}>
              <TabListIcon className={cx("ic")} />
            </div>
            <span>Danh sách tập</span>
          </div>
          <div className={cx("box-icon")}>
            <FullScreenIcon className={cx("ic")} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayVideo;
