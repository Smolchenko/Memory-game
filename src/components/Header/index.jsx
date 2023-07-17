import GameOptions from "./GameOptions";
import GameStatus from "./GameStatus";

const Header = () => {
  return (
    <header>
      <div style={{ width: "200px" }}>Players</div>
      <GameStatus />
      <GameOptions />
    </header>
  );
};

export default Header;
