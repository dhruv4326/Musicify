import React, { useRef, useEffect, useState } from "react";

const Player = ({ currentSong, onPause, onPlay, isPlaying }) => {
  const audioRef = useRef(null);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (audioRef.current && isPlaying) {
        setProgress(
          (audioRef.current.currentTime / audioRef.current.duration) * 100 || 0
        );
      }
    }, 500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.play();
      else audioRef.current.pause();
    }
  }, [currentSong, isPlaying]);

  const handleSeek = (e) => {
    if (audioRef.current) {
      const seekTo = (e.target.value / 100) * audioRef.current.duration;
      audioRef.current.currentTime = seekTo;
      setProgress(e.target.value);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white flex flex-col gap-2 px-4 sm:px-6 py-3 shadow-md z-50">
      <audio ref={audioRef} src={currentSong?.musicUrl} />
      {currentSong ? (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
            <div className="flex items-center gap-4 min-w-0">
              <img
                src={currentSong.thumbnail}
                alt={currentSong.title}
                className="w-12 h-12 rounded object-cover"
              />
              <div className="truncate">
                <p className="font-semibold truncate">{currentSong.title}</p>
                <p className="text-sm text-gray-400 truncate">{currentSong.artistName}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={isPlaying ? onPause : onPlay}
                className="text-2xl hover:text-green-400 transition"
              >
                {isPlaying ? "⏸️" : "▶️"}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                className="w-24"
              />
            </div>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleSeek}
            className="w-full h-1 bg-gray-600 accent-green-400 rounded cursor-pointer"
          />
        </>
      ) : (
        <p className="text-center text-sm text-gray-300">No song selected</p>
      )}
    </div>
  );
};

export default Player;