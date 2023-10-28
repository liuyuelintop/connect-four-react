import Tile from "./Tile";
const Board = ({ placeTile, tiles, playerTurn }) => {
    const canPlaceTile = (row, col, tiles) => {
        return tiles[row][col] === null && (row === 5 || tiles[row+1][col] !== null);
    };
        
    return (
        <div className="game-board">
            {tiles.map((row, rowIndex) => (
                row.map((tileValue, colIndex) => (
                    <Tile
                        key={`${rowIndex}-${colIndex}`}
                        value={tileValue}
                        onPlaceTile={() => placeTile(rowIndex, colIndex)}
                        playerTurn={playerTurn}
                        canHover={canPlaceTile(rowIndex, colIndex, tiles)}
                    />
                ))
            ))}
        </div>
    );
}

export default Board;
