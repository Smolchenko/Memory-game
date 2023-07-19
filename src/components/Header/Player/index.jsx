import { useState, useEffect } from "react";
import * as HoverCard from "@radix-ui/react-hover-card";

import AvatarImage from "./Avatar";
import { useMemoryGame } from "../../../context/MemoryGameContext";
import {
  getLocalStorageData,
  setLocalStorageData,
} from "../../../utils/localStorage";

import "./styles.scss";

const HoverPlayerCard = () => {
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
        </div>
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content className="HoverCardContent" sideOffset={5}>
          <div className="Flex3 column">
            <div className="ImageContainer">
              <AvatarImage size="normal" />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
              <div>
                <div className="Text bold">Game player</div>
                <div className="Text faded">
                  <a
                    href="https://github.com/Smolchenko"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Owner Github"
                  >
                    @irene_smolchenko
                  </a>
                </div>
              </div>
              <div style={{ display: "flex", gap: 15 }}>
                <div style={{ display: "flex", gap: 5 }}>
                  <div className="Text bold">{userPlayData.wins}</div>{" "}
                  <div className="Text faded">Wins</div>
                </div>
                <div style={{ display: "flex", gap: 5 }}>
                  <div className="Text bold">{loses}</div>{" "}
                  <div className="Text faded">Loses</div>
                </div>
              </div>
            </div>
          </div>
          <HoverCard.Arrow className="HoverCardArrow" />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
};

export default HoverPlayerCard;
