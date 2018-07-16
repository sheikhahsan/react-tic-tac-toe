import React from 'react';
import './board.css';

function Square(props) {
    if (props.isWinnerSquare) {
        return (
            <button className="square dark" onClick={props.onClick}>
                {props.value}
            </button>
        );
    } else {
        return (
            <button className="square" onClick={props.onClick}>
                {props.value}
            </button>
        );
    }
}

export default class Board extends React.Component {

    renderSquare(i) {
        return (<Square
            key={i}
            value={this.props.squares[i]}
            isWinnerSquare={this.props.winner && this.props.winner.indexOf(i) !== -1}
            onClick={() => this.props.onClick(i)}
        />
        );
    }

    render() {
        let board = [];
        for (let i = 0; i < 3; i++) {
            let row = [];
            for (let j = 0; j < 3; j++) {
                row.push(this.renderSquare(i * 3 + j));
            }
            board.push(
                <div className="board-row" key={i}>
                    {row}
                </div>
            )
        }
        return (
            board
        );
    }
}