import React, { useState, useEffect } from "react";
import axios from "axios";
import Column from "./Column";
import Button from "./Button";
import "../css/app.css";
import "../css/board.css";
import SelectPlayer from "./SelectPlayer";

const Board = () => {
  const emptyBoard = Array(4)
    .fill()
    .map(() => Array(4).fill(0));

  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [boardArray, setBoardArray] = useState(emptyBoard);
  const [winStatement, setWinStatement] = useState();
  const [playerMoves, setPlayerMoves] = useState([]);

  useEffect(() => {
    // once currentPlayer is 2 this will run, creating a move for player 2
    const fetchMoves = async () => {
      const { data } = await axios.get(
        `https://w0ayb2ph1k.execute-api.us-west-2.amazonaws.com/production?moves=[${playerMoves}]`
      );

      if (currentPlayer == 2) {
        const computerMove = data[data.length - 1];
        setTimeout(() => {
          handleDropToken(computerMove);
        }, 300);
      }
      return data;
    };

    if (currentPlayer == 2 && playerMoves.length < 16) {
      fetchMoves();
    }
  }, [currentPlayer]);

  // checks for win after board has been updated at least once
  useEffect(() => {
    if (playerMoves.length > 0) {
      checkIfWon(currentPlayer);
      setCurrentPlayer(currentPlayer == 1 ? 2 : 1);
    }
  }, [boardArray]);

  const resetBoard = () => {
    setBoardArray(emptyBoard);
    setWinStatement();
    setCurrentPlayer(0);
    setPlayerMoves([]);
  };

  const handleDropToken = (col) => {
    if (winStatement) return;
    const column = [...boardArray[col]];
    let validMoveMade = false;
    for (let i = column.length - 1; i >= 0; i--) {
      if (column[i] == 0) {
        column[i] = currentPlayer;
        validMoveMade = true;
        break;
      }
    }

    if (!validMoveMade) return;
    setPlayerMoves([...playerMoves, col]);
    const newBoard = [...boardArray];
    newBoard[col] = column;
    setBoardArray(newBoard);
  };

  const checkIfWon = (player) => {
    let winningStatement = player == 1 ? "You won!" : "You lost :/";

    // check for draw, will get overwritten if winner is found at 16 moves
    if (playerMoves.length == 16) {
      setWinStatement("Draw!");
    }

    // Check columns
    for (let i = 0; i < boardArray.length; i++) {
      for (let j = 0; j < boardArray[i].length; j++) {
        if (boardArray[i][j] !== player) {
          break;
        }
        if (j == 3) setWinStatement(winningStatement);
      }
    }

    // Check rows
    for (let i = 0; i < boardArray.length; i++) {
      for (let j = 0; j < boardArray[i].length; j++) {
        if (boardArray[j][i] !== player) {
          break;
        }

        if (j == 3) setWinStatement(winningStatement);
      }
    }

    // Check left to right diagonal
    for (let i = 0; i < boardArray.length; i++) {
      if (boardArray[i][i] !== player) {
        break;
      }

      if (i == 3) setWinStatement(winningStatement);
    }
    // Check right to left diagonal
    for (let i = boardArray.length - 1; i >= 0; i--) {
      if (boardArray[boardArray.length - 1 - i][i] !== player) {
        break;
      }

      if (i == 0) setWinStatement(winningStatement);
    }
  };

  return (
    <div>
      {currentPlayer == 0 ? (
        <SelectPlayer setPlayer={setCurrentPlayer} />
      ) : (
        <div className="board-container">
          <div className={`win-result ${winStatement ? "nice" : ""}`}>
            {winStatement ? winStatement : `Player ${currentPlayer}'s turn`}
          </div>
          <div className="board">
            <Column
              col={boardArray[0]}
              player={currentPlayer}
              handleDropToken={() => handleDropToken(0)}
            />
            <Column
              col={boardArray[1]}
              player={currentPlayer}
              handleDropToken={() => handleDropToken(1)}
            />
            <Column
              col={boardArray[2]}
              player={currentPlayer}
              handleDropToken={() => handleDropToken(2)}
            />
            <Column
              col={boardArray[3]}
              player={currentPlayer}
              handleDropToken={() => handleDropToken(3)}
            />
          </div>
          <div className="row-space-evenly">
            <Button onClick={resetBoard} text="Main Menu" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Board;
