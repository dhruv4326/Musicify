import React from "react";
import SongCard from "../components/SongCard";
import blinding from "../assets/blinding.mp3";
import cover from "../assets/blinding.png";
import levitating from "../assets/Levitating.mp3";
import cover2 from "../assets/Levitating.jpg";

// Fix paths using a map
const assetMap = {
  "Blinding Lights": {
    musicUrl: blinding,
    thumbnail: cover,
  },
  "Levitating": {
    musicUrl: levitating,
    thumbnail: cover2,
  },
};

const Favourites = ({ onPlaySong, onFavSong, favorites, currentSong, isPlaying }) => {
  const fixedFavs = favorites.map((song) => ({
    ...song,
    ...assetMap[song.title],
  }));

  return (
    <div className="p-6 flex flex-col gap-4">
      {fixedFavs.length > 0 ? (
        fixedFavs.map((song, index) => {
          const isThisSongPlaying = currentSong?.title === song.title && isPlaying;

          return (
            <SongCard
              key={index}
              song={song}
              onPlay={(s, toggle) => onPlaySong(s, toggle)} 
              onFav={() => onFavSong(song)}
              isFav={true}
              isPlaying={isThisSongPlaying}
            />
          );
        })
      ) : (
        <p className="text-gray-300">No favourites added yet.</p>
      )}
    </div>
  );
};

export default Favourites;
