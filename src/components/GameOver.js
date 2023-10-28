import GameState from "./GameState";
const GameOver = ({gameState}) => {
   switch(gameState){
    case GameState.inProgress:
        return<></>
    case GameState.playerRwins:
        return <div className="game-over">R wins</div>
    case GameState.playerYwins:
        return <div className="game-over">Y wins</div>   
    case GameState.draw:
        return <div className="game-over">Draw</div>       
    default:
        return <></>
   }
}
 
export default GameOver;