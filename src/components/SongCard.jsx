import React from "react";
import { Heart } from "lucide-react";

const SongCard = ({ song, onPlay, onFav, isFav, isPlaying }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white/5 hover:bg-white/10 transition p-4 rounded-xl gap-3 w-full">
      {/* Thumbnail + Info */}
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <img
          src={song.thumbnail}
          alt={song.title}
          className="w-14 h-14 sm:w-16 sm:h-16 rounded object-cover flex-shrink-0"
        />
        <div className="min-w-0">
          <h3 className="text-white font-medium text-base truncate">{song.title}</h3>
          <p className="text-sm text-gray-400 truncate">{song.artistName}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-end gap-4 w-full sm:w-auto">
        <button onClick={onFav}>
          <Heart
            className={`w-5 h-5 transition ${
              isFav ? "text-red-500 fill-red-500" : "text-white"
            }`}
          />
        </button>

        <button
          onClick={onPlay}
          className="bg-green-500 hover:bg-green-600 text-white w-9 h-9 rounded-full flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SongCard;