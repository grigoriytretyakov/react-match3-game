export const ACTION_TYPES = {
    SELECT_CAT: 'SELECT_CAT',

    RELOAD_GAME: 'RELOAD_GAME',
};


export const selectCat = (catIndex) => ({
    type: ACTION_TYPES.SELECT_CAT,
    catIndex: catIndex,
})


export const reloadGame = () => ({
    type: ACTION_TYPES.RELOAD_GAME,
})
