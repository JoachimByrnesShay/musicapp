import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay, faAngleLeft, faAngleRight, faPause} from "@fortawesome/free-solid-svg-icons";
import {useState, useRef} from 'react';

const Player = ({setSongInfo, songInfo, song}) => {
    //const [currentSong, setCurrentSong] =useState(songs[0]);
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({...songInfo, currentTime:e.target.value})
    }

    const getTime = (time) => {
        const mins = Math.floor(time / 60);
        const secs = ("0" + Math.floor(time % 60)).slice(-2);
        return mins + ":" + secs;
    }

    const timeUpdateHandler = (e)=>{
        const currentTime = e.target.currentTime;
        const duration = e.target.duration;
        setSongInfo({currentTime: currentTime, duration: duration})
    }
    
    const playSongHandler = () => {
      if(isPlaying) {
              audioRef.current.pause();
      } else {
              audioRef.current.play();       
      }
      setIsPlaying(!isPlaying);
      console.log(audioRef);
    }
   
    return(
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <input 
                    type="range" 
                    value={songInfo.currentTime} 
                    min={0} 
                    max={songInfo.duration} 
                    step="any"
                    onChange={dragHandler}
                />
                <p>{getTime(songInfo.duration)}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft}/>
                <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={isPlaying ? faPause : faPlay}/>
                <FontAwesomeIcon className="skip-forward" size="2x" icon={faAngleRight}/>
            </div>
            <audio 
                ref={audioRef} 
                src={song.audio}
                onTimeUpdate={timeUpdateHandler}
                onLoadedMetadata={timeUpdateHandler}
                onEnded={playSongHandler}
            >
            </audio>
        </div>
    )
}

export default Player;