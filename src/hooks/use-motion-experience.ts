import { createContext, useContext } from "react";

export const MotionContext = createContext({
  staticMotion: false,
  paused: false,
  toggle: () => {},
});

export const useMotionExperience = () => useContext(MotionContext);
