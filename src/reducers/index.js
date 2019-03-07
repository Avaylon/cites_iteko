import { combineReducers } from 'redux'

import { citiesReducer } from './cities.js'
import { detailReducer } from './city-detail.js'
import { attrsReducer } from './attrs.js'
import { userReducer } from './user.js'
import { currentReducer } from './currentReducer.js'
import { regionsReducer } from './regions.js'
import { allAttrsReducer } from './allattrs.js'
import { routerReducer } from 'react-router-redux';



const reducers = {
	cities: citiesReducer,
	currCity: currentReducer,
	user: userReducer,
	attrs: attrsReducer,
	allAttrs: allAttrsReducer,
	regions: regionsReducer,
	detail: detailReducer
};



export const rootReducer = combineReducers({
	...reducers,
	routing: routerReducer
});