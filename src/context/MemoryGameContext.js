import { createContext, useContext } from "react";
import useMemoryGameLogic from "../hooks/useMemoryGameLogic";

const MemoryGameContext = createContext();

export const MemoryGameProvider = ({ children }) => {
  const gameLogic = useMemoryGameLogic();

  return (
    <MemoryGameContext.Provider value={gameLogic}>
      {children}
    </MemoryGameContext.Provider>
  );
};

export const useMemoryGame = () => useContext(MemoryGameContext);
