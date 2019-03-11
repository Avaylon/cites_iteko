export function currentReducer(state = {} , action) {


	if (action.type === 'GET_CITY_INFO') {
		state = { ...action.payload }

	}

	if (action.type === 'RESET_CITY') {
		state = {}
	}

	return state
}