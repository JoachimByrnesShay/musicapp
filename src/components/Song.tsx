import React from 'react';

interface SongContainer {
    song: {
        name: string 
        cover: string 
        artist: string 
        audio: string 
        color: string[]
        id: string 
        active:boolean 
    }
}

const Song = ({song}: SongContainer) => {
    return (
        <div className="song-container">
            <img src={song.cover} alt={song.name}/>
            <h2>{song.name}</h2>
            <h3>{song.artist}</h3>
        </div>
    )
}

export default Song;