import { ACTION_TYPES } from './actions';
import { BOARD_SIZE, CATS_NUMBER } from './constants';


const initFirstState = () => {
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


const selectCat = (state, catIndex) => {
    let neighbors = [];
    let x = state.selected % 10;
    let y = Math.floor(state.selected / 10);
    if (x > 0) {
        neighbors.push(state.selected - 1);
    }
    if (x < 9) {
        neighbors.push(state.selected + 1);
    }
    if (y > 0) {
        neighbors.push(state.selected - 10);
    }
    if (y < 9) {
        neighbors.push(state.selected + 10);
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

        return {
            ...state,
            info: {
                ...state.info,
                score: state.info.score + 1,
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
