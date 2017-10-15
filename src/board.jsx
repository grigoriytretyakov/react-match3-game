import React from 'react';
import { connect } from 'react-redux';
import { Motion, spring } from 'react-motion';

import * as actions from './actions';
import { BOARD_SIZE } from './constants';


class Cat extends React.Component {
    click() {
        const { cat, selectCat } = this.props;
        selectCat(cat);
    }

    render() {
        const { cat, selected } = this.props;

        if (cat === null) {
            return (
                <div className="catblock"> </div>
            )
        }
        else {
            const left = cat.x * 60;
            const top = cat.y * 60;
            return (
                <div className={ selected ? 'catblock selected' : 'catblock'  } 
                    style={{top: `${top}px`, left: `${left}px`}}
                    onClick={(e) => this.click()}>
                    <img
                        className={ `cat cat-${cat.kind}` }
                        src={ `/cat${cat.kind}.png` } />
                </div>
            )
        }
    }
};

Cat = connect((state) => ({}), actions)(Cat);


class MatchedCat extends React.Component {
    render() {
        const { cat } = this.props;

        if (cat === null) {
            return (
                <div className="catblock"> </div>
            )
        }
        else {
            const left = cat.x * 60;
            const top = cat.y * 60;
            return (
                <Motion defaultStyle={{x: left, y: top}} style={{x: spring(BOARD_SIZE * 60 + 70), y: spring(150)}}>
                    {value => 
                        (
                            <div className="catblock matched" style={{top: `${value.y}px`, left: `${value.x}px`}}>
                                <img
                                    className={ `cat cat-${cat.kind}` }
                                    src={ `/cat${cat.kind}.png` } />
                            </div>
                        )
                    }
                </Motion>
            )
        }
    }
};
class Board extends React.Component {
    render() {
        const { state } = this.props;

        let cats = [];
        for (let i = 0; i < BOARD_SIZE; i++) {
            for (let j = 0; j < BOARD_SIZE; j++) {
                const cat = state.cats[i][j];
                cats.push(
                    <Cat
                        cat={ cat }
                        key={`key-cat-${cat.num}`}
                        selected={ cat !== null && cat === state.selected }
                    />
                );
            }
        }

        let matched = state.matched.map(
            (cat) => (
                <MatchedCat
                    cat={ cat }
                    key={`key-cat-${cat.num}`}
                    selected={ false }
                />
            )
        );

        return (
            <div className="board">
                { cats }
                { matched }
            </div>
        )
    }
};

export default connect((state) => ({state: state}), actions)(Board);
