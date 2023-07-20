import { useState, useEffect } from "react";
import { useMemoryGame } from "../../../context/MemoryGameContext";
import {
  getLocalStorageData,
  setLocalStorageData,
} from "../../../utils/localStorage";

import "./styles.scss";

const HoverCardContent = () => {
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
    <>
      <div className="flex column">
        <div className="flex column">
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
          <div className="flex">
            <div className="flex">
              <div className="Text bold">{userPlayData.wins}</div>{" "}
              <div className="Text faded">Wins</div>
            </div>
            <div className="flex">
              <div className="Text bold">{loses}</div>{" "}
              <div className="Text faded">Loses</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HoverCardContent;
