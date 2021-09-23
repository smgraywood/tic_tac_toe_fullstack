import React, { useState } from "react";

import { calculateWinner } from "../helper";

import { Board } from "./Board.js";
import { Leaderboard } from "./Leaderboard";

const Game = () => {
  const [players, setPlayers] = React.useState([]);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXisNext] = useState(true);
  const winner = calculateWinner(history[stepNumber]);
  const xO = xIsNext ? "X" : "O";

  const handleClick = (i) => {
    const historyPoint = history.slice(0, stepNumber + 1);
    const current = historyPoint[stepNumber];
    const squares = [...current];
    // return if won or occupied
    if (winner || squares[i]) return;
    // select square
    squares[i] = xO;
    setHistory([...historyPoint, squares]);
    setStepNumber(historyPoint.length);
    setXisNext(!xIsNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXisNext(step % 2 === 0);
  };

  const renderMoves = () =>
    history.map((_step, move) => {
      const destination = move ? `Go to move #${move}` : "Go to Start";
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{destination}</button>
        </li>
      );
    });
  const PlayersList = ({ players }) => (
    <>
      <h2>Users</h2>
      <table className="center">
        <thead>
          <tr>
            {/* <th>Id</th> */}
            <th>Player Name</th>
            <th>X or O</th>
            <th>Number of Wins</th>
          </tr>
        </thead>
        <tbody>
          {players.map(({ id, player_name, x_or_o, number_of_wins }) => (
            <tr key={id}>
              <td>{player_name}</td>
              <td>{x_or_o}</td>
              <td>{number_of_wins}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );

  return (
    <>
      <h1>
        Tic Tac Toe{" "}
        <h6>
          “We do not stop playing because we grow old, we grow old because we
          stop playing!” ― Benjamin Franklin
        </h6>
      </h1>
      <Board squares={history[stepNumber]} onClick={handleClick} />
      {/* <Leaderboard /> */}
      <PlayersList players={players} />
      <div className="info-wrapper">
        <div>
          <h3>History</h3>
          {renderMoves()}
        </div>
        <h3>{winner ? "Winner: " + winner : "Next Player: " + xO}</h3>
      </div>
    </>
  );
};

export { Game };
