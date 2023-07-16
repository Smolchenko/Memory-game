import { useMemoryGame } from "../context/MemoryGameContext";

const MemoryGame = () => {
  const { cards, flippedCards, matchedCards, handleCardClick } =
    useMemoryGame();

  const renderGameBoard = () => {
    return cards.map((symbol, index) => {
      const isFlipped = flippedCards.includes(index);
      const isMatched = matchedCards.includes(index);

      let classNames = "card";
      if (isFlipped) classNames += " flipped";
      if (isMatched) classNames += " matched";

      return (
        <div
          key={index}
          className={classNames}
          onClick={() => handleCardClick(index)}
        >
          {isFlipped || isMatched ? symbol : "?"}
        </div>
      );
    });
  };

  return (
    <div className="main memory-game">
      <div className="game-board">{renderGameBoard()}</div>
    </div>
  );
};

export default MemoryGame;
