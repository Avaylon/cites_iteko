import { createStore } from 'redux'
import { rootReducer } from '../reducers'



const initinalState = {
	user: {
		id: localStorage.user_id,
		name: localStorage.user_name,
		region: localStorage.user_region
	},
	cities: {
		currCity: localStorage.currCity
	}
}


export const store = createStore(rootReducer, initinalState)


