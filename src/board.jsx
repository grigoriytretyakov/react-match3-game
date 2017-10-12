import React from 'react';
import { connect } from 'react-redux';
import { Motion, spring } from 'react-motion';

import * as actions from './actions';
import { BOARD_SIZE } from './constants';


class Cat extends React.Component {
    click() {
        const { catIndex, selectCat } = this.props;
        selectCat(catIndex);
    }

    render() {
        const { catKind, catIndex, selected } = this.props;

        if (catKind < 0) {
            return (
                <div className="catblock">
                </div>
            )
        }
        else {
            const left = catIndex % BOARD_SIZE * 60;
            const top = Math.floor(catIndex / 10) * 60;
            return (
                <div className={ selected ? 'catblock selected' : 'catblock'  } 
                    style={{top: `${top}px`, left: `${left}px`}}
                    onClick={(e) => this.click()}>
                    <img
                        className={ `cat cat-${catKind}` }
                        src={ `/cat${catKind}.png` } />
                </div>
            )
        }
    }
};

Cat = connect((state) => ({}), actions)(Cat);


class Board extends React.Component {
    render() {
        const { state } = this.props;

        let cats = state.cats.map(
            (cat, i) => (
                <Cat
                    catKind={ cat.kind }
                    catIndex={ i }
                    key={`key-cat-${cat.num}`}
                    selected={ i == state.selected }
                />
            )
        );

        return (
            <div className="board">{ cats }</div>
        )
    }
};

export default connect((state) => ({state: state}), actions)(Board);
