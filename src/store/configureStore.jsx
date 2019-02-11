import { createStore } from 'redux'
import { rootReducer } from '../reducers'



const initinalState = {
	user: {
		name: localStorage.user_name,
		region: localStorage.user_region
	}
}


export const store = createStore(rootReducer, initinalState)


