export function citiesReducer(state = [] , action) {

	if (action.type == 'GET_CITY_LIST') {

		state = [ ...action.payload ]

	}


	return state
}