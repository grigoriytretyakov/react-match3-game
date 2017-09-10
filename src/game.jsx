import React from 'react';
import ReactDOM from 'react-dom';

class Info extends React.Component {
    render() {
        return (
            <div className="info">
                Score: 0
            </div>
        )
    }
};


class Board extends React.Component {
    render() {
        return (
            <div className="board">
                <img src="/cats.png" alt="Котики" style={{maxWidth: '100%'}} />
            </div>
        )
    }
};


class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <Board />
                <Info />
            </div>
        )
    }
};

export default Game;
