import React from 'react';
import Board from './board.js';
import './game.css';
import logo from './logo.svg';

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
            return [a, b, c];
        }
    }
    return null;
}

export default class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                position: null
            }],
            xIsNext: true,
            stepNumber: 0,
            canUndo: false,
            canRedo: false
        }
    }

    initGame() {
        this.setState({
            history: [{
                squares: Array(9).fill(null),
                position: null
            }],
            xIsNext: true,
            stepNumber: 0,
            canUndo: false,
            canRedo: false
        });
    }

    handleClick = (i) => {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
                position: i
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
            canUndo: this.state.stepNumber + 1 > 0,
            canRedo: this.state.stepNumber + 1 < history.length
        });
    }

    jumpTo(step) {
        if (step >= 0 && step < this.state.history.length) {
            this.setState({
                stepNumber: step,
                xIsNext: (step % 2) === 0,
                canUndo: step > 0,
                canRedo: step < this.state.history.length - 1
            });
        }
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        let status;
        if (winner) {
            status = 'Winner: ' + current.squares[winner[0]];
        } else if (this.state.stepNumber === 9) {
            status = 'Game Draw';
        } else {
            status = 'Player Turn: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        winner={winner}
                        squares={current.squares}
                        onClick={(i) => { this.handleClick(i) }}
                    />
                </div>
                <div className="game-info">
                    <div className="game-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <h2 className="game-title mt-auto mb-auto">React Tic Tac Toe</h2>
                    </div>
                    <h3>{status}</h3>
                    <button className="btn ml-1 mt-1" disabled={!this.state.canUndo} onClick={() => { this.jumpTo(this.state.stepNumber - 1) }}>Undo<i className="fa fa-undo ml-1"></i></button>
                    <button className="btn ml-1 mt-1" disabled={!this.state.canRedo} onClick={() => { this.jumpTo(this.state.stepNumber + 1) }}>Redo<i className="fa fa-repeat ml-1"></i></button>
                    <div>
                        <button className="btn ml-1 mt-1" onClick={() => { this.initGame() }}>Restart</button>
                    </div>
                </div>
            </div>
        );
    }
}