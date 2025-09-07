import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { useMood } from "./context/MoodContext";
import MoodSelector from "./components/MoodSelector";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import Notification from "./components/Notification";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

export default function App() {
  const { mood } = useMood();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const themes = {
    happy: { background: "linear-gradient(to right, #fbc2eb, #a6c1ee)", font: "Comic Sans MS, cursive", fontSize: "22px" },
    sad: { background: "linear-gradient(to right, #bdc3c7, #2c3e50)", font: "Georgia, serif", fontSize: "20px" },
    calm: { background: "linear-gradient(to right, #d3cce3, #e9e4f0)", font: "Verdana, sans-serif", fontSize: "21px" },
    energetic: { background: "linear-gradient(to right, #ff9a9e, #fad0c4)", font: "Tahoma, sans-serif", fontSize: "24px" },
    default: { background: "linear-gradient(to right, #ffdd00, #ff8800)", font: "Arial, sans-serif", fontSize: "20px" },
  };

  const quotes = {
    happy: "Happiness is not something ready-made. It comes from your own actions. 🌸",
    sad: "Every storm runs out of rain. 🌧️",
    calm: "Peace begins with a smile. 🌿",
    energetic: "Energy and persistence conquer all things! ⚡",
    default: "Your mood creates your world. ✨",
  };

  const musicMap = {
    happy: process.env.PUBLIC_URL + "/sounds/happy.mp3.mp3",
    sad: process.env.PUBLIC_URL + "/sounds/sad.mp3.mp3",
    energetic: process.env.PUBLIC_URL + "/sounds/energetic.mp3.mp3",
    calm: process.env.PUBLIC_URL + "/sounds/calm.mp3.mp3",
    default: process.env.PUBLIC_URL + "/sounds/default.mp3.mp3",
  };

  // update music when mood changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = musicMap[mood] || musicMap.default;
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [mood]);

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const motivationalMessages = [
    "🌟 Believe in yourself!",
    "💪 You are stronger than you think.",
    "🚀 Keep pushing forward!",
    "✨ Small steps bring big changes.",
    "🔥 Energy flows where attention goes.",
  ];

  const particleColors = {
    happy: "#ff69b4",
    sad: "#3498db",
    calm: "#2ecc71",
    energetic: "#e74c3c",
    default: "#ffffff",
  };

  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const randomMsg = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
    setNotification(randomMsg);

    const timer = setTimeout(() => setNotification(null), 4000);
    return () => clearTimeout(timer);
  }, [mood]);

  return (
    <Router>
      <motion.div
  className="animated-bg"
  style={{
    position: "fixed",
    inset: 0,
    display: "flex",
    
    flexDirection: "column",
    minHeight: "100vh",   // full screen height
    fontFamily: themes[mood]?.font,
  }}
  animate={{ background: themes[mood]?.background }}
  transition={{ duration: 1.2 }}
>
 <Particles
  id="tsparticles"
  init={useCallback(async (engine) => {
    await loadSlim(engine); // lightweight version, no checkVersion issues
  }, [])}
  options={{
    fullScreen: { enable: false },
    particles: {
      number: { value: 50 },
      size: { value: 3 },
      move: { enable: true, speed: 1 },
      opacity: { value: 0.5 },
      links: { enable: true, color: particleColors[mood] },
      color: { value: particleColors[mood] },
    },
    background: { color: "transparent" },
  }}
  style={{
    position: "absolute",
    inset: 0,
    zIndex: 0,
  }}
/>

        {/* Notifications */}
        {notification && (
          <Notification message={notification} onClose={() => setNotification(null)} />
        )}

 


<header className="w-full fixed top-0 left-0 z-50">
  <ul
    className="nav nav-pills nav-fill gap-2 p-1 small bg-primary rounded-5 shadow-sm"
    id="pillNav2"
    role="tablist"
  >
    <li className="nav-item" role="presentation">
      <NavLink
        to="/"
        className={({ isActive }) =>
          "nav-link rounded-5" + (isActive ? " active" : "")
        }
      >
        Home
      </NavLink>
    </li>
    <li className="nav-item" role="presentation">
      <NavLink
        to="/about"
        className={({ isActive }) =>
          "nav-link rounded-5" + (isActive ? " active" : "")
        }
      >
        About
      </NavLink>
    </li>
    <li className="nav-item" role="presentation">
      <NavLink
        to="/contact"
        className={({ isActive }) =>
          "nav-link rounded-5" + (isActive ? " active" : "")
        }
      >
        Contact
      </NavLink>
    </li>
  </ul>
</header>

   {/* Page Content */}
<div
  className="flex-1 flex items-center justify-center relative z-10"
  style={{ paddingTop: "100px" }}   // adjust based on your nav height
>
<div className="max-w-2xl w-full bg-white/20 backdrop-blur-sm rounded-2xl p-8 shadow-xl text-center">
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>

    {/* Mood-based Quote */}
    <div
      className="mt-6 italic text-gray-900"
      style={{ fontFamily: themes[mood]?.font, fontSize: themes[mood]?.fontSize,  paddingTop: "30px" }}
    >
      {quotes[mood] || quotes.default}
    </div>

    {/* Mood selector + Play/Pause */}
    <div className="mt-6 flex flex-col items-center space-y-8"
    style={{ paddingTop: "60px" }} >
      <MoodSelector />
      <button
        onClick={handlePlayPause}
        className="px-4 py-2 bg-black text-white rounded-lg shadow-md hover:bg-gray-700"
        style={{ paddingTop: "60px" }}
      >
        {isPlaying ? "⏸ Pause" : "▶ Play"}
      </button>
    </div>

    {/* Hidden audio */}
    <audio ref={audioRef} loop />
  </div>
</div>
     </motion.div>
    </Router>
  );
}