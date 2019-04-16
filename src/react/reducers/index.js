import { combineReducers } from 'redux'
import listReducer from './list.js'
import productReducer from './productReducer.js'

export const rootReducer = combineReducers(
    {
        list: listReducer,
        currProduct: productReducer
    }

);