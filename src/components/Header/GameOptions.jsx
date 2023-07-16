import { useMemoryGame } from "../../context/MemoryGameContext";

const GameOptions = () => {
  const { restartGame } = useMemoryGame();

  return (
    <div>
      <button className="restart-button" onClick={restartGame}>
        Restart
      </button>
      <span> [ Loading bar ] </span>
    </div>
  );
};

export default GameOptions;
