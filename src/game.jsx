import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import * as actions from './actions';
import Board from './board.jsx';


class Panel extends React.Component {
    render() {
        const { state } = this.props;

        return (
            <div className="info">
                <div className="info-block">
                    <div className="info-item">Score:</div>
                    <div className="info-item">{ state.info.score }</div>
                </div>
            </div>
        )
    }
};

Panel = connect((state) => ({state: state}), actions)(Panel);


class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <Board />
                <Panel />
            </div>
        )
    }
};

export default Game;
