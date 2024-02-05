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
  songs,
  updateLibrarySelection,
}) => {
  const [
    durationReady,
    setDurationReady,
  ] = useState(false);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] =
    useState(false);
  const dragHandler = (e) => {
    if (songInfo.duration) {
      let currentTime = e.target.value;
      let duration = songInfo.duration;
      let newVal =
        (currentTime / duration) * 100;
      setSongInfo({
        currentTime: currentTime,
        duration: duration,
        animationPercentage: newVal,
      });
      audioRef.current.currentTime =
        e.target.value;
      console.log(e.target.value);
    }

    // const currentTime = e.targetValue;
    // const duration = songInfo.duration;
    // setSongInfo({
    //   ...songInfo,
    //   currentTime: e.target.value,
    //   animationPercentage:
    //     (currentTime / duration) * 100,
    // });
    // setSongInfo({
    //   ...songInfo,
    //   currentTime: e.target.value,
    // });
    // timeUpdateHandler(e);
  };

  const getTime = (time, duration) => {
    const mins = Math.floor(time / 60);
    const secs = (
      "0" + Math.floor(time % 60)
    ).slice(-2);
    return mins + ":" + secs;
  };

  const timeUpdateHandler = (e) => {
    let currentTime =
      e.target.currentTime;
    let duration =
      e.target.duration || "0";
    if (duration) {
      setDurationReady(true);
    } else {
      if (durationReady) {
        setDurationReady(false);
      }
    }
    // console.log(
    //   `${currentTime / duration}%`
    // );
    const newVal =
      ((currentTime / duration) * 100) |
      0;
    setSongInfo({
      currentTime: currentTime,
      duration: duration,
      animationPercentage: newVal,
    });
  };

  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
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

  const skipTrackHandler = (
    direction
  ) => {
    const currentIndex =
      songs.findIndex(
        (songObj) =>
          songObj.id === song.id
      );
    const indexOperand = {
      "skip-forward": currentIndex + 1,
      "skip-back":
        songs.length + currentIndex - 1,
    };
    const newIndex =
      indexOperand[direction] %
      songs.length;
    updateLibrarySelection(
      songs[newIndex]
    );
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>
          {getTime(
            songInfo.currentTime
          )}
        </p>
        <div
          style={{
            background: `linear-gradient(to right, ${song.color[0]}, ${song.color[1]})`,
          }}
          className="track"
        >
          <input
            type="range"
            value={songInfo.currentTime}
            min={0}
            max={songInfo.duration || 0}
            step="any"
            onChange={dragHandler}
            onClick={dragHandler}
          />
          <div
            className="animate-track"
            style={trackAnim}
          ></div>
        </div>

        <p
          className={`duration-p ${durationReady ? "duration-appear" : null}`}
        >
          <span>
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
          onClick={() =>
            skipTrackHandler(
              "skip-back"
            )
          }
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
          onClick={() =>
            skipTrackHandler(
              "skip-forward"
            )
          }
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
