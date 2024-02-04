import { useState } from "react";

const LibrarySong = ({
  song,
  setCurrentSong,
  setSongs,
}) => {
  const songSelectHandler = () => {
    setCurrentSong({
      ...song,
      active: true,
    });
    setSongs((songs) =>
      songs.map((thisSong) => {
        return {
          ...thisSong,
          active:
            song.id === thisSong.id,
        };
      })
    );
  };

  const classes = song.active
    ? "library-song selected"
    : "library-song";

  return (
    <div
      onClick={songSelectHandler}
      className={classes}
    >
      <img
        src={song.cover}
        alt={song.name}
      />
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
