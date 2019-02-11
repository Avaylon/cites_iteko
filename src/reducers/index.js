import { combineReducers } from 'redux'

import { pageReducer } from './cities.js'
import { detailReducer } from './city-detail.js'
import { userReducer } from './user.js'
import { routerMiddleware, routerReducer, syncHistoryWithStore } from 'react-router-redux';



const reducers = {
	page: pageReducer,
	user: userReducer,
	detail: detailReducer
}



export const rootReducer = combineReducers({
	...reducers,
	routing: routerReducer
})