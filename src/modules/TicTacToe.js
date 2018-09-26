import React from 'react';
import '../index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
  
class Board extends React.Component {

  handleClick(i) {
    if (this.props.turn.squares[i] != null || this.props.turn.player === '-')
      return;

    const squares = this.props.turn.squares.slice();    
    squares[i] = this.props.turn.player;
    let player;
    if (this.props.turn.player === 'X')
      player = 'O';
    else
      player = 'X';

    var nextTurn = {
      player: player,
      squares: squares
    };
    this.props.handleTakeTurn(nextTurn);
  }

  renderSquare(i) {
    return <Square value={this.props.turn.squares[i]} onClick={() => this.handleClick(i)} />;
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

export default class Game extends React.Component {

  constructor() {
    super();
    this.state = {
      turnIndex: 0,
      history: [
        {
          player: 'X',
          squares: Array(9).fill(null)
        }]
    };
  }

  handleTakeTurn(nextTurn) {
    var winner = calculateWinner(nextTurn.squares);
    if (winner) {
      nextTurn.player = '-';
    }

    const history = this.state.history.splice(0, this.state.turnIndex + 1);

    this.setState({
      turnIndex: this.state.turnIndex + 1,
      history: history.concat([nextTurn])
    });
  }

  getTurn(turnIndex) {
    turnIndex = turnIndex || this.state.turnIndex;
    return this.state.history[turnIndex];
  }

  goToTurn(x) {
    this.setState({turnIndex: x});
  }

  render() {
    let status;
    if (this.getTurn().player === '-')
      status = 'Game over!'
    else
      status = 'Next player: ' + (this.getTurn().player);

    const turns = this.state.history.map((turn, x) => {
      const message = (x === 0) ? 'Start' : 'Turn ' + (x+1);
      return (
        <li key={x}><button onClick={() => this.goToTurn(x)}>{message}</button></li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board turn={this.getTurn()} handleTakeTurn={(nextTurn) => this.handleTakeTurn(nextTurn)} />
        </div>
        <div className="game-info">
          <div className="status">{status}</div>
          <ol>{turns}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}