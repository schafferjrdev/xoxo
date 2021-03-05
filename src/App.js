import React, { useEffect, useState } from "react";
import firebase from "./firebase";
import "./App.scss";

// database.push().set({});

// database.on(
//   "value",
//   function (snapshot) {
//     const response = snapshot.val();
//     database.off();
//   },
//   function (errorObject) {
//     console.log("The read failed: " + errorObject.code);
//   }
// );
const RESETER = ["", "", "", "", "", "", "", "", ""];

function App() {
  const database = firebase.database().ref().child("jogo");
  const [gameState, setGameState] = useState([]);
  const [current, setCurrent] = useState(true);

  const CURRENT_MAP = {
    true: "X",
    false: "O",
  };

  useEffect(() => {
    database.on(
      "value",
      function (snapshot) {
        const response = snapshot.val();
        setGameState(response.gameState);
        setCurrent(response.current);
      },
      function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      }
    );
    // eslint-disable-next-line
  }, []);

  const handleClick = (index) => {
    const AuxState = [...gameState];
    AuxState[index] = CURRENT_MAP[current];
    database.update({ current: !current, gameState: AuxState });
  };

  const handleReset = () => {
    database.update({ gameState: RESETER, current: true });
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>Current: {CURRENT_MAP[current]}</p>
        <div className="App-board">
          {gameState.map((e, i) => (
            <span onClick={() => handleClick(i)} className="App-vals">
              {e}
            </span>
          ))}
        </div>
        <span className="App-button" onClick={handleReset}>
          Reset
        </span>
      </header>
    </div>
  );
}

export default App;
