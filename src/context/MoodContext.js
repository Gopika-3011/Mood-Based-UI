import React, { createContext, useContext, useState } from "react";

const MoodContext = createContext();

export const MoodProvider = ({ children }) => {
  const [mood, setMood] = useState("default");
  return (
    <MoodContext.Provider value={{ mood, setMood }}>
      {children}
    </MoodContext.Provider>
  );
};

export const useMood = () => useContext(MoodContext);
