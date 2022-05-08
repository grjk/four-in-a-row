import React, { useEffect } from "react";
import "../css/board.css";

const Circle = ({ player }) => {
  return (
    <div
      className={`circle ${player == 1 ? "blue" : player == 2 ? "red" : ""}`}
    ></div>
  );
};

export default Circle;
