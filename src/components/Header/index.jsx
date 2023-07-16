import GameOptions from "./GameOptions";
import GameStatus from "./GameStatus";

const Header = () => {
  return (
    <div className="header">
      <div>Players</div>
      <GameStatus />
      <GameOptions />
    </div>
  );
};

export default Header;
