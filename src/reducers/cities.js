export function citiesReducer(state = {} , action) {

	if (action.type === 'GET_CITY_LIST') {
		state = {...state, list: [ ...action.payload ] }
	}
	if (action.type === 'ADD_CITY') {
		state = {...state, list: state.list.concat(action.payload) }
	}

	if ( action.type === 'DELETE_CITY') {
		state = {...state, list: state.list.filter((currValue) => ( currValue.id !== action.payload.id )) }
	}

	if ( action.type === 'EDIT_CITY') {
		state = {...state, list: state.list.filter((currValue) => ( currValue.id !== action.payload.id )).concat(action.payload) }
	}



	return state
}

