const initialState = {

}


export function userReducer(state = initialState , action) {

	if (action.type == 'SET_USER') { 
		state = { ...action.payload }
	}

	return state
}