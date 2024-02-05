import LibrarySong from "./LibrarySong.jsx";

const Library = ({
  songs,
  libraryOpen,
  updateLibrarySelection,
}) => {
  return (
    <div
      className={`library ${libraryOpen ? "library-open" : null}`}
    >
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((song) => {
          return (
            <LibrarySong
              key={song.id}
              song={song}
              updateLibrarySelection={
                updateLibrarySelection
              }
            />
          );
        })}
      </div>
    </div>
  );
};

export default Library;
