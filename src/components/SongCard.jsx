import React from "react";
import { Heart, Pause, Play } from "lucide-react";

const SongCard = ({ song, onPlay, onFav, isFav, isPlaying }) => {
  return (
    <div className="flex items-center justify-between bg-white/10 hover:bg-white/20 backdrop-blur-md transition p-4 rounded-2xl gap-4 w-full">
      {/* Thumbnail & Info */}
      <div className="flex items-center gap-4 overflow-hidden">
        <img
          src={song.thumbnail}
          alt={song.title}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-md object-cover"
        />
        <div className="min-w-0">
          <h3 className="text-white font-semibold text-base truncate">{song.title}</h3>
          <p className="text-sm text-gray-300 truncate">{song.artistName}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <button onClick={onFav}>
          <Heart
            className={`w-5 h-5 transition ${
              isFav ? "text-red-500 fill-red-500" : "text-white"
            }`}
          />
        </button>

        <button
  onClick={() => onPlay(song, true)} // pass song + toggle intent
  className="bg-green-400 hover:bg-gray-200 text-black w-10 h-10 rounded-full flex items-center justify-center shadow-md"
>
  {isPlaying ? (
    <Pause className="w-5 h-5" />
  ) : (
    <Play className="w-5 h-5" />
  )}
</button>

      </div>
    </div>
  );
};

export default SongCard;
