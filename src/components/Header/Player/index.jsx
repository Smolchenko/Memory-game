import { useState, useEffect } from "react";
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
  const [userPlayData, setUserPlayData] = useState(() =>
    getLocalStorageData("playData")
  );

  useEffect(
    () => setLocalStorageData("playData", userPlayData),
    [userPlayData]
  );

  useEffect(() => {
    if (progressLevel === 100) {
      const updatedPlayData = {
        ...userPlayData,
        wins: userPlayData.wins + 1,
      };

      setLocalStorageData("playData", updatedPlayData);
      setUserPlayData(updatedPlayData);
      setShouldNextResetCount(false);
    }
  }, [progressLevel]);

  useEffect(() => {
    if (shouldNextResetCount) {
      const updatedPlayData = {
        ...userPlayData,
        attempts: restartCount,
      };

      setLocalStorageData("playData", updatedPlayData);
      setUserPlayData(updatedPlayData);
    }
  }, [restartCount, userPlayData.attempts, shouldNextResetCount]);

  useEffect(() => {
    if (gameStarted) setShouldNextResetCount(true);
  }, [gameStarted]);

  useEffect(() => {
    if (!gameStarted) setLoses(restartCount - userPlayData.wins);
  }, [restartCount, gameStarted, userPlayData.wins]);

  return (
    <HoverCard.Root>
      <HoverCard.Trigger asChild>
        <div className="ImageContainer">
          <AvatarImage size="large" />
          {isMobile && (
            <CardContent userPlayData={userPlayData} loses={loses} />
          )}
        </div>
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content className="HoverCardContent" sideOffset={5}>
          <div className="flex column">
            <div className="ImageContainer">
              <AvatarImage size="normal" />
            </div>
            <CardContent userPlayData={userPlayData} loses={loses} />
          </div>
          <HoverCard.Arrow className="HoverCardArrow" />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
};

export default HoverPlayerCard;
