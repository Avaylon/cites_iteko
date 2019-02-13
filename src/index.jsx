import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { store } from './store/configureStore.jsx'
import {routerMiddleware, routerReducer, syncHistoryWithStore} from 'react-router-redux';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import * as Utils from './utils/utils.js'
import App from './components/App.jsx'


ReactDOM.render(
	<Provider store={store}>
		<Router>
			<Route path="/" component={App}>
			</Route>
		</Router>
	</Provider>
	,
	root
)



