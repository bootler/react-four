import React, { Component } from 'react';
import './App.css';

function Square(props) {
  return(
    <button className="square">
      {props.value}
    </button>
  );
}

class Board extends Component {
  renderSquares(i) {
    return(
      <Square value={i} />
    );
  }

  render() {
    const NUM_ROWS = 6; //Lift state up later by changing these to inherit from props
    const ROW_LENGTH = 8;
    
    const row = new Array(ROW_LENGTH).fill(null);
    
    const render = [];
    for (let i = 0; i < NUM_ROWS; i++) {
        render.push(<div className="board-row">{row.map((square,index) => (
          square = this.renderSquares((index + (row.length * i)))
        ))}</div>);
    }
  
    return (   
      <div className="game">
        <div className="status">Next Player: Black</div>
        {render}
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
            <Board />
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
