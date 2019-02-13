export function citiesReducer(state = {} , action) {


	if (action.type == 'GET_CITY_LIST') {
		state = { ...state, cities: action.payload }
	}

	if (action.type == 'GET_CITY_INFO') { 
		state = { ...state, currCity: action.payload }
	}

	return state
}