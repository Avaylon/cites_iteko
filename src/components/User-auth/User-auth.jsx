import React from 'react'
import { Route, Link } from 'react-router-dom'


export class UserAuth extends React.Component {

	customLink = () => {

		return location.pathname === '/' ? {link: '/auth', text: 'Вход / Регистрация'} : {link: '/', text: 'Назад'}
	};

	customClass = () => {
		return location.pathname === '/' ? 'user-auth-link' : 'user-auth-link none'
	};

	template = () => (
			<header className="header">
				<div className="city-card">Карточка города</div>
				{
					this.props.user.id ?
						<div className="user-logged" >
							<div className="name"><span>{this.props.user.name}</span></div>
							<div className="exit"><span onClick={this.props.logout}>Выйти</span></div>
						</div>
					:
						<Link className={this.customClass()} to={this.customLink().link}>
							<div className="user-auth">{this.customLink().text}</div>
						</Link>
				}
			</header>

	);

	render() {
		return (
			<Route component={this.template} path="/">
			</Route>
		)
	}
}