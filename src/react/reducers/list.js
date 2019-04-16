export default (state = [] , action) => {

    if (action.type === 'LIST_UPDATE') {
        state = [ ...action.payload ]
    }

    return state
}