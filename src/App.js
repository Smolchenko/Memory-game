import Footer from "./components/Footer";
import MemoryGame from "./components/Main";
import Header from "./components/Header";

import "./App.scss";

const App = () => {
  return (
    <div className="app">
      <Header />
      <MemoryGame />
      <Footer />
    </div>
  );
};

export default App;
