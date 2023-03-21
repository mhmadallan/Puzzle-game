
import { useEffect, useRef, useState } from "react";
import _ from "lodash";
import "./App.css";

function App() {
  const canvasRef = useRef(null);
  const [tiles, setTiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedTile, setDraggedTile] = useState(null);
  const [droppingArea, setDroppingArea] = useState(null);
  const [won, setWon] = useState(false);
  const [compareTiles, setCompareTiles] = useState([]);
  const [score, setScore] = useState(0);
  const [difficulty, setDifficulty] = useState("");
  const [colNum, setColNum] = useState(0);

  const tileImages = [];
  const images = [];

  useEffect(() => {
    const img = new Image();
    img.src = "/img/ew.jpg";
    img.onload = function () {
      for (let j = 0; j < colNum; j++) {
        for (let i = 0; i < colNum; i++) {
          const imgWidth = this.width / colNum;
          const imgHeight = this.height / colNum;
          const x = i * imgWidth;
          const y = j * imgHeight;
          const canvas = canvasRef.current;
          const context = canvas.getContext("2d");
          context.drawImage(img, x, y, imgWidth, imgHeight, 0, 0, 300, 150);
          tileImages.push(canvas.toDataURL());
          images.push(canvas.toDataURL());
        }
      }
      setTiles(
        shuffle(tileImages.map((str, index) => ({ value: str, id: index })))
      );
      setCompareTiles(images.map((str, index) => ({ value: str, id: index })));
    };
  }, [colNum]);

  const shuffle = (array) => {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      moveTile(array, currentIndex, randomIndex);
    }

    return array;
  };

  const moveTile = (arr, fromIndex, toIndex) => {
    const element = arr[fromIndex];
    arr[fromIndex] = arr[toIndex];
    arr[toIndex] = element;
  };

  const handleDragStart = (tile) => {
    if (!won) {
      setScore(score + 1);
    }
    setIsDragging(true);
    setDraggedTile(tile);
  };

  const draggedTileClassName = (tile) => {
    if (
      isDragging &&
      tile.id === draggedTile.id &&
      !_.isEqual(tile, droppingArea)
    ) {
      return "dnd-opacity";
    }
    return "";
  };

  const checkWinning = () => {
    if (_.isEqual(tiles, compareTiles)) {
      setTimeout(() => {
        setWon(true);
      }, 3000);
    }
  };

  const handleDragEnd = () => {
    if (droppingArea) {
      moveTile(tiles, tiles.indexOf(droppingArea), tiles.indexOf(draggedTile));
      setIsDragging(false);
      setDroppingArea(null);
    }
    checkWinning();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragEnter = (tile) => {
    if (isDragging) {
      setDroppingArea(tile);
    }
  };

  const chooseDifficulty = (e) => {
    if (e.target.innerHTML === "easy") {
      setDifficulty("repeat(5, 1fr)");
      setColNum(5);
    }
    if (e.target.innerHTML === "medium") {
      setDifficulty("repeat(6, 1fr)");
      setColNum(6);
    }
    if (e.target.innerHTML === "hard") {
      setDifficulty("repeat(7, 1fr)");
      setColNum(7);
      //  console.log(e.target.innerHTML)
      console.log(colNum);
    }
  };

  return (
    // the default width of canvas is 300 and height is 150
    <div className="App">
      <canvas id="canvas1" ref={canvasRef}></canvas>
      <div className="container">
        <div>
          <button
            className="game-button green"
            onClick={(e) => chooseDifficulty(e)}
          >
            easy
          </button>
          <button
            className="game-button orange"
            onClick={(e) => chooseDifficulty(e)}
          >
            medium
          </button>
          <button
            className="game-button red"
            onClick={(e) => chooseDifficulty(e)}
          >
            hard
          </button>
        </div>
        <h1 style={{ opacity: won ? 1 : 0 }}>
          Congtatulations!! you solved it in {score} moves
        </h1>

        <div
          className="grid"
          style={{ opacity: won ? 0 : 1, gridTemplateColumns: difficulty }}
        >
          {tiles.map((item) => (
            <img
              draggable
              onDragStart={() => handleDragStart(item)}
              onDragEnd={() => handleDragEnd()}
              onDragEnter={() => handleDragEnter(item)}
              onDragOver={(e) => handleDragOver(e)}
              key={item.id}
              src={item.value}
              alt={item.id}
              className={isDragging ? draggedTileClassName(item) : ""}
              //style={{opacity:isDragging ?0.5 : 1}}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
