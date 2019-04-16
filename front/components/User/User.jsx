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
				login: '',
				password: '',
				region: ''
			}
		}
	}

	updateForm = (event) => {
		const data = {...this.state.data};
		data[event.target.name] = event.target.value

		this.setState( {data: data } )
	};

	reStatus = () => {
		return this.setState( {needAuth: !this.state.needAuth } );
	};

	titleClass = () => {
		return this.state.needAuth ? 'title' : 'title inverse';
	};

	emailClass = () => {
		return this.state.needAuth ? 'field none' : 'field';
	};
	selectTitleClass = (inverse) => {
		let needAuth = this.state.needAuth;

		if (inverse) {
			needAuth = !this.state.needAuth;
		}

		return needAuth ? 'select bold' : 'select';
	};

	forceUpdateFieldRegion = (val) => {

		this.setState({ data: { ...this.state.data, region: val } })
	};

	send = () => {
		return !this.state.needAuth ? this.props.send_registr(this.state.data) : this.props.send_auth(this.state.data)
	};


	template = () => {
		const {user, autocomplete} = this.props;
		const {butText, needAuth, data} = this.state;
		const {send, reStatus, titleClass, updateForm, selectTitleClass, emailClass, forceUpdateFieldRegion} = this;

		return !user.name ?
			<div className="user-wrapp">
			<Link to="/"><div className="user-bg"/></Link>
			<div className="user">
				<div className={titleClass()} onClick={reStatus}>
					<span className={selectTitleClass()}>Авторизация</span>
					<span className={selectTitleClass(true)}>Регистрация</span>
				</div>
				<div className="field">
					<span>Логин</span>
					<input onChange={updateForm} value={data.name} name="login" />
				</div>
				<div className="field">
					<span>Пароль</span>
					<input onChange={updateForm} value={data.password} name="password" />
				</div>
				<div className={emailClass()}>
					<span>Регион</span>
					<form className="autocomplete-wrapp">
						<input autoComplete="off" value={data.region} onChange={updateForm} name="region" />
						<Autocomplete data={autocomplete} valueChange={forceUpdateFieldRegion} value={data.region} />
					</form>
				</div>
				<button onClick={send} className="but">{butText[!needAuth*1]}</button>
			</div>
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


