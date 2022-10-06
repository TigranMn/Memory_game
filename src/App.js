import "./App.css";
import Bands from "./Bands";
import { useState, useEffect } from "react";

function App() {
  const [clicks, setClicks] = useState(0);
  const [won, setWon] = useState(false);
  const [activeCards, setActiveCards] = useState([]);
  const [foundPairs, setFoundPairs] = useState([]);
  const [gridSize, setGridSize] = useState("6 x 6");
  const [cards, setCards] = useState([...generateCards(18)]);

  useEffect(() => {
    if (activeCards.length == 2) {
      setTimeout(() => {
        setActiveCards([]);
      }, 500);
    }
  }, [activeCards]);

  function reset() {
    setClicks(0)
    setFoundPairs([])
    setActiveCards([])
    setWon(false)
  }
  function generateCards(len) {
    const BANDS = [];
    for (let i = 0; i < len; i++) {
      BANDS.push(Bands[i], Bands[i]);
    }
    return [...BANDS.sort(() => Math.random() - 0.5)];
  }
  function changeSize() {
    if (gridSize == "6 x 6") {
      setGridSize("4 x 4");
      setCards(generateCards(8));
      reset()
    } else {
      setGridSize("6 x 6");
      setCards(generateCards(18));
      reset()
    }
  }

  function flipCard(index) {
    if (won) {
      setCards([...generateCards((+gridSize[0]) ** 2 / 2)]);
      reset()
    }
    if (activeCards.length === 0) {
      setActiveCards([index]);
    }
    if (activeCards.length === 1) {
      const firstIndex = activeCards[0];
      const secondsIndex = index;
      if (cards[firstIndex] === cards[secondsIndex]) {
        if (foundPairs.length + 2 === cards.length) {
          setWon(true);
        }
        setFoundPairs([...foundPairs, firstIndex, secondsIndex]);
      }
      setActiveCards([...activeCards, index]);
    }
    setClicks(clicks + 1);
  }

  return (
    <div>
      <button onClick={changeSize} className="config">
        {gridSize}
      </button>
      <div className={gridSize[0] === "6" ? "GAMEBOARD6" : "GAMEBOARD4"}>
        {cards.map((card, index) => {
          const flippedToFront =
            activeCards.indexOf(index) !== -1 ||
            foundPairs.indexOf(index) !== -1;
          const flippedClass = flippedToFront ? " flipped" : "";
          const gridSizeClass =
            gridSize[0] === "6" ? "card-outer6" : "card-outer4";
          return (
            <div
              key={index}
              className={gridSizeClass + flippedClass}
              onClick={() => flipCard(index)}
            >
              <div className="card">
                <div className="frontSide">
                  <img src={card} />
                </div>
                <div className="backSide" />
              </div>
            </div>
          );
        })}
      </div>
      <div className="stats">
        {won && (
          <>
            You won the game! Congratulations!
            <br />
            Click to play again.
          </>
        )}
        <br />
        <span id="click">Total clicks: {clicks} </span> Pairs:
        {foundPairs.length / 2}
      </div>
    </div>
  );
}

export default App;
