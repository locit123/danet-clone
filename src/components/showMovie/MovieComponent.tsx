import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./MovieComponent.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { IMovie } from "@models/Movie.models";
import videoSRC from "@assets/videos/ForBiggerFun.mp4";
import BackIcon from "@assets/backLeftIcon.svg?react";
import PlayIcon from "@assets/playicon.svg?react";
import PlayVideo from "@components/PlayVideo/PlayVideo";
const cx = classNames.bind(styles);

const MovieComponent = () => {
  const [openOverlayVideo, setOpenOverlayVideo] = useState(false);
  const [isCursor, setIsCursor] = useState(false);
  const location = useLocation();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const movie = location.state;
  const navigate = useNavigate();
  const { qualifier, banner, title } = movie as IMovie;
  const timeoutRef = useRef<number | null>(null);
  useEffect(() => {
    // Hàm chạy khi chuột di chuyển
    const handleMouseMove = () => {
      setIsCursor(false);

      // Hủy timeout cũ nếu có
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Đặt timeout mới
      timeoutRef.current = window.setTimeout(() => {
        setOpenOverlayVideo(false);
        setIsCursor(true);
      }, 5000);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup khi component bị unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = () => setIsCursor(false);

    if (isCursor) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isCursor]);

  const handleMouseEnter = () => {
    setOpenOverlayVideo(true);
    setIsCursor(false);
  };

  //video
  // Play / Pause Video
  useEffect(() => {
    if (videoRef.current) {
      const volume = videoRef.current.volume;
      setVolume(volume);
    }
  }, []);

  const handlePlayPause = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying((prev) => !prev);
    }
  };

  const handleMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleChangeSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const timeValue = Number(e.target.value);
    const seekTime = (timeValue / 100) * duration;
    if (videoRef.current) {
      videoRef.current.currentTime = seekTime;
    }
    setCurrentTime(seekTime);
  };

  // Update volume
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const newVolume = Number(e.target.value) / 100;
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
    setVolume(newVolume);
  };

  const handleClickBack = () => {
    navigate("/");
  };

  const handleClickSound = () => {
    if (videoRef.current) {
      let volume;
      if (videoRef.current.volume) {
        volume = videoRef.current.volume = 0;
      } else {
        volume = videoRef.current.volume = 0.5;
      }
      setVolume(volume);
    }
  };

  const handleVideoEnd = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
    setIsPlaying(false);
  };

  const handleClickPrevNext = (type: "p" | "n") => {
    if (type === "p") {
      const newTime = Math.max(currentTime - 10, 0);
      if (videoRef.current) {
        videoRef.current.currentTime = newTime;
      }
      setCurrentTime(newTime);
    }
    if (type === "n") {
      const newTime = Math.min(currentTime + 10, duration);
      if (videoRef.current) {
        videoRef.current.currentTime = newTime;
      }
      setCurrentTime(newTime);
    }
  };
  return (
    <div
      className={cx("wrapper-movie-component", {
        "hidden-cursor": isCursor,
      })}
      onMouseEnter={handleMouseEnter}
    >
      {openOverlayVideo && (
        <div className={cx("overlay-container")}>
          <div
            className={cx("overlay-video")}
            onClick={(e) => handlePlayPause(e)}
          ></div>

          <div className={cx("overlay-video-box-top")}>
            <div className={cx("box-icon-back")} onClick={handleClickBack}>
              <BackIcon className={cx("icon-back")} />
            </div>
            <span>{title}</span>
          </div>
          {!isPlaying && (
            <div
              className={cx("box-icon-play-container")}
              onClick={(e) => handlePlayPause(e)}
            >
              <div className={cx("box-icon-play")}>
                <PlayIcon className={cx("icon-play")} />
              </div>
            </div>
          )}
          <div className={cx("box-play-video")}>
            <PlayVideo
              value={(currentTime / duration) * 100 || 0}
              handleChange={(e) => handleChangeSeek(e)}
              currentTime={currentTime}
              duration={duration}
              toggle={isPlaying}
              valueVolume={volume * 100}
              handleVolumeChange={(e) => handleVolumeChange(e)}
              toggleSound={volume === 0}
              handlePlayPause={(e) => handlePlayPause(e)}
              handleClickSound={handleClickSound}
              handleClickPrevNext={handleClickPrevNext}
            />
          </div>
        </div>
      )}
      <div className={cx("box-video")} onClick={(e) => handlePlayPause(e)}>
        <video
          ref={videoRef}
          className={cx("video")}
          poster={banner}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleMetadata}
          onEnded={handleVideoEnd}
        >
          <source src={videoSRC} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className={cx("box-position-top")}>
        <h4>{qualifier}</h4>
        <p>Cân nhắc về chủ đề, nội dung khi xem phim</p>
      </div>
    </div>
  );
};

export default MovieComponent;
