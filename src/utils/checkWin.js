function checkWin(tiles, row, col, currentPlayer, requiredMarks, boardSize) {
    const directions = [
        {x:1, y:0},
        {x:0, y:1},
        {x:1, y:1},
        {x:1, y:-1},
    ];

    const shouldAddCount = (currentX, currentY) => {
        return currentX >= 0 && currentX < boardSize.columns && currentY >= 0 && currentY < boardSize.rows && tiles[currentY][currentX] === currentPlayer;
    }

    for (let direction of directions) {
        let count=1;
    
        for (let sign of [1, -1]) { // Using sign to differentiate between positive and negative direction
            let count = 1; // Move the count declaration here to reset it for each direction
            for (let i = 1; i < requiredMarks; i++) {
                const currentX = col + direction.x * i * sign;
                const currentY = row + direction.y * i * sign;
    
                if (shouldAddCount(currentX, currentY)) {
                    count++;
                } else {
                    break;
                }
            }
                
            if (count >= requiredMarks) {
                return true;
            }
        }
    }

    return false;
}

export default checkWin;
