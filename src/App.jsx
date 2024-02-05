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
      animationPercentage: 0,
    });

  const updateLibrarySelection = (
    aSong
  ) => {
    setCurrentSong(aSong);
    setSongs(
      songs.map((mapSong) => {
        return {
          ...mapSong,
          active:
            mapSong.id === aSong.id,
        };
      })
    );
  };

  return (
    <div
      className={`app ${libraryOpen ? "library-active" : ""}`}
    >
      <Nav
        setLibraryOpen={setLibraryOpen}
      />
      <Song song={currentSong} />
      <Player
        songs={songs}
        song={currentSong}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        updateLibrarySelection={
          updateLibrarySelection
        }
      />
      <Library
        songs={songs}
        libraryOpen={libraryOpen}
        updateLibrarySelection={
          updateLibrarySelection
        }
      />
    </div>
  );
}

export default App;
