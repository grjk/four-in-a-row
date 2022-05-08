import React, { useEffect } from "react";
import Circle from "./Circle";
import "../css/board.css";

const Column = ({ col, player, handleDropToken }) => {
  return (
    <div
      onClick={
        player == 1
          ? handleDropToken
          : () => console.warn("Error, not your turn")
      }
      className="column"
    >
      <Circle player={col[0]} />
      <Circle player={col[1]} />
      <Circle player={col[2]} />
      <Circle player={col[3]} />
    </div>
  );
};

export default Column;
