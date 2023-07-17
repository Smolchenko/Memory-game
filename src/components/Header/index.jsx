import GameOptions from "./GameOptions";
import GameStatus from "./GameStatus";
import Player from "./Player";

const Header = () => {
  return (
    <header>
      <Player />
      <GameStatus />
      <GameOptions />
    </header>
  );
};

export default Header;
