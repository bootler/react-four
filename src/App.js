import React, { Component } from 'react';
import Game from './components/Game/Game';
import './App.css';

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
