import { useState, useEffect, useCallback, useMemo } from "react";

import { levelRanks } from "../constants";
import {
  generateCards,
  checkMatch,
  handleCardClick as handleCardClickUtil,
} from "../utils/gameUtils";
import { getAttemptsFromLocalStorage } from "../utils/localStorage";

const useMemoryGameLogic = () => {
  const [cards, setCards] = useState([]);
  const [gameLevel, setGameLevel] = useState(levelRanks[0].cards);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [restartCount, setRestartCount] = useState(() =>
    getAttemptsFromLocalStorage()
  );

  const progressLevel = useMemo(() => {
    return cards.length > 0 ? (matchedCards.length / cards.length) * 100 : 0;
  }, [matchedCards.length, cards.length]);

  const restartGame = useCallback(() => {
    setCards(generateCards(gameLevel));
    setFlippedCards([]);
    setMatchedCards([]);
    setGameStarted(false);
  }, [gameLevel]);

  const handleCardClick = useCallback(
    (index) =>
      handleCardClickUtil(index, flippedCards, matchedCards, setFlippedCards),
    [flippedCards, matchedCards]
  );

  useEffect(() => {
    if (matchedCards.length) setGameStarted(true);
  }, [matchedCards.length]);

  useEffect(() => {
    generateCards(gameLevel);
  }, [gameLevel]);

  useEffect(() => {
    checkMatch(
      flippedCards,
      matchedCards,
      cards,
      setFlippedCards,
      setMatchedCards
    );
  }, [flippedCards, matchedCards, cards]);

  useEffect(() => {
    if (gameStarted) setRestartCount((prevCount) => prevCount + 1);
  }, [gameStarted]);

  useEffect(() => {
    setCards(generateCards(gameLevel));
  }, [gameLevel]);

  const memoizedValues = useMemo(
    () => ({
      cards,
      flippedCards,
      matchedCards,
      handleCardClick,
      restartGame,
      progressLevel,
      gameLevel,
      setGameLevel,
      restartCount,
      gameStarted,
    }),
    [
      cards,
      flippedCards,
      matchedCards,
      handleCardClick,
      restartGame,
      progressLevel,
      gameLevel,
      setGameLevel,
      restartCount,
      gameStarted,
    ]
  );

  return memoizedValues;
};

export default useMemoryGameLogic;
