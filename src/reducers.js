import { ACTION_TYPES } from './actions';
import { BOARD_SIZE, CATS_NUMBER } from './constants';


const LIVE = 'live';

const DEAD = 'dead';


const createCat = (() => { 
    let maxNum = 0;

    return (() => {
        maxNum++;

        return {
            num: maxNum,
            kind: Math.floor(Math.random() * CATS_NUMBER),
            x: 0,
            y: 0,
            state: LIVE,
        };
    })
})();


const initFirstState = () => {
    /*
     * There is no actual reason why I use the simple list instead of the
     * two-dimensional matrix for cats. I just thought it may be interesting.
     */

    let cats = [];

    for (let i = 0; i < BOARD_SIZE * BOARD_SIZE; i++) {
        cats.push(createCat())
    }

    let folded = foldSimilarCats(cats);
    cats = folded.cats;

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
            if (cats[line * BOARD_SIZE + start].kind == cats[line * BOARD_SIZE + x].kind) {
                end = x;
            }
            if (x == (BOARD_SIZE - 1) || cats[line * BOARD_SIZE + start].kind != cats[line * BOARD_SIZE + x].kind) {
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
            if (cats[start * BOARD_SIZE + col].kind == cats[y * BOARD_SIZE + col].kind) {
                end = y;
            }
            if (y == (BOARD_SIZE - 1) || cats[start * BOARD_SIZE + col].kind != cats[y * BOARD_SIZE + col].kind) {
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


const fillCats = (cats) => {
    cats = [...cats];

    for (let col = 0; col < BOARD_SIZE; col++) {
        let empty = -1;
        for (let y = BOARD_SIZE - 1; y > -1; y--) {
            if (cats[y * BOARD_SIZE + col] == -1 && empty == -1) {
                empty = y;
            }
            else if (cats[y * BOARD_SIZE + col] != -1 && empty != -1) {
                cats[empty * BOARD_SIZE + col] = cats[y * BOARD_SIZE + col];
                cats[y * BOARD_SIZE + col] = -1;
                empty--;
            }
        }
    }

    cats = cats.map((cat) => (cat == -1 ? createCat() : cat));

    return cats;
}


const foldSimilarCats = (cats) => {
    /* Three or more one color cats next to each other should be removed. */

    let toRemove = [];
    let score = 0;

    cats = [...cats];

    do {
        toRemove = findMatchedLines(cats).concat(findMatchedCols(cats));

        score += toRemove.length;

        cats = cats.map((cat, i) => (toRemove.indexOf(i) == -1 ? cat : -1));
        cats = fillCats(cats);
    } while (toRemove.length > 0);

    return { score: score, cats: cats };
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
        else {
            cats = folded.cats;
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

        case ACTION_TYPES.RELOAD_GAME:
            return initFirstState();
        default:
            return state;
    }
}
