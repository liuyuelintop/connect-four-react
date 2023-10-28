import { useState, useEffect } from "react";
import Board from "./Board";
import GameOver from "./GameOver";
import GameState from "./GameState";
import gameOverSoundAsset from "../sounds/game_over.wav";
import clickSoundAsset from "../sounds/click.wav";

const gameOverSound = new Audio(gameOverSoundAsset);
gameOverSound.volume = 0.2;
const clickSound = new Audio(clickSoundAsset);
clickSound.volume = 0.5;


const ConnectFour = () => {
  const [tiles, setTiles] = useState(Array(6).fill(Array(7).fill(null)));
  const PLAYER_R = "R";
  const PLAYER_Y = "Y";
  const [currentPlayer, setCurrentPlayer] = useState(PLAYER_R); // R = Red, Y = Yellow
  const [gameState, setGameState] = useState(GameState.inProgress);

  const directions = [
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 1, y: -1 },
  ];


  useEffect(() => {
    if (tiles.some((tile) => tile !== null)) {
      clickSound.play();
    }
  }, [tiles]);

  useEffect(() => {
    if (gameState !== GameState.inProgress) {
      gameOverSound.play();
    }
  }, [gameState]);

  const isBoardFull = (tiles) => {
    for (let row of tiles) {
      for (let cell of row) {
        if (!cell) {
          return false;
        }
      }
    }
    return true;
  };

  const placeTile = (row, col) => {
    if (gameState !== GameState.inProgress) {
      return;
    }
    if (tiles[row][col] !== null) return;

    if (row === 5 || tiles[row + 1][col] !== null) {
      const newTiles = tiles.map((r) => [...r]);
      newTiles[row][col] = currentPlayer;
      setTiles(newTiles);
      if (checkWinForTile(newTiles, row, col, currentPlayer)) {
        currentPlayer === PLAYER_R
          ? setGameState(GameState.playerRwins)
          : setGameState(GameState.playerYwins);
      } else if (isBoardFull(newTiles)) {
        setGameState(GameState.draw);
      } else {
        setCurrentPlayer(currentPlayer === PLAYER_R ? PLAYER_Y: PLAYER_R);
      }
    }
  };

  const handleReset = () => {
    setTiles(Array(6).fill(Array(7).fill(null)));
    setCurrentPlayer(PLAYER_R);
    setGameState(GameState.inProgress);
  };

  function checkWinForTile(tiles, row, col, currentPlayer) {
    for (let direction of directions) {
      let count = 1; // 起始棋子
      // 检查正方向
      for (let i = 1; i < 4; i++) {
        const x = col + direction.x * i;
        const y = row + direction.y * i;
        if (
          x >= 0 &&
          x < tiles[0].length &&
          y >= 0 &&
          y < tiles.length &&
          tiles[y][x] === currentPlayer
        ) {
          count++;
        } else {
          break;
        }
      }
      // 检查反方向
      for (let i = 1; i < 4; i++) {
        const x = col - direction.x * i;
        const y = row - direction.y * i;
        if (
          x >= 0 &&
          x < tiles[0].length &&
          y >= 0 &&
          y < tiles.length &&
          tiles[y][x] === currentPlayer
        ) {
          count++;
        } else {
          break;
        }
      }
      if (count >= 4) {
        return true;
      }
    }
    return false;
  }
  return (
    <div className="connect-four-container">
      <h1 className="connect-four-title">Connect Four</h1>
      <Board playerTurn={currentPlayer} placeTile={placeTile} tiles={tiles} />
      <GameOver gameState={gameState} />
      <button onClick={handleReset} className="reset-button">
        Reset
      </button>
    </div>
  );
};

export default ConnectFour;
