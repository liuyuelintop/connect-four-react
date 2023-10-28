const Tile = ({ onPlaceTile, value, playerTurn, canHover }) => {
  return (
    <div
      onClick={onPlaceTile}
      className={`tile ${canHover ? `${playerTurn}-hover` : value}`}
    >
      {/* {value} */}
    </div>
  );
};

export default Tile;
