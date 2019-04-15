import React, { Component } from 'react';
import './App.css';

function Square(props) {
  return(
    <button className="square"
      onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends Component {
  renderSquares(i) {
    return(
      <Square value={this.props.squares[i]} 
        onClick={() => this.props.onClick(i)}/>
    );
  }

  render() {
    const NUM_ROWS = this.props.rows; 
    const ROW_LENGTH = this.props.cols;
    
    const row = new Array(ROW_LENGTH).fill(null);
    
    const render = [];
    for (let i = 0; i < NUM_ROWS; i++) {
        render.push(<div className="board-row">{row.map((square,index) => (
          square = this.renderSquares((index + (row.length * i)))
        ))}</div>);
    }
  
    return (  
      <span> 
        {render}
      </span>
    );
  }
}

class Game extends Component {
  constructor(props) {
    super(props);
      this.state = {
        rows: 7,
        cols: 8,
        squares: [],
        redToMove: true,
      }
  }

  
  //allows the size of the game board to be immediately computed
  //probably will allow the user to pick the rows and cols once the CSS is improved
  componentDidMount() {
    const boardSize = this.state.rows * this.state.cols;
    this.setState({
      squares: Array(boardSize).fill(null)
    });
  }

  /* iterate over the board squares from the top left to the bottom right
     The constants represent the difference in array index for squares
     that are visually adjacent vertically, horizontally, forwards diagonally, or backwards diagonally
     which is all the ways to get four in a row. For each square,
     check if the next adjacent 3 in every possible direction are the same to determine the winner
  */
  determineWinner(squares) {
    const len = this.state.cols;
    const diagFwd = this.state.cols + 1;
    const diagBkwd = this.state.cols - 1;

    for (let i = 0; i < squares.length; i++) {
      if (squares[i] && squares[i] === squares[i+1]
          && squares[i] === squares[i+2]
          && squares[i] === squares[i+3])
          {
            return squares[i];
          }
      else if (squares[i] && squares[i] === squares[i + len]
                && squares[i] === squares[i + (len * 2)]
                && squares[i] === squares[i + (len * 3)])
                {
                  return squares[i];
                }
      else if (squares[i] && squares[i] === squares[i + diagFwd]
                && squares[i] === squares[i + (diagFwd * 2)]
                && squares[i] === squares[i + (diagFwd * 3)])
                {
                  return squares[i];
                }
       else if (squares[i] && squares[i] === squares[i + diagBkwd]
                && squares[i] === squares[i + (diagBkwd * 2)]
                && squares[i] === squares[i + (diagBkwd * 3)])
                {
                  return squares[i];
                }
      else { }           
    }
    return null;
  }

  handleClick(i) {
    //TODO: bugs with trying to color the output here, try coloring it with CSS selector
    const red = <span className="red">R</span>
    const blue = <span className="blue">B</span>
    const squares = this.state.squares.slice();

    if (this.determineWinner(squares) || squares[i]) return;

    squares[i] = this.state.redToMove ? 'R' : 'B' ;
    this.setState({
      squares: squares,
      redToMove: !this.state.redToMove
    });
  }

  render() {
    let status;  
    if (this.determineWinner(this.state.squares)) {
      status = "Winner: "+ (this.determineWinner(this.state.squares) === 'R' ? 'Red' : 'Blue');
    } else {
      status = "Next Player: " + (this.state.redToMove ? 'Red' : 'Blue');
    }
    return (
      <div className="game">
        <div className="status">{status}</div>
           <Board onClick={i => this.handleClick(i)}
              rows={this.state.rows} 
              cols={this.state.cols} 
              squares={this.state.squares}
              />
        </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>React Four</h1>
        </header>
        <main className="main-bg">
            <Game />
            <section>
              <button>Save Game</button>
              <button>Load Game</button>
            </section>
        </main>        
      </div>
    );
  }
}

export default App;
