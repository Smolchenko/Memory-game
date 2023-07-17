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

const useMemoryGameLogic = () => {
  const [cards, setCards] = useState([]);
  const [gameLevel, setGameLevel] = useState(levelRanks[0].cards); //4
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

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
  }, [generateCards]);

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
    ]
  );

  return memoizedValues;
};

export default useMemoryGameLogic;
