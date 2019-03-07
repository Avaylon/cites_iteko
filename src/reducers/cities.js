export function citiesReducer(state = [] , action) {

	if (action.type === 'DELETE_CITY' || action.type === 'GET_CITY_LIST' || action.type === 'EDIT_CITY' || action.type === 'ADD_CITY') {

		state = [ ...action.payload ]

	}



	return state
}