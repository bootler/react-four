import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function Square(props) {
  return(
    <button className="square">
      {props.value}
    </button>
  );
}

class Board extends Component {
  render() {
    return (
      <div className="game">
        <div className="status">Next Player: Black</div> 
        <div className="board-row">
            <Square value="R"/>
            <Square />
            <Square />
            <Square />
            <Square value="B"/>
            <Square />
            <Square />
            <Square />
          </div>
          <div className="board-row">
            <Square />
            <Square />
            <Square />
            <Square />
            <Square />
            <Square />
            <Square value="R"/>
            <Square />
          </div>
          <div className="board-row">
            <Square />
            <Square />
            <Square value="R"/>
            <Square value="R"/>
            <Square />
            <Square />
            <Square />
            <Square />
          </div>
          <div className="board-row">
            <Square />
            <Square value="B"/>
            <Square />
            <Square />
            <Square />
            <Square />
            <Square value="B"/>
            <Square />
          </div>
          <div className="board-row">
          <Square value="B"/>
            <Square />
            <Square />
            <Square />
            <Square />
            <Square />
            <Square />
            <Square />
          </div>
          <div className="board-row">
            <Square />
            <Square />
            <Square />
            <Square />
            <Square />
            <Square />
            <Square />
            <Square />
          </div>
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
          
          {/*<img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload. Here is a test
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
    </a> */}
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
