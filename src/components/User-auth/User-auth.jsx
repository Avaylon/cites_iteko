import React from 'react'
import PropTypes from 'prop-types'
import { Router, Route, Link } from 'react-router-dom'


export class UserAuth extends React.Component {



	customLink() {

		return location.pathname == '/' ? {link: '/auth', text: 'Войти'} : {link: '/', text: 'Назад'}
	}

	customClass() {
		return location.pathname == '/' ? 'user-auth-link' : 'user-auth-link none'
	}

	template = () => (
			this.props.user.id ? 
			<div className="user-logged" >
				<div className="name"><span>{this.props.user.name}</span></div>
				<div className="region">Регион: <span>{this.props.user.region}</span></div>
				<div className="exit" onClick={this.props.logout}>Выйти</div>
			</div>
			: 
			<Link className={this.customClass()} to={this.customLink().link}>
				<div className="user-auth">{this.customLink().text}</div>
			</Link>
	)

	render() {
		return (
			<Route component={this.template} path="/">
			</Route>
		)
	}
}