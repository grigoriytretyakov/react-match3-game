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


class Cat extends React.Component {
    render() {
        const { i } = this.props;
        const catNumber = i % 6; // Всего 6 котов нарисовано

        return (
            <button className="btn-cat">
                <img className={`cat cat-${catNumber}`} src={`/cat${catNumber}.png`} />
            </button>
        )
    }
};

class Board extends React.Component {
    render() {
        let cats = [];
        for (let i = 0; i < 100; i++) {
            cats.push(<Cat i={ i } />)
        }
        return (
            <div className="board">
                { cats }
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
