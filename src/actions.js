export const ACTION_TYPES = {
    SELECT_CAT: 'SELECT_CAT',
};


export const selectCat = (catIndex) => ({
    type: ACTION_TYPES.SELECT_CAT,
    catIndex: catIndex,
})
