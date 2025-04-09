
import blinding from "../assets/blinding.mp3";
import cover from "../assets/blinding.png";
import levitating from "../assets/Levitating.mp3";
import cover2 from "../assets/Levitating.png";
import Playdate from "../assets/Playdate.mp3";
import cover3 from "../assets/playdate.png";
import GoDownDeh from "../assets/Gdd.mp3";
import cover4 from "../assets/gdd.jpeg";
import Electric from "../assets/electric.mp3";
import cover5 from "../assets/ele.png";
import Fks from "../assets/fakeasmile.mp3";
import cover6 from "../assets/fks.png";
import BailaC from "../assets/BailaConmigo.mp3";
import cover7 from "../assets/BailaC.png";
import comethru from "../assets/comethru.mp3";
import cover8 from "../assets/comethru.png";



// Create a lookup map for fixing asset paths in localStorage (Favorites)
export const assetMap = {
  "Blinding Lights": {
    musicUrl: blinding,
    thumbnail: cover,
  },
  "Levitating": {
    musicUrl: levitating,
    thumbnail: cover2,
  }
};

// Full song list
const songs = [
  {
    title: "Blinding Lights",
    thumbnail: cover,
    musicUrl: blinding,
    duration: "3:20",
    artistName: "The Weeknd",
    
  },
  {
    title: "Levitating",
    thumbnail: cover2,
    musicUrl: levitating,
    duration: "3:45",
    artistName: "Dua Lipa",
    
  },
  {
    title: "Play Date",
    thumbnail: cover3,
    musicUrl: Playdate,
    duration: "2:58",
    artistName: "Lilly Brooks",
    
  },
  {
    title: "Go Down Deh",
    thumbnail: cover4,
    musicUrl: GoDownDeh,
    duration: "2:34",
    artistName: "Spice",
    
  },
  {
    title: "Electric",
    thumbnail: cover5,
    musicUrl: Electric,
    duration: "3:14",
    artistName: "Katy Perry",
    

  },
  {
    title: "Fake A Smile",
    thumbnail: cover6,
    musicUrl: Fks,
    duration: "2:48",
    artistName: "Alan Walker",
  },
  {
    title: "Baila Conmigo",
    thumbnail: cover7,
    musicUrl: BailaC,
    duration: "2:48",
    artistName: "Salena Gomez",
  },
  {
    title: "Comethru",
    thumbnail: cover8,
    musicUrl: comethru,
    duration: "3:00",
    artistName: "Jeremy Zucker",
  }
];

export default songs;
