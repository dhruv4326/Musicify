import React, { useEffect, useState } from "react";
import SongCard from "../components/SongCard";

const Home = ({ onPlaySong, onFavSong, songs, favorites }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-4 flex flex-col gap-4">
      {loading ? (
        <div className="text-white animate-pulse text-lg">Loading songs...</div>
      ) : (
        songs.map((song, index) => {
          const isFav = favorites.some((fav) => fav.title === song.title);

          return (
            <SongCard
              key={index}
              song={song}
              onPlay={() => {
                onPlaySong(song);
                const recent = JSON.parse(sessionStorage.getItem("recent")) || [];
                const updated = [song, ...recent.filter((s) => s.title !== song.title)].slice(0, 10);
                sessionStorage.setItem("recent", JSON.stringify(updated));
              }}
              onFav={() => onFavSong(song)}
              isFav={isFav} // ✅ Tells SongCard to render red or white heart
              isPlaying={false}
            />
          );
        })
      )}
    </div>
  );
};

export default Home;
