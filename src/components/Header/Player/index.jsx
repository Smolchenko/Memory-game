import { useState, useEffect } from "react";
import * as HoverCard from "@radix-ui/react-hover-card";

import { useMemoryGame } from "../../../context/MemoryGameContext";
import avatarImage from "../../../assets/avatar.png";
import "./styles.scss";

const playDataDefault = {
  wins: 0,
  attempts: 0,
};

const getInitialDataFromLocalStorage = () => {
  try {
    const data = JSON.parse(localStorage.getItem("playData"));
    return data || playDataDefault;
  } catch (error) {
    console.error("Error parsing local storage data:", error);
    return playDataDefault;
  }
};

const HoverPlayerCard = () => {
  const { progressLevel, restartCount, gameStarted } = useMemoryGame();
  const [shouldNextResetCount, setShouldNextResetCount] = useState(true);
  const [loses, setLoses] = useState(0);
  const [userPlayData, setUserPlayData] = useState(() =>
    getInitialDataFromLocalStorage()
  );

  useEffect(() => {
    localStorage.setItem("playData", JSON.stringify(userPlayData));
  }, [userPlayData]);

  useEffect(() => {
    if (progressLevel === 100) {
      const updatedPlayData = {
        ...userPlayData,
        wins: userPlayData.wins + 1,
      };

      localStorage.setItem("playData", JSON.stringify(updatedPlayData));
      setUserPlayData(updatedPlayData);
      setShouldNextResetCount(false);
    }
  }, [progressLevel]);

  useEffect(() => {
    if (gameStarted) {
      setShouldNextResetCount(true);
    }
  }, [gameStarted]);

  useEffect(() => {
    if (shouldNextResetCount) {
      const updatedPlayData = {
        ...userPlayData,
        attempts: restartCount,
      };

      localStorage.setItem("playData", JSON.stringify(updatedPlayData));
      setUserPlayData(updatedPlayData);
    }
  }, [restartCount, userPlayData.attempts, shouldNextResetCount]);

  useEffect(() => {
    if (!gameStarted) {
      setLoses(restartCount - userPlayData.wins);
    }
  }, [restartCount, gameStarted, userPlayData.wins]);

  return (
    <HoverCard.Root>
      <HoverCard.Trigger asChild>
        <div className="ImageContainer">
          <img className="Image large" src={avatarImage} alt="Your Avatar" />
        </div>
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content className="HoverCardContent" sideOffset={5}>
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <div className="ImageContainer">
              <img
                className="Image normal"
                src={avatarImage}
                alt="Your Avatar"
              />
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
              {/* <div className="Text">
              Components, icons, colors, and templates for building
              high-quality, accessible UI. Free and open-source.
            </div> */}
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
