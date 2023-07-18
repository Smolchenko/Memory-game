import { useState, useEffect, useCallback, useMemo } from "react";

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const levelRanks = [
  { cards: 4, levelName: "Beginner" },
  { cards: 10, levelName: "Trainee" },
  { cards: 14, levelName: "Hotshot" },
  { cards: 20, levelName: "Expert" },
];

const getDataFromLocalStorage = () => {
  try {
    const data = JSON.parse(localStorage.getItem("playData"));
    return data?.attempts || 0;
  } catch (error) {
    console.error("Error parsing local storage data:", error);
    return 0;
  }
};

const useMemoryGameLogic = () => {
  const [cards, setCards] = useState([]);
  const [gameLevel, setGameLevel] = useState(levelRanks[0].cards);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [restartCount, setRestartCount] = useState(() =>
    getDataFromLocalStorage()
  );

  useEffect(() => {
    if (matchedCards.length) {
      setGameStarted(true);
    }
  }, [matchedCards.length]);

  const progressLevel = useMemo(() => {
    return cards.length > 0 ? (matchedCards.length / cards.length) * 100 : 0;
  }, [matchedCards.length, cards.length]);

  const generateCards = useCallback(() => {
    const symbols = [
      "🐶",
      "🐱",
      "🐭",
      "🐹",
      "🐰",
      "🐻",
      "🐼",
      "🐨",
      "🦁",
      "🐯",
    ];

    const filteredSymbols = shuffleArray(symbols).slice(0, gameLevel / 2);
    const cardPairs = filteredSymbols.concat(filteredSymbols);
    return shuffleArray(cardPairs);
  }, [gameLevel]);

  useEffect(() => {
    generateCards();
  }, [gameLevel]);

  const handleCardClick = useCallback(
    (index) => {
      if (
        flippedCards.length < 2 &&
        !flippedCards.includes(index) &&
        !matchedCards.includes(index)
      ) {
        setFlippedCards((prevFlippedCards) => [...prevFlippedCards, index]);
      }
    },
    [flippedCards, matchedCards]
  );

  const checkMatch = useCallback(() => {
    if (flippedCards.length === 2) {
      const [firstCard, secondCard] = flippedCards;
      const newMatchedCards = [...matchedCards];

      if (cards[firstCard] === cards[secondCard]) {
        newMatchedCards.push(firstCard, secondCard);
      }

      setTimeout(() => {
        setMatchedCards(newMatchedCards);
        setFlippedCards([]);
      }, 1000);
    }
  }, [flippedCards, matchedCards, cards]);

  useEffect(() => {
    checkMatch();
  }, [checkMatch]);

  const restartGame = useCallback(() => {
    setCards(generateCards());
    setFlippedCards([]);
    setMatchedCards([]);
    setGameStarted(false);
  }, [generateCards]);

  useEffect(() => {
    if (gameStarted) {
      setRestartCount((prevCount) => prevCount + 1);
    }
  }, [gameStarted]);

  useEffect(() => {
    setCards(generateCards());
  }, [generateCards]);

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
