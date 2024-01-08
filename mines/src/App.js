import React, { useState, useEffect, useRef, useMemo } from "react";
import "./App.css";

let generatedNumbers = [];

function App() {
  const noOfMines = 7;
  const [count, setCount] = useState(24);
  const [blast, setBlast] = useState(false);
  const [arr, setArr] = useState(
    new Array(25).fill({ isChecked: false, left: true })
  );
  function getRandomNumber() {
    let Minesarr = [];
    for (let i = 0; i < noOfMines; i++) {
      Minesarr.push(generateRandomNumber());
    }
    return Minesarr;
  }
  function generateRandomNumber() {
    let randomNumber = Math.floor(Math.random() * 25);
    if (generatedNumbers.includes(randomNumber)) {
      return generateRandomNumber();
    } else {
      generatedNumbers.push(randomNumber);
      return randomNumber;
    }
  }
  const mines = useMemo(() => getRandomNumber(), []);

  let twoDimensionalArr = [
    [
      1.03, 1.08, 1.13, 1.18, 1.24, 1.3, 1.38, 1.46, 1.55, 1.65, 1.77, 1.9,
      2.06, 2.25, 2.48, 2.75, 3.09, 3.54, 4.13, 4.95, 6.19, 8.25, 12.38, 24.75,
    ],
    [
      1.08, 1.17, 1.29, 1.41, 1.56, 1.74, 1.94, 2.18, 2.47, 2.83, 3.26, 3.81,
      4.5, 5.4, 6.6, 8.25, 10.61, 14.14, 19.8, 29.7, 49.5, 99.0, 297.0,
    ],
    [
      1.12, 1.29, 1.48, 1.71, 2.0, 2.35, 2.79, 3.35, 4.07, 5.0, 6.26, 7.96,
      10.35, 13.8, 18.97, 27.11, 40.66, 65.06, 113.85, 227.7, 569.25, 2277.0,
    ],
    [
      1.18, 1.41, 1.71, 2.09, 2.58, 3.23, 4.09, 5.26, 6.88, 9.17, 12.51, 17.52,
      25.3, 37.95, 59.64, 99.39, 178.91, 357.81, 834.9, 2504.7, 12523.5,
    ],
    [
      1.24, 1.56, 2.0, 2.58, 3.39, 4.52, 6.14, 8.5, 12.04, 17.52, 26.27, 40.87,
      66.41, 113.85, 208.72, 417.45, 939.26, 2504.7, 8766.45, 52598.7,
    ],
    [
      1.3, 1.74, 2.35, 3.23, 4.52, 6.46, 9.44, 14.17, 21.89, 35.03, 58.38,
      102.17, 189.75, 379.5, 834.9, 2087.25, 6261.75, 25047, 175329,
    ],
    [
      1.37, 1.94, 2.79, 4.09, 6.14, 9.44, 14.95, 24.47, 41.6, 73.95, 138.66,
      277.33, 600.87, 1442.1, 3965.77, 13219.25, 59486.62, 475893,
    ],
  ];
  console.log(twoDimensionalArr[6][17]);

  const handleClick = (e, index) => {
    let narr = arr;
    narr[index] = { isChecked: true, left: false };
    setArr(narr);

    let isWin =
      narr.filter((e, i) => e?.isChecked).length + mines.length === arr.length;
    const isBomb = mines.includes(index);
    if (!isWin && isBomb) {
      e.target.classList.add("mines");
      setBlast(true);
    } else {
      setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
      e.target.classList.add("notMine");
    }
  };

  return (
    <div className="App">
      <div>
        <div className="main">
          {arr.map((item, index) => {
            return (
              <div
                className={`card ${
                  blast && item?.left
                    ? !mines.includes(index)
                      ? "notMine"
                      : "mines"
                    : ""
                }`}
                style={{ opacity: blast && item?.left ? 0.5 : 1 }}
                key={index}
                onClick={(e) => handleClick(e, index)}
              ></div>
            );
          })}
        </div>
        <h1>{count}</h1>
      </div>
    </div>
  );
}

export default App;
