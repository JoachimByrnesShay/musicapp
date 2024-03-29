import { useState } from "react";

const LibrarySong = ({
  song,
  updateLibrarySelection,
}) => {
  const songSelectHandler = () => {
    updateLibrarySelection(song);
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
