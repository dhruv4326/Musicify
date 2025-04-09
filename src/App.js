import React, { useState, useEffect, useRef } from "react";
import ColorThief from "color-thief-browser";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Home from "./pages/Home";
import Favourites from "./pages/Favourites";
import songs from "./data/songs";

function App() {
  const [currentPage, setCurrentPage] = useState("Home");
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [bgStyle, setBgStyle] = useState({
    backgroundImage: "linear-gradient(to bottom right, #0f0f0f, #1e1e1e)",
  });
  const [currentIndex, setCurrentIndex] = useState(0);

  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const storedFavs = JSON.parse(localStorage.getItem("favourites")) || [];
    setFavorites(storedFavs);
  }, []);

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (audioRef.current && isPlaying) {
        setProgress(
          (audioRef.current.currentTime / audioRef.current.duration) * 100 || 0
        );
        setCurrentTime(audioRef.current.currentTime);
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

  const handlePlaySong = (song) => {
    const index = songs.findIndex((s) => s.title === song.title);
    setCurrentIndex(index);
    setCurrentSong(song);
    setIsPlaying(true);

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = song.thumbnail;

    img.onload = () => {
      try {
        const colorThief = new ColorThief();
        const [r, g, b] = colorThief.getColor(img);

        const lighten = (x) => Math.min(Math.floor(x * 1.3), 255);
        const base = `rgb(${r}, ${g}, ${b})`;
        const lighter = `rgb(${lighten(r)}, ${lighten(g)}, ${lighten(b)})`;

        setBgStyle({
          backgroundImage: `linear-gradient(to bottom right, ${base}, ${lighter})`,
        });
      } catch (err) {
        setBgStyle({
          backgroundImage: "linear-gradient(to bottom right, #0f0f0f, #1e1e1e)",
        });
      }
    };
  };

  const handlePause = () => setIsPlaying(false);
  const handlePlay = () => setIsPlaying(true);

  const handlePrev = () => {
    const newIndex = (currentIndex - 1 + songs.length) % songs.length;
    setCurrentIndex(newIndex);
    setCurrentSong(songs[newIndex]);
    setIsPlaying(true);
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % songs.length;
    setCurrentIndex(newIndex);
    setCurrentSong(songs[newIndex]);
    setIsPlaying(true);
  };

  const handleFavSong = (song) => {
    const isFav = favorites.some((s) => s.title === song.title);
    const updated = isFav
      ? favorites.filter((s) => s.title !== song.title)
      : [...favorites, song];

    setFavorites(updated);
  };

  const filteredSongs = songs.filter((song) =>
    song.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSeek = (e) => {
    if (audioRef.current) {
      const seekTo = (e.target.value / 100) * audioRef.current.duration;
      audioRef.current.currentTime = seekTo;
      setProgress(e.target.value);
    }
  };

  const formatTime = (time) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <div className="flex flex-col h-screen" style={bgStyle}>
      {showSidebar && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex md:hidden">
          <div className="w-64 bg-black border-r border-gray-800 p-4">
            <Sidebar
              currentPage={currentPage}
              setCurrentPage={(page) => {
                setCurrentPage(page);
                setShowSidebar(false);
              }}
            />
          </div>
          <div className="flex-1" onClick={() => setShowSidebar(false)} />
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        <div className="hidden md:block w-1/5 bg-black border-r border-gray-800">
          <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>

        <div className="flex-1 flex flex-col overflow-y-auto">
          <Header title={currentPage} onToggleSidebar={() => setShowSidebar(true)} />
          <div className="p-4">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 rounded bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <main className="flex-1 px-4 pb-28 overflow-y-auto">
            {currentPage === "Home" && (
             <Home
             onPlaySong={handlePlaySong}
             onFavSong={handleFavSong}
             songs={filteredSongs}
             favorites={favorites}
             currentSong={currentSong}
             isPlaying={isPlaying}
           />
           
            )}
            {currentPage === "Favourites" && (
              <Favourites
                favorites={favorites}
                onPlaySong={handlePlaySong}
                onFavSong={handleFavSong}
              />
            )}
          </main>
        </div>

        {/* Now Playing (desktop & mobile) */}
        {currentSong && (
          <div className="w-full md:w-1/3 bg-black/60 backdrop-blur-md p-4 border-t md:border-l md:border-t-0 border-gray-800 fixed bottom-0 md:static z-40">
            <div className="flex md:flex-col md:text-center md:items-center md:justify-center md:px-6 items-center gap-4">
              <img
                src={currentSong.thumbnail}
                alt={currentSong.title}
                className="w-12 h-12 md:w-full md:h-auto mx-auto rounded-xl mb-4 shadow-lg"
              />
              <div className="flex-1 md:mt-2">
                <h2 className="text-sm md:text-lg font-semibold text-white line-clamp-1">
                  {currentSong.title}
                </h2>
                <p className="text-xs md:text-sm text-gray-400 line-clamp-1">
                  {currentSong.artistName}
                </p>
              </div>

              <audio
                ref={audioRef}
                src={currentSong.musicUrl}
                onLoadedMetadata={() =>
                  setDuration(audioRef.current?.duration || 0)
                }
              />

              <div className="flex items-center justify-center gap-4 my-2 md:my-3">
                <button onClick={handlePrev} className="text-white hover:text-green-400">
                  <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                </button>
                <button
                  onClick={isPlaying ? handlePause : handlePlay}
                  className="w-9 h-9 md:w-10 md:h-10 bg-green-500 hover:bg-green-600 rounded-full text-white flex items-center justify-center shadow-md"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>
                <button onClick={handleNext} className="text-white hover:text-green-400">
                  <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                </button>
              </div>

              <div className="w-full flex items-center gap-3 text-xs text-white">
                <span className="w-10 text-right">{formatTime(currentTime)}</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progress}
                  onChange={handleSeek}
                  className="w-full h-1 bg-gray-600 accent-green-400 rounded cursor-pointer"
                />
                <span className="w-10">{formatTime(duration)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
