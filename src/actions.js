export const ACTION_TYPES = {
    SELECT_CAT: 'SELECT_CAT',

    RELOAD_GAME: 'RELOAD_GAME',
};


export const selectCat = (cat) => ({
    type: ACTION_TYPES.SELECT_CAT,
    cat: cat,
})


export const reloadGame = () => ({
    type: ACTION_TYPES.RELOAD_GAME,
})
