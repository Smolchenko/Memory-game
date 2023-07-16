import { useState, useEffect, useCallback, useMemo } from "react";

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const useMemoryGameLogic = () => {
  const [cards, setCards] = useState([]);
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
    const cardPairs = symbols.concat(symbols);
    return shuffleArray(cardPairs);
  }, []);

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
    }),
    [
      cards,
      flippedCards,
      matchedCards,
      handleCardClick,
      restartGame,
      progressLevel,
    ]
  );

  return memoizedValues;
};

export default useMemoryGameLogic;
