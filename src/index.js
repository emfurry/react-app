import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
  
class Board extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null)
    };
  }

  handleClick(i) {
    if (this.state.squares[i] != null || this.props.turn === '-')
      return;

    const squares = this.state.squares.slice();    
    squares[i] = this.props.turn;
    this.setState({ squares: squares }, () => this.props.handleTakeTurn(this.state.squares));
  }

  renderSquare(i) {
    return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)} />;
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

class Game extends React.Component {

  constructor() {
    super();
    this.state = {
      turn: 'X'
    };
  }

  handleTakeTurn(squares) {

    var winner = calculateWinner(squares);
    if (winner)
      this.setState({ turn: '-'});
    else if (this.state.turn === 'X')
      this.setState({ turn: 'O'});
    else
      this.setState({ turn: 'X'});
  }

  render() {
    let status;
    if (this.state.turn === '-')
      status = 'Game over!'
    else
      status = 'Next player: ' + (this.state.turn);

    return (
      <div className="game">
        <div className="game-board">
          <div className="status">{status}</div>
          <Board turn={this.state.turn} handleTakeTurn={(sq) => this.handleTakeTurn(sq)} />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

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