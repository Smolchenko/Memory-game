import { useState, useEffect } from "react";
import * as Progress from "@radix-ui/react-progress";

import { useMemoryGame } from "../../context/MemoryGameContext";

import "./styles.scss";

const GameOptions = () => {
  const { progressLevel } = useMemoryGame();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(progressLevel), 200);
    return () => clearTimeout(timer);
  }, [progressLevel]);

  return (
    <div>
      <Progress.Root className="ProgressRoot" value={progress}>
        <Progress.Indicator
          className="ProgressIndicator"
          style={{ transform: `translateX(-${100 - progress}%)` }}
        />
      </Progress.Root>
    </div>
  );
};

export default GameOptions;
