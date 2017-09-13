import { ACTION_TYPES } from './actions';
import { BOARD_SIZE, CATS_NUMBER } from './constants';


const initFirstState = () => {
    let cats = [];

    for (let i = 0; i < BOARD_SIZE * BOARD_SIZE; i++) {
        cats.push(Math.floor(Math.random() * CATS_NUMBER))
    }

    return {
        cats: cats,
        selected: -1,
    }
}


const selectCat = (state, catIndex) => {
    return {
        ...state,
        selected: (state.selected == catIndex ? -1 : catIndex)
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
