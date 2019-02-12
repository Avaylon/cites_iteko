import React from 'react'
import { connect } from 'react-redux'
import User from './User/User.jsx'
import { UserAuth } from '../components/User-auth/User-auth.jsx'
import { Cities } from '../components/Cities/Cities.jsx'
import { Detail } from '../components/Detail/Detail.jsx'
import { Back } from '../components/Back/Back.jsx'
import { store } from '../store/configureStore.jsx'
import { Router, Route, browserHistory } from 'react-router'
import * as Utils from '../utils/utils.js'



class App extends React.Component {
	render() {

		return (
			<main>
				<Cities user={this.props.user} rows={this.props.cities} getID={this.props.getCityID} getCities={this.props.getCities} />
				<Detail id={this.props.cities.currCity} />
				<User send_auth={this.props.auth} send_registr={this.props.registr} user={this.props.user} />
				<UserAuth  />
				<Back />
			</main>
		)
	}
}



export default connect( 
	store => { return {
		user: store.user, cities: store.cities } 
	},
	dispatch => { return ({
		getCities: event => {

			Utils.api('/city', {method: 'GET'} ).then( res => {
				if (res.status != 200) return false;
				return res.json();

			}).then( res => {

				let region = store.getState().user.region;

				if (region) {
					for (let i = res.length - 1; i >= 0; i--) {
						res[i][3] == region ? res[i].push('✓') : res[i].push(false);
					}
				}

				dispatch( {type: 'GET_CITY_LIST', payload: res });

			});
		},
		getCityID: event => {

			const elem = event.target.parentNode;
			const id = elem.getAttribute('data-id')*1;
			const old_id = store.getState().cities.currCity;

			if ( old_id == id ) return false;

			dispatch( {type: 'GET_CITY_INFO', payload: id });
		},
		auth: (event, data) => {
			event.preventDefault();

			if (!data.login || !data.password) return false;

			Utils.api('/auth', {method: 'POST', body: JSON.stringify({login: data.login, password: data.password }) }).then( res => {
				if (res.status != 200) return false;
				return res.json();

			}).then( res => {

				localStorage.setItem('user_name', data.login);
				localStorage.setItem('user_region', res.region);

				const userData = {name: data.login, region: res.region }
				dispatch( {type: 'SET_USER', payload: userData });
			});
		},
		registr: (event, data) => {
			event.preventDefault();

			if (!data.login || !data.password || !data.region ) return false;

			Utils.api('/registr', {method: 'POST', body: JSON.stringify(data) }).then( res => {				
				if (res.status != 200) return false;

				return res.text();
			}).then( res => {

				localStorage.setItem('user_name', data.login);
				localStorage.setItem('user_region', data.region);

				const userData = {name: data.login, region: data.region }
				dispatch( {type: 'SET_USER', payload: userData });
			});

		} 
	});
})(App)

