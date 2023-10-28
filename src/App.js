import { useState } from "react";
import "./App.css";
import BackgroundMusic from "./components/BackgroundMusic";
import ConnectFour from "./components/ConnectFour";

function App() {
  const [isStarted, setIsStarted] = useState(false);

  return (
    <div className="App">
      {isStarted ? (
        <>
          <BackgroundMusic isStarted={isStarted} />
          <ConnectFour />
        </>
      ) : (
        <>
          <div className="game-description">
            <p>
              'Connect Four' is a two-player connection game in which the
              players take turns dropping colored discs from the top into a
              vertically suspended grid. The objective is to connect four of
              one's own discs in a row, either vertically, horizontally, or
              diagonally, before the opponent does. Simple in concept yet
              strategic in nature, 'Connect Four' is a timeless classic enjoyed
              by all ages.
            </p>
            <button onClick={() => setIsStarted(true)} className="start-btn">
              Play Now
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
