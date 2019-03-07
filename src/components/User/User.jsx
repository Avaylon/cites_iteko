import React from 'react'
import { Route, browserHistory, Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { Autocomplete } from "../Autocomplete/Autocomplete.jsx";



export class User extends React.Component {

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

	};

	reStatus = () => {
		return this.setState( {needAuth: !this.state.needAuth } );
	};

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
		event.preventDefault();
		return !this.state.needAuth ? this.props.send_registr(this.state.data) : this.props.send_auth(this.state.data)
	};


	template = () => {
		const {user, autocomplete} = this.props;

		return !user.name ?
			<div className="user-wrapp">
			<Link to="/"><div className="user-bg"/> </Link>
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
					<div className="autocomplete-wrapp">
						<input autoComplete="off" onChange={this.updateForm} name="region" />
						<Autocomplete data={autocomplete} valueChange={this.forceUpdateFieldRegion} value={this.regionField} />
					</div>
				</div>
				<button className="but">{this.state.butText[!this.state.needAuth*1]}</button>
			</form>
			</div>
		: <Redirect to="/" />
	};

	render() {
		return (

			<Route component={this.template} path="/auth">
			</Route>
		)
	}
}


