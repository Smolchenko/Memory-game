import { useMemoryGame } from "../../context/MemoryGameContext";

const GameOptions = () => {
  const { restartGame } = useMemoryGame();

  return (
    <div>
      <button className="restart-button" onClick={restartGame}>
        Restart
      </button>
    </div>
  );
};

export default GameOptions;
