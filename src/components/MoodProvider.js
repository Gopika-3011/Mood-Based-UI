import React, { createContext, useContext, useState } from "react";

const MoodContext = createContext();
export const useMood = () => useContext(MoodContext);

export function MoodProvider({ children }) {
  const [mood, setMood] = useState("happy"); // default mood

  return (
    <MoodContext.Provider value={{ mood, setMood }}>
      {children}
    </MoodContext.Provider>
  );
}
