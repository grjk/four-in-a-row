import React from "react";
import Button from "./Button";

const SelectPlayer = ({ setPlayer }) => {
  return (
    <div className="select-player-container">
      <div className="title-main">Welcome to Drop Token!</div>
      <div className="title-sub">Who would you like to go first?</div>
      <div className="row-space-evenly">
        <Button className="btn-blue" onClick={() => setPlayer(1)} text="Me" />
        <Button
          className="btn-red"
          onClick={() => setPlayer(2)}
          text="Computer"
        />
      </div>
    </div>
  );
};

export default SelectPlayer;
