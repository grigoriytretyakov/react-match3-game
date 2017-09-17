import { ACTION_TYPES } from './actions';
import { BOARD_SIZE, CATS_NUMBER } from './constants';


const initFirstState = () => {
    /*
     * There is no actual reason why I use the simple list instead of the
     * two-dimensional matrix for cats. I just thought it may be interesting.
    */

    let cats = [];

    for (let i = 0; i < BOARD_SIZE * BOARD_SIZE; i++) {
        cats.push(Math.floor(Math.random() * CATS_NUMBER))
    }

    return {
        info: {
            score: 0
        },
        cats: cats,
        selected: -1,
    }
}


const findMatchedLines = (cats) => {
    let matched = [];

    for (let line = 0; line < BOARD_SIZE; line++) {
        let start = 0;
        let end = 0;
        for (let x = 1; x < BOARD_SIZE; x++) {
            if (cats[line * BOARD_SIZE + start] == cats[line * BOARD_SIZE + x]) {
                end = x;
            }
            if (x == (BOARD_SIZE - 1) || cats[line * BOARD_SIZE + start] != cats[line * BOARD_SIZE + x]) {
                if ((end - start) > 1) {
                    for (let i = start; i <= end; i++) {
                        matched.push(line * BOARD_SIZE + i);
                    }
                }
                start = x;
                end = x;
            }
        }
    }

    return matched;
}


const findMatchedCols = (cats) => {
    let matched = [];

    for (let col = 0; col < BOARD_SIZE; col++) {
        let start = 0;
        let end = 0;
        for (let y = 1; y < BOARD_SIZE; y++) {
            if (cats[start * BOARD_SIZE + col] == cats[y * BOARD_SIZE + col]) {
                end = y;
            }
            if (y == (BOARD_SIZE - 1) || cats[start * BOARD_SIZE + col] != cats[y * BOARD_SIZE + col]) {
                if ((end - start) > 1) {
                    for (let i = start; i <= end; i++) {
                        matched.push(i * BOARD_SIZE + col);
                    }
                }
                start = y;
                end = y;
            }
        }
    }

    return matched;
}

const foldSimilarCats = (cats) => {
    /* Three or more one color cats next to each other should be removed. */

    let toRemove = findMatchedLines(cats).concat(findMatchedCols(cats));

    toRemove = toRemove.filter((i) => (cats[i] > -1)); // Temporary code, just for debug

    for (let i of toRemove) {
        cats[i] = -1;
    }
    return { score: toRemove.length, cats: cats };
}


const selectCat = (state, catIndex) => {
    let neighbors = [];
    let x = state.selected % BOARD_SIZE;
    let y = Math.floor(state.selected / BOARD_SIZE);
    if (x > 0) {
        neighbors.push(state.selected - 1);
    }
    if (x < 9) {
        neighbors.push(state.selected + 1);
    }
    if (y > 0) {
        neighbors.push(state.selected - BOARD_SIZE);
    }
    if (y < 9) {
        neighbors.push(state.selected + BOARD_SIZE);
    }

    if (state.selected < 0 || state.selected == catIndex || neighbors.indexOf(catIndex) < 0) {
        return {
            ...state,
            selected: (state.selected == catIndex ? -1 : catIndex)
        }
    }
    else {
        let cats = [...state.cats];
        cats[state.selected] = state.cats[catIndex];
        cats[catIndex] = state.cats[state.selected];

        let folded = foldSimilarCats(cats);
        if (folded.score == 0) {
            cats = state.cats;
        }

        return {
            ...state,
            info: {
                ...state.info,
                score: state.info.score + folded.score,
            },
            cats: cats,
            selected: -1
        }
    }

}


export default (state=initFirstState(), action) => {
    switch(action.type) {
        case ACTION_TYPES.SELECT_CAT:
            return selectCat(state, action.catIndex);
        default:
            return state;
    }
}
