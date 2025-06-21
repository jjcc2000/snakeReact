import { useEffect, useState } from "react";
import { checkForColision, getRandomCoordinates } from "./helpers";
import "./index.css";

function App() {
  const [snake, setSnake] = useState([
    [0, 0], // Head
    [2, 0], // Body segment
  ]);
  const [food, setFood] = useState(getRandomCoordinates([])); // Initial food position
  const [direction, setDirection] = useState("RIGHT");
  const [gameOver, setGameOver] = useState(false);
  const [speed] = useState(200); // constant speed
  const [score, setScore] = useState(0);
  const [headEaten, setHeadEaten] = useState(false);

  // Handle key press
  useEffect(() => {
    const handleKeydown = (e) => {
      switch (e.key) {
        case "ArrowUp":
          if (direction !== "DOWN") setDirection("UP");
          break;
        case "ArrowDown":
          if (direction !== "UP") setDirection("DOWN");
          break;
        case "ArrowLeft":
          if (direction !== "RIGHT") setDirection("LEFT");
          break;
        case "ArrowRight":
          if (direction !== "LEFT") setDirection("RIGHT");
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [direction]);

  // Game loop
  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      moveSnake();
    }, speed);
    return () => clearInterval(interval);
  }, [snake, direction, gameOver]);

  const moveSnake = () => {
    let newSnake = [...snake];
    const head = newSnake[0]; // HEAD IS FIRST

    let newHead;
    switch (direction) {
      case "UP":
        newHead = [head[0], head[1] - 2];
        break;
      case "DOWN":
        newHead = [head[0], head[1] + 2];
        break;
      case "LEFT":
        newHead = [head[0] - 2, head[1]];
        break;
      case "RIGHT":
        newHead = [head[0] + 2, head[1]];
        break;
      default:
        break;
    }

    // Add new head in front
    newSnake.unshift(newHead);

    // Check if ate food
    if (newHead[0] === food[0] && newHead[1] === food[1]) {
      setFood(getRandomCoordinates(newSnake));
      setScore((prev) => prev + 1);
      setHeadEaten(true);
      setTimeout(() => false, 200); // Reset effect
      // Do NOT remove tail → grows
    } else {
      // Normal move: remove tail
      newSnake.pop();
    }

    // Check collision with walls/self
    if (checkForColision(newHead, newSnake)) {
      setGameOver(true);
      return;
    }

    setSnake(newSnake);
  };

  return (
    <div className="container">
      <div className={`score`}>Score: {score}</div>

      <div className="game-area">
        {snake.map((dot, i) => (
          <div
            key={i}
            className={
              i === 0
                ? `snake-head ${headEaten ? "head-eaten" : ""} ${
                    gameOver ? "dead-snake-head" : ""
                  }`
                : `snake-dot ${gameOver ? "dead-snake-dot" : ""}`
            }
            style={{ left: `${dot[0]}%`, top: `${dot[1]}%` }}
          ></div>
        ))}

        <div
          className="food-dot"
          style={{ left: `${food[0]}%`, top: `${food[1]}%` }}
        >
          🍎
        </div>
      </div>

      {gameOver && <h1 className="game-over">GAME OVER</h1>}
    </div>
  );
}

export default App;
