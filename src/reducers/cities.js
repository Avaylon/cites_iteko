export function citiesReducer(state = [] , action) {

	if (action.type == 'GET_CITY_LIST') {

		state = [ ...action.payload ]

	}

	if (action.type == 'DELETE_CITY') {

		state = [ ...action.payload ]

	}



	if (action.type == 'EDIT_CITY') {

		state = [ ...action.payload]
	}

	

	return state
}