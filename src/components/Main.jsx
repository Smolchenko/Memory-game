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
          <div className="card-inner">
            <div className="card-front">?</div>
            <div className="card-back">
              {isFlipped || isMatched ? symbol : ""}
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <main className="memory-game">
      <div className="game-board">{renderGameBoard()}</div>
    </main>
  );
};

export default MemoryGame;
