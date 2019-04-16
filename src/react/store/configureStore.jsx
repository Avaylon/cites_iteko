import { createStore, applyMiddleware } from 'redux'
import { rootReducer } from '../reducers/index.js'
import thunk from 'redux-thunk'


const initinalState = {
    currProduct: false,
    list: [],
};

export const store = createStore(rootReducer, initinalState, applyMiddleware(thunk) );


