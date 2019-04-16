import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {store} from './store/configureStore.jsx'
import {BrowserRouter as Router, Route} from 'react-router-dom'
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
);



