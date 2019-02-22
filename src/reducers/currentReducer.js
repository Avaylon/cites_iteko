export function currentReducer(state = {} , action) {


	if (action.type === 'GET_CITY_INFO') {
		state = { ...action.payload }
	}

	return state
}