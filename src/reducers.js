import { ACTION_TYPES } from './actions';
import { BOARD_SIZE, CATS_NUMBER } from './constants';


const MATCHED_CATS_MAX_NUMBER = 15;


const createCat = (() => { 
    let nextCatNumber = 0;

    return ((x, y) => {
        nextCatNumber++;

        return {
            num: nextCatNumber,
            kind: Math.floor(Math.random() * CATS_NUMBER),
            x: x,
            y: y,
        };
    })
})();


const initFirstState = () => {
    let cats = [];

    for (let y = 0; y < BOARD_SIZE; y++) {
        let line = [];

        for (let x = 0; x < BOARD_SIZE; x++) {
            line.push(createCat(x, y))
        }

        cats.push(line);
    }

    let folded = foldSimilarCats(cats);
    cats = folded.cats;

    return {
        info: {
            score: 0
        },
        cats: cats,
        matched: [],
        selected: null,
    }
}


const findMatchedLines = (cats) => {
    let matched = [];

    for (let line = 0; line < BOARD_SIZE; line++) {
        let start = 0;
        let end = 0;
        for (let x = 1; x < BOARD_SIZE; x++) {
            if (cats[line][start].kind == cats[line][x].kind) {
                end = x;
            }
            if (x == (BOARD_SIZE - 1) || cats[line][start].kind != cats[line][x].kind) {
                if ((end - start) > 1) {
                    for (let i = start; i <= end; i++) {
                        matched.push(cats[line][i]);
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
            if (cats[start][col].kind == cats[y][col].kind) {
                end = y;
            }
            if (y == (BOARD_SIZE - 1) || cats[start][col].kind != cats[y][col].kind) {
                if ((end - start) > 1) {
                    for (let i = start; i <= end; i++) {
                        matched.push(cats[i][col]);
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
    cats = cats.map(
        (line, y) => (line.map(
            (cat, x) => (cat === null ? null : {...cat}))
        )
    );

    for (let col = 0; col < BOARD_SIZE; col++) {
        let empty = -1;
        for (let y = BOARD_SIZE - 1; y > -1; y--) {
            if (cats[y][col] === null && empty == -1) {
                empty = y;
            }
            else if (cats[y][col] !== null && empty != -1) {
                cats[empty][col] = cats[y][col];
                cats[empty][col].x = col;
                cats[empty][col].y = empty;

                cats[y][col] = null;
                empty--;
            }
        }
    }

    for (let y = 0; y < BOARD_SIZE; y++) {
        for (let x = 0; x < BOARD_SIZE; x++) {
            if (cats[y][x] === null) {
                cats[y][x] = createCat(x, y);
            }
        }
    }

    return cats;
}


const foldSimilarCats = (cats) => {
    /* Three or more one color cats next to each other should be removed. */

    let toRemove = [];
    let score = 0;

    cats = cats.map((line) => (line.map((cat) => ({...cat}))));

    let matched = [];

    do {
        toRemove = findMatchedLines(cats).concat(findMatchedCols(cats));
        matched = matched.concat(toRemove);

        score += toRemove.length;

        cats = cats.map(
            (line) => (line.map(
                (cat) => (toRemove.indexOf(cat) == -1 ? {...cat} : null))
            )
        );
        cats = fillCats(cats);
    } while (toRemove.length > 0);

    return { score: score, cats: cats, matched: matched };
}


const selectCat = (state, clickedCat) => {
    let neighbors = [];

    if (state.selected !== null) {
        const x = state.selected.x;
        const y = state.selected.y;

        if (x > 0) {
            neighbors.push(state.cats[y][x - 1]);
        }
        if (x < 9) {
            neighbors.push(state.cats[y][x + 1]);
        }
        if (y > 0) {
            neighbors.push(state.cats[y - 1][x]);
        }
        if (y < 9) {
            neighbors.push(state.cats[y + 1][x]);
        }
    }

    if (state.selected === null || state.selected === clickedCat || neighbors.indexOf(clickedCat) < 0) {
        return {
            ...state,
            selected: (state.selected === clickedCat ? null : clickedCat)
        }
    }
    else {
        let cats = state.cats.map((line) => (line.map((cat, col) => ({...cat}))));
        cats[clickedCat.y][clickedCat.x] = {
            ...state.cats[state.selected.y][state.selected.x],
            y: clickedCat.y,
            x: clickedCat.x,
        }
        cats[state.selected.y][state.selected.x] = {
            ...clickedCat,
            y: state.selected.y,
            x: state.selected.x,
        }

        let folded = foldSimilarCats(cats);
        if (folded.score == 0) {
            cats = state.cats;
        }
        else {
            cats = folded.cats;
        }

        let matched = state.matched.concat(folded.matched).slice(-MATCHED_CATS_MAX_NUMBER);

        return {
            ...state,
            info: {
                ...state.info,
                score: state.info.score + folded.score,
            },
            cats: cats,
            matched: matched,
            selected: null
        }
    }
}


export default (state=initFirstState(), action) => {
    switch(action.type) {
        case ACTION_TYPES.SELECT_CAT:
            return selectCat(state, action.cat);

        case ACTION_TYPES.RELOAD_GAME:
            return initFirstState();

        default:
            return state;
    }
}
