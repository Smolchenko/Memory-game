import useMemoryGameLogic from "../hooks/useMemoryGameLogic";

const MemoryGame = () => {
  const { cards, flippedCards, matchedCards, handleCardClick, restartGame } =
    useMemoryGameLogic();

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
      <button className="restart-button" onClick={restartGame}>
        Restart
      </button>
    </div>
  );
};

export default MemoryGame;
