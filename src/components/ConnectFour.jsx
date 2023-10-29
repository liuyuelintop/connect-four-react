import { useState, useEffect } from "react";
import Board from "./Board";
import GameOver from "./GameOver";
import GameState from "./GameState";
import checkWin from "../utils/checkWin";
import gameOverSoundAsset from "../sounds/game_over.wav";
import clickSoundAsset from "../sounds/click.wav";

const gameOverSound = new Audio(gameOverSoundAsset);
gameOverSound.volume = 0.2;
const clickSound = new Audio(clickSoundAsset);
clickSound.volume = 0.5;


const ConnectFour = () => {
  const boardRowNum = 6;
  const boardColNum = 7;
  const [tiles, setTiles] = useState(Array(boardRowNum).fill(Array(boardColNum).fill(null)));
  const PLAYER_R = "R";
  const PLAYER_Y = "Y";
  const [currentPlayer, setCurrentPlayer] = useState(PLAYER_R);
  const [gameState, setGameState] = useState(GameState.inProgress);

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

    if (row === boardRowNum-1 || tiles[row + 1][col] !== null) {
      const newTiles = tiles.map((r) => [...r]);
      newTiles[row][col] = currentPlayer;
      setTiles(newTiles);
      let isWin= checkWin(newTiles,row,col,currentPlayer,4,{rows:boardRowNum, columns:boardColNum});
      if (isWin) {
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
    setTiles(Array(boardRowNum).fill(Array(boardColNum).fill(null)));
    setCurrentPlayer(PLAYER_R);
    setGameState(GameState.inProgress);
  };


  return (
    <div className="connect-four-container">
      <Board playerTurn={currentPlayer} placeTile={placeTile} tiles={tiles} />
      <GameOver gameState={gameState} />
      <button onClick={handleReset} className="reset-button">
        Reset
      </button>
    </div>
  );
};

export default ConnectFour;
