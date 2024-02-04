import { useState } from "react";
import "./styles/app.scss";
import Player from "./components/Player.jsx";
import Song from "./components/Song.tsx";
import Library from "./components/Library.jsx";
import data from "./data";
import Nav from "./components/Nav.jsx";

function App() {
  const [songs, setSongs] =
    useState(data());
  const [libraryOpen, setLibraryOpen] =
    useState(false);
  const [currentSong, setCurrentSong] =
    useState(songs[0]);
  const [songInfo, setSongInfo] =
    useState({
      currentTime: 0,
      duration: 0,
    });

  return (
    <div className="app">
      <Nav
        setLibraryOpen={setLibraryOpen}
      />
      <Song song={currentSong} />
      <Player
        song={currentSong}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
      />
      <Library
        songs={songs}
        setCurrentSong={setCurrentSong}
        currentSong={currentSong}
        setSongs={setSongs}
        libraryOpen={libraryOpen}
      />
    </div>
  );
}

export default App;
