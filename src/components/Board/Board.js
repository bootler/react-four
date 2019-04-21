import React, { Component } from 'react';
import Square from '../Square/Square';
import './Board.css';

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

  export default Board;