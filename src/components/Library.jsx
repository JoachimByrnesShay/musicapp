import LibrarySong from "./LibrarySong.jsx";

const Library = ({
  songs,
  setSongs,
  setCurrentSong,
}) => {
  return (
    <div className="library">
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((song) => {
          return (
            <LibrarySong
              key={song.id}
              song={song}
              setCurrentSong={
                setCurrentSong
              }
              setSongs={setSongs}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Library;
