import { useState, useEffect, useRef } from "react";
import * as HoverCard from "@radix-ui/react-hover-card";

import AvatarImage from "./Avatar";
import CardContent from "./CardContent";
import { useMemoryGame } from "../../../context/MemoryGameContext";
import useIsTouchDevice from "../../../hooks/useIsTouchDevice";
import {
  getLocalStorageData,
  setLocalStorageData,
} from "../../../utils/localStorage";

import "./styles.scss";

const HoverPlayerCard = () => {
  const isMobile = useIsTouchDevice();
  const { progressLevel, restartCount, gameStarted } = useMemoryGame();
  const [shouldNextResetCount, setShouldNextResetCount] = useState(true);
  const [loses, setLoses] = useState(0);
  const countRef = useRef(getLocalStorageData("playData"));

  useEffect(
    () => setLocalStorageData("playData", countRef.current),
    [countRef]
  );

  useEffect(() => {
    if (progressLevel === 100) {
      const currentData = countRef.current;

      const updatedPlayData = {
        ...currentData,
        wins: currentData.wins + 1,
      };

      setLocalStorageData("playData", updatedPlayData);
      countRef.current = updatedPlayData;
      setShouldNextResetCount(false);
    }
  }, [progressLevel]);

  useEffect(() => {
    if (shouldNextResetCount) {
      const currentData = countRef.current;
      const updatedPlayData = {
        ...currentData,
        attempts: restartCount,
      };

      setLocalStorageData("playData", updatedPlayData);
      countRef.current = updatedPlayData;
    }
  }, [restartCount, shouldNextResetCount]);

  useEffect(() => {
    if (gameStarted) setShouldNextResetCount(true);
  }, [gameStarted]);

  useEffect(() => {
    if (!gameStarted) {
      const currentData = countRef.current;
      setLoses(restartCount - currentData.wins);
    }
  }, [restartCount, gameStarted, countRef.wins]);

  return (
    <HoverCard.Root>
      <HoverCard.Trigger asChild>
        <div className="ImageContainer">
          <AvatarImage size="large" />
          {isMobile && (
            <CardContent userPlayData={countRef.current} loses={loses} />
          )}
        </div>
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content className="HoverCardContent" sideOffset={5}>
          <div className="flex column">
            <div className="ImageContainer">
              <AvatarImage size="normal" />
            </div>
            <CardContent userPlayData={countRef.current} loses={loses} />
          </div>
          <HoverCard.Arrow className="HoverCardArrow" />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
};

export default HoverPlayerCard;
