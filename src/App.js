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
      if (squares[i]) {
        const attr = (i) => (squares[i] ? squares[i].props.className : null)
        if (attr(i) === attr(i + 1)
          && attr(i) === attr(i + 2)
          && attr(i) === attr(i + 3))
          {
            return attr(i)
          }
        else if (attr(i) === attr(i + len)
                  && attr(i) === attr(i + (len * 2))
                  && attr(i) === attr(i + (len * 3)))
                  {
                    return attr(i);
                  }
        else if (attr(i) === attr(i + diagFwd)
                  && attr(i) === attr(i + (diagFwd * 2))
                  && attr(i) === attr(i + (diagFwd * 3)))
                  {
                    return attr(i);
                  }
        else if (attr(i) === attr(i + diagBkwd)
                  && attr(i) === attr(i + (diagBkwd * 2))
                  && attr(i) === attr(i + (diagBkwd * 3)))
                  {
                    return attr(i);
                  }
        else { }           
      }     
    }
    return null;
  }

  //given the square that was clicked, returns the index of the lowest square in the same column,
  //since pieces should always stack up from the bottom
  //This is accomplished by recursively checking the column for the lowest empty square
  getLowestFreeSlot(index,btm)
  {     
      let bottom = btm;
      if (btm === undefined) // !btm doesn't work because 0 is falsy but is a valid value for this method
      {
        bottom = this.state.rows -1;
      }

      const squares = this.state.squares.slice();
      const len = this.state.cols;
      //represents the square in the same column and lowest row as the square that was clicked
      const lowest = index + (bottom * len);
     
      if (lowest < squares.length && !squares[lowest]) { 
        return lowest
      }
      else {
        bottom -= 1;
        if (bottom < 0) {
          return null;
        }
        return this.getLowestFreeSlot(index,bottom);      
      }
  }

  handleClick(i) {
    const red = <span className="red">R</span>
    const blue = <span className="blue">B</span>
    const squares = this.state.squares.slice();

    const lowestFreeSlot = this.getLowestFreeSlot(i);

    if (this.determineWinner(squares) || lowestFreeSlot === null) 
        return;

    squares[lowestFreeSlot] = this.state.redToMove ? red : blue;
    this.setState({
      squares: squares,
      redToMove: !this.state.redToMove
    });
  }

  render() {
    let status;  
    if (this.determineWinner(this.state.squares)) {
      status = "Winner: "+ (this.determineWinner(this.state.squares) === 'red' ? 'Red' : 'Blue');
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
              <section>
                <button>Save Game</button>
                <button>Load Game</button>
            </section>
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
        </main>        
      </div>
    );
  }
}

export default App;
