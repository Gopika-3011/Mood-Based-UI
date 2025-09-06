import React, { useRef } from "react";
import { useMood } from "../context/MoodContext";

const moods = [
  { id: "happy", label: "😊 Happy" },
  { id: "sad", label: "😢 Sad" },
  { id: "energetic", label: "⚡ Energetic" },
  { id: "calm", label: "🌙 Calm" },
  { id: "default", label: "🔄 Default" },
];

export default function MoodSelector() {
  const { setMood } = useMood();
  const ref = useRef(null);

  
  return (
    <div className="flex items-center gap-3 w-full">

      <div className="custom-select">
  <select onChange={(e) => setMood(e.target.value)}>
    {moods.map((m) => (
      <option key={m.id} value={m.id}>
        {m.label}
      </option>
    ))}
  </select>
</div>
</div>
  );
}
