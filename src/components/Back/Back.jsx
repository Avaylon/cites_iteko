import React from 'react'
import PropTypes from 'prop-types'
import { Router, Route, Link } from 'react-router-dom'


export class Back extends React.Component {

	customClass() {
		return location.pathname != '/' ? "back" : "back none";
	}

	template = () => (
		<Link to='/'>
			<div className={this.customClass()}>На главную</div>
		</Link>

	)

	render() {
		return (
			<Route component={this.template} path="/">
			</Route>
		)
	}
}