import React from 'react'
import PropTypes from 'prop-types'
import { Router, Route, browserHistory, Redirect } from 'react-router'
import { store } from '../../store/configureStore.jsx'

import { connect } from 'react-redux'
import * as Utils from '../../utils/utils.js'


class User extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			needAuth: true, 
			butText: ['Войти', 'Создать'],
			data: {
				login: null,
				password: null,
				region: null
			}
		}
	}

	updateForm = () => {
		this.state.data[event.target.name] = event.target.value;
		return false;

	}

	reStatus = () => {
		return this.setState( {needAuth: !this.state.needAuth }  );
	}

	titleClass () {
		return this.state.needAuth ? 'title' : 'title inverse';
	}

	emailClass () {
		return this.state.needAuth ? 'field none' : 'field';
	}
	selectTitleClass (inverse) {
		let needAuth = this.state.needAuth;

		if (inverse) {
			needAuth = !this.state.needAuth;
		}

		return needAuth ? 'select bold' : 'select';
	}

	send = (event) => {

		return !this.state.needAuth ? this.props.send_registr(event, this.state.data) : this.props.send_auth(event, this.state.data)
	}


	template = () => {

		return !this.props.user.name ?
			<form className="user" onSubmit={this.send} >
				<div className={this.titleClass()} onClick={this.reStatus}> <span className={this.selectTitleClass()}>Авторизация</span><span className={this.selectTitleClass(true)}>Регистрация</span>  </div>
				<div className="field">
					<span>Логин</span>
					<input onChange={this.updateForm} name="login" />
				</div>
				<div className="field">
					<span>Пароль</span>
					<input onChange={this.updateForm}  name="password" />
				</div>
				<div className={this.emailClass()}>
					<span>Регион</span>
					<input onChange={this.updateForm} name="region" />
				</div>
				<button className="but">{this.state.butText[!this.state.needAuth*1]}</button>
			</form>
		: <Redirect to="/" />
	}

	render() {


		return (

			<Route component={this.template} path="/auth">
			</Route>
		)
	}
}

User.propTypes = {
  // name: PropTypes.string.isRequired,
}



export default User
// export default connect( 
// 	store => { return {user: store.user } },
// 	dispatch => { return ({ 
// 		auth: event => {

// 			Utils.api('/auth', {method: 'POST'}).then( res => {

// 				if ( res.status < 200 || res.status > 200 ) return false

// 			} )
// 		},
// 		registr: event => {

// 			Utils.api('/registr', {method: 'POST'}).then( res => { 

// 				if ( res.status < 200 || res.status > 200 ) return false

// 			} )

// 		} 
// 	})
// })(User)
