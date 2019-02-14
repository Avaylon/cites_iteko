import * as Utils from '../utils/utils.js'
import React from 'react'
import { Router, Route, browserHistory } from 'react-router'
import { store } from '../store/configureStore.jsx'
import { connect } from 'react-redux'
import { User } from './User/User.jsx'
import { Cities } from './Cities/Cities.jsx'
import { Detail } from './Detail/Detail.jsx'
import { UserAuth } from './User-auth/User-auth.jsx'



class App extends React.Component {

	constructor(props) {
		super(props);


		if ( !!localStorage.getItem('user_token')  ) {
			this.props.auth_token()
		}

	}


	render() {

		return (
			<main>
				<Cities user={this.props.user} cities={this.props.cities} currCity={this.props.currCity} getID={this.props.getCityID} getCities={this.props.getCities} />
				<Detail detail={this.props.detail} getDetail={this.props.getDetail} id={this.props.currCity} />
				<User send_auth={this.props.auth} send_registr={this.props.registr} user={this.props.user} />
				<UserAuth logout={this.props.logout} user={this.props.user} />
			</main>
		)
	}
}



export default connect( 
	store => (
		{ currCity: store.currCity, user: store.user, cities: store.cities, detail: store.detail } 
	),
	dispatch => ({
		logout: event => {

			localStorage.removeItem('user_token');

			dispatch( {type: 'CLEAR_USER', payload: '' } );
		},
		getCities: event => {

			Utils.api('/city', {method: 'GET'} ).then( async res => {
				if (res.status < 200 || res.status > 299) return false;
				

				const json = await res.json();



				dispatch( {type: 'GET_CITY_LIST', payload: json });
			});
		},
		getDetail: event => {

			let id = store.getState().currCity.id;

			Utils.api(`/city/${id}`, {method: 'GET'} ).then( async res => {
				if (res.status < 200 || res.status > 299) return false;
				

				const json = await res.json();


				dispatch( {type: 'GET_CITY_DETAIL', payload: json });
			});

		},
		getCityID: event => {

			const elem = event.target.parentNode;
			const id = elem.getAttribute('data-id')*1;
			const old_id = store.getState().currCity;

			if ( old_id == id ) return false;


			dispatch( {type: 'GET_CITY_INFO', payload: id });
		},
		auth_token: () => {
			
			let token = localStorage.getItem('user_token')*1;

			Utils.api('add', {headers: {"X-Auth-Token": token} })


			Utils.api('/auth_token', {method: 'POST', body: JSON.stringify({}) }).then( async res => {
				if (res.status < 200 || res.status > 299) return false;

				

				const json = await res.json();
				dispatch( {type: 'SET_USER', payload: json });
			});
			
		},
		auth: (event, data) => {

			event.preventDefault();

			if (!data.login || !data.password) return false;


			Utils.api('/auth', {method: 'POST', body: JSON.stringify({login: data.login, password: data.password }) }).then( async res => {
				if (res.status < 200 || res.status > 299) return false;
				

				const json = await res.json();


				Utils.api('add', {headers: {"X-Auth-Token": json.token } })
				localStorage.setItem('user_token', json.token);


				const userData = {name: data.login, region: json.region, id: json.id, token: json.token }
				dispatch( {type: 'SET_USER', payload: userData });
			});
		},
		registr: (event, data) => {
			
			event.preventDefault();

			if (!data.login || !data.password || !data.region ) return false;

			Utils.api('/registr', {method: 'POST', body: JSON.stringify(data) }).then( async res => {				
				if (res.status < 200 || res.status > 299) return false;
				

				const json = await res.json();

				Utils.api('add', {headers: {"X-Auth-Token": json.token} })
				localStorage.setItem('user_token', json.token);

				const userData = {name: data.login, region: data.region, id: json.id, token: json.token }
				dispatch( {type: 'SET_USER', payload: userData });
			});

		} 
	})
)(App)

