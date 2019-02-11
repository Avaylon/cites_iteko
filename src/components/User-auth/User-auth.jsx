import React from 'react'
import PropTypes from 'prop-types'
import { Router, Route, Link } from 'react-router-dom'
import { store } from '../../store/configureStore.jsx'


export class UserAuth extends React.Component {

	customClass() {

		let className = ''

		className = location.pathname != '/auth' ? "user-auth" : "user-auth none";
		className = !store.getState().user.name ? "user-auth" : "user-auth none";

		return className
	}

	template = () => (
			<Link to='/auth'>
				<div className={this.customClass()}>Авторизация</div>
			</Link>

	)

	render() {
		return (
			<Route component={this.template} path="/">
			</Route>
		)
	}
}