import React from 'react';
import { connect } from 'react-redux';

import * as actions from './actions';


class Cat extends React.Component {
    click() {
        const { catIndex, selectCat } = this.props;
        selectCat(catIndex);
    }

    render() {
        const { catKind, selected } = this.props;

        if (catKind < 0) {
            return (
                <button className="btn-cat">
                </button>
            )
        }
        else {
            return (
                <button
                    className={ selected ? 'btn-cat selected' : 'btn-cat'  } 
                    onClick={(e) => this.click()}
                >
                    <img
                        className={ `cat cat-${catKind}` }
                        src={ `cat${catKind}.png` }
                    />
                </button>
            )
        }
    }
};

Cat = connect((state) => ({}), actions)(Cat);


class Board extends React.Component {
    render() {
        const { state } = this.props;

        let cats = state.cats.map(
            (catKind, i) => (
                <Cat
                    catKind={ catKind }
                    catIndex={ i }
                    key={`key-cat-${i}`}
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
