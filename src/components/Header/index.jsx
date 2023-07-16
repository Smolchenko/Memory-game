import GameOptions from "./GameOptions";
import GameStatus from "./GameStatus";

const Header = () => {
  return (
    <header>
      <div>Players</div>
      <GameStatus />
      <GameOptions />
    </header>
  );
};

export default Header;
