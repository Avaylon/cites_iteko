const initialState = {

}


export function userReducer(state = initialState , action) {


	if (action.type === 'CLEAR_USER' ) {
		state = {}
	}
	if (action.type === 'SET_USER') {
		state = { ...action.payload }
	}

	return state
}