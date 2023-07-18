import { MemoryGameProvider } from "./context/MemoryGameContext";
import Footer from "./components/Footer";
import MemoryGame from "./components/Main";
import Header from "./components/Header";

import "./App.scss";

const App = () => {
  return (
    <MemoryGameProvider>
      <div className="app">
        <Header />
        <MemoryGame />
        <Footer />
      </div>
    </MemoryGameProvider>
  );
};

export default App;
