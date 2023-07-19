export const symbols = [
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

export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const generateCards = (gameLevel) => {
  const filteredSymbols = shuffleArray(symbols).slice(0, gameLevel / 2);
  const cardPairs = filteredSymbols.concat(filteredSymbols);

  return shuffleArray(cardPairs);
};

export const checkMatch = (
  flippedCards,
  matchedCards,
  cards,
  setFlippedCards,
  setMatchedCards
) => {
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
};

export const handleCardClick = (
  index,
  flippedCards,
  matchedCards,
  setFlippedCards
) => {
  if (
    flippedCards.length < 2 &&
    !flippedCards.includes(index) &&
    !matchedCards.includes(index)
  ) {
    setFlippedCards((prevFlippedCards) => [...prevFlippedCards, index]);
  }
};
