import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
import {
  useState,
  useRef,
} from "react";

const Player = ({
  setSongInfo,
  songInfo,
  song,
}) => {
  //const [currentSong, setCurrentSong] =useState(songs[0]);
  const [
    durationReady,
    setDurationReady,
  ] = useState(false);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] =
    useState(false);
  const dragHandler = (e) => {
    audioRef.current.currentTime =
      e.target.value;
    setSongInfo({
      ...songInfo,
      currentTime: e.target.value,
    });
  };

  const getTime = (time, duration) => {
    const mins = Math.floor(time / 60);
    const secs = (
      "0" + Math.floor(time % 60)
    ).slice(-2);
    // if (
    //   duration &&
    //   mins == "0" &&
    //   secs == "00"
    // ) {
    //   return "  :  ";
    // } else if (!time && !duration) {
    //   return "0:00";
    // }
    return mins + ":" + secs;
  };

  const timeUpdateHandler = (e) => {
    let currentTime =
      e.target.currentTime;
    let duration =
      e.target.duration || 0;
    if (duration) {
      setDurationReady(true);
    } else {
      if (durationReady) {
        setDurationReady(false);
      }
    }
    setSongInfo({
      currentTime: currentTime,
      duration: duration,
    });
  };

  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
    console.log(audioRef);
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>
          {getTime(
            songInfo.currentTime
          )}
        </p>
        <input
          type="range"
          value={songInfo.currentTime}
          min={0}
          max={songInfo.duration || 0}
          step="any"
          onChange={dragHandler}
        />
        <p
          className={`duration-p ${durationReady ? "duration-appear" : null}`}
        >
          <span>
            {/* {getTime(
            songInfo.duration,
            Symbol("duration")
          ) || `\u2588`} */}
            {getTime(
              songInfo.duration,
              Symbol("duration")
            )}
          </span>
        </p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={
            isPlaying ? faPause : faPlay
          }
        />
        <FontAwesomeIcon
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
      <audio
        ref={audioRef}
        src={song.audio}
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={
          timeUpdateHandler
        }
        onEnded={playSongHandler}
        onLoadedData={() =>
          isPlaying
            ? audioRef.current.play()
            : null
        }
      ></audio>
    </div>
  );
};

export default Player;
