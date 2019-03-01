export function attrsReducer(state = [] , action) {

	if (action.type === 'GET_ATTRS_LIST') {
		state = [ ...action.payload ]
	}

	if (action.type === 'EDIT_ATTRS' || action.type === 'DELETE_ATTRS') {
		state = [ ...action.payload ]
	}



	return state
}