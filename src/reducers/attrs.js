export function attrsReducer(state = {} , action) {

	if (action.type === 'GET_ATTRS_LIST') {
		state = { ...action.payload }
	}


	return state
}