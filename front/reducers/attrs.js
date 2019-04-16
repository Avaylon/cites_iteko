export function attrsReducer(state = [] , action) {



	if (action.type === 'GET_ATTRS_LIST') {
		state = [ ...action.payload ]
	}
	if (action.type === 'DELETE_ATTRS') {
		state = state.filter(  (currValue) => (action.payload.id !== currValue.id) )
	}

	if (action.type === 'EDIT_ATTRS') {
		state = state.map(  (currValue) => (action.payload.id !== currValue.id ? currValue : action.payload ) )
	}

	if (action.type === 'ADD_ATTRS' ) {
		state = state.concat(action.payload)
	}


	// to do: add types
	return state
}