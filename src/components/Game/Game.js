import React, { Component } from 'react';
import Board from '../Board/Board';
import './Game.css';
import redBtn from './static/red_button.png';
import blueBtn from './static/blue_button.png';

class Game extends Component {
    constructor(props) {
      super(props);
        this.state = {
          rows: 7,
          cols: 8,
          squares: [],
          saves: [],
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
    getLowestFreeSlot(index,btm = this.state.rows -1)
    {     
        let bottom = btm;
          
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
      const red = <img alt="R" className="red" src={redBtn}></img>
      const blue = <img alt="B" className="blue" src={blueBtn}></img>
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
  
    load(i) {   
      const squares = this.state.saves[i].squares.slice()
      const redToMove = this.state.saves[i].redToMove
      this.setState({
        squares: squares,
        redToMove: redToMove
      })
    }
  
    reset() {
      const squares = this.state.squares.slice();
      this.setState({
        squares: squares.map((s) => s = null),
        redToMove: true
      });
    }
  
    save() {
        const squares = this.state.squares.slice();
        const saves = this.state.saves.slice();
        const redToMove = this.state.redToMove;
        this.setState({
          saves: saves.concat([
            {
              squares: squares,
              redToMove: redToMove
            }
          ])
        })
    }
  
    render() {
      let status;  
      if (this.determineWinner(this.state.squares)) {
        status = "Winner: "+ (this.determineWinner(this.state.squares) === 'red' ? 'Red' : 'Blue');
      } else {
        status = "Next Player: " + (this.state.redToMove ? 'Red' : 'Blue');
      }
      return (
        <div className="container">
          <div className="savedGames"><h3>Saved Games</h3>
            {this.state.saves.map((save,index) => {
              return(
                  <span>
                    <p>Saved Game#: {index}</p>
                    <button onClick={() => this.load(index)}>load</button>
                  </span>
                )
               })
             }
          </div>
          <div className="game">
            <div className="status">{status}</div>
              <Board onClick={i => this.handleClick(i)}
                  rows={this.state.rows} 
                  cols={this.state.cols} 
                  squares={this.state.squares}
                  />
                  <section className="buttons">
                    <button className="game-button" onClick={() => this.save()}>Save Game</button>
                    <button className="game-button" onClick={() => this.reset()}>Reset</button>
                  </section>
            </div>
          </div>
      );
    }
  }

  export default Game;