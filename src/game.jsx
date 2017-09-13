import React from 'react';
import ReactDOM from 'react-dom';

import Board from './board.jsx';

class Info extends React.Component {
    render() {
        return (
            <div className="info">
                Score: 0
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
