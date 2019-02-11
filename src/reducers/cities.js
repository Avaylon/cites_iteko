const initialState = {
	cities: [
		[1, 'Москва','3467','Россия','--'],
		[2, 'Сочи','3443','Россия','--'],
		[3, 'Питер','4396','Россия','--'],
		[4, 'Пекин','1212','Китай','--'],
		[5, 'Париж','4964','Франция','--'],
	]

}



export function pageReducer(state = initialState , action) {


	if (action.type == 'GET_CITY_INFO') { 
		state = { ...state, currCity: action.payload}
	}

	return state
}