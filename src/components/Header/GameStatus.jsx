import { useState, useEffect } from "react";
import * as Progress from "@radix-ui/react-progress";

import { useMemoryGame } from "../../context/MemoryGameContext";

import "./styles.scss";

const GameOptions = () => {
  const { progressLevel } = useMemoryGame();
  const [progress, setProgress] = useState(0);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  let classNames = "ProgressIndicator";
  if (isAnimationComplete) classNames += " completed";

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(progressLevel);
    }, 100);
    return () => clearTimeout(timer);
  }, [progressLevel]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (progress === 100) setIsAnimationComplete(true);
    }, 670);
    return () => clearTimeout(timer);
  }, [progress]);

  return (
    <div>
      <Progress.Root className="ProgressRoot" value={progress}>
        <Progress.Indicator
          className={classNames}
          style={{ transform: `translateX(-${100 - progress}%)` }}
        />
      </Progress.Root>
    </div>
  );
};

export default GameOptions;
