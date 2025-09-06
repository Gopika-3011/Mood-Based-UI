import React from "react";
import { useMood } from "../context/MoodContext";

export default function HomePage() {
  const { mood } = useMood();
  return (
    <div>
      <h1 className="text-4xl font-bold mb-2">Welcome to Mood Based UI 🎭</h1>
      <p className="text-lg mb-2">You're shining bright today! 🎉</p>
      <p className="mb-4">Current mood: <span className="font-semibold">{mood}</span></p>
    </div>
  );
}
