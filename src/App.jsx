import { useState } from 'react'
import './styles/app.scss'
import Player from "./components/Player.jsx";
import Song from "./components/Song.tsx";
import Library from "./components/Library.jsx";
import data from "./data";

function App() {
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0.0,
    duration: 0.0
  });

  return (
    <div className="app">
      <Song 
         song={currentSong}
      />
      <Player 
        song={currentSong}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
      />
      <Library 
        songs={songs} 
        setCurrentSong={setCurrentSong}
      />
    </div>
  )
}

export default App
