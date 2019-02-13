import { createStore } from 'redux'
import { rootReducer } from '../reducers'



const initinalState = {
}


export const store = createStore(rootReducer, initinalState)


