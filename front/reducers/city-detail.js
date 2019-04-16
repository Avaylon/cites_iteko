export function detailReducer(state = {}, action) {

	if (action.type === 'GET_CITY_DETAIL') {
		state = { ...action.payload }

	}

	return state
}