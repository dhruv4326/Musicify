import React, { useEffect, useState } from "react";
import SongCard from "../components/SongCard";

const RecentlyPlayed = ({ onPlaySong, onFavSong, favorites, currentSong, isPlaying }) => {
  const [recentSongs, setRecentSongs] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(sessionStorage.getItem("recent")) || [];
    setRecentSongs(stored);
  }, []);

  return (
    <div className="p-6 flex flex-col gap-4">
      {recentSongs.length > 0 ? (
        recentSongs.map((song, index) => {
          const isFav = favorites.some((s) => s.title === song.title);
          const isThisSongPlaying = currentSong?.title === song.title && isPlaying;

          return (
            <SongCard
              key={index}
              song={song}
              onPlay={(s, toggle) => onPlaySong(s, toggle)} 
              onFav={() => onFavSong(song)}
              isFav={isFav}
              isPlaying={isThisSongPlaying}
            />
          );
        })
      ) : (
        <p className="text-gray-300">No recently played songs yet.</p>
      )}
    </div>
  );
};

export default RecentlyPlayed;
