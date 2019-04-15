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

  handleClick(i) {
    const red = <span className="red">R</span>
    const blue = <span className="blue">B</span>
    const squares = this.state.squares.slice();

    if (squares[i]) return;

    squares[i] = this.state.redToMove ? red : blue ;
    this.setState({
      squares: squares,
      redToMove: !this.state.redToMove
    });
  }

  render() {
    let status = this.state.redToMove ? 'Red' : 'Blue';
    return (
      <div className="game">
        <div className="status">Next Player: {status}</div>
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
