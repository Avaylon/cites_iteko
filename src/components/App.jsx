import * as Utils from '../utils/utils.js'
import React from 'react'
import { connect } from 'react-redux'
import { User } from './User/User.jsx'
import { Cities } from './Cities/Cities.jsx'
import { Detail } from './Detail/Detail.jsx'
import { UserAuth } from './User-auth/User-auth.jsx'
import { store } from '../store/configureStore.jsx'
import { Router, Route, browserHistory } from 'react-router'



class App extends React.Component {

	render() {
		return (
			<main>
				<Cities user={this.props.user} rows={this.props.cities} getID={this.props.getCityID} getCities={this.props.getCities} />
				<Detail detail={this.props.detail} getDetail={this.props.getDetail} id={this.props.cities.currCity} />
				<User send_auth={this.props.auth} send_registr={this.props.registr} user={this.props.user} />
				<UserAuth logout={this.props.logout} user={this.props.user} />
			</main>
		)
	}
}



export default connect( 
	store => (
		{ user: store.user, cities: store.cities, detail: store.detail } 
	),
	dispatch => ({
		logout: event => {
			localStorage.removeItem('user_name');
			localStorage.removeItem('user_id');
			localStorage.removeItem('user_region');

			dispatch( {type: 'CLEAR_USER', payload: '' } );
		},
		getCities: event => {

			Utils.api('/city', {method: 'GET'} ).then( res => {
				if (res.status != 200) return false;
				return res.json();

			}).then( res => {


				dispatch( {type: 'GET_CITY_LIST', payload: res });

			});
		},
		getDetail: event => {
			let id = store.getState().cities.currCity;
			Utils.api(`/city/${id }`, {method: 'GET'} ).then( res => {
				if (res.status != 200) return false;
				return res.json();

			}).then( res => {

				dispatch( {type: 'GET_CITY_DETAIL', payload: res });


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
				if (res.status < 200 || res.status > 299  ) return false;
				return res.json();

			}).then( res => {

				localStorage.setItem('user_name', data.login);
				localStorage.setItem('user_region', res.region);
				localStorage.setItem('user_id', res.id);

				const userData = {name: data.login, region: res.region, id: res.id }
				dispatch( {type: 'SET_USER', payload: userData });
			});
		},
		registr: (event, data) => {
			event.preventDefault();

			if (!data.login || !data.password || !data.region ) return false;

			Utils.api('/registr', {method: 'POST', body: JSON.stringify(data) }).then( res => {				
				if (res.status < 200 || res.status > 299  ) return false;



				return res.json();
			}).then( res => {

				localStorage.setItem('user_name', data.login);
				localStorage.setItem('user_region', data.region);
				localStorage.setItem('user_id', res.id);

				const userData = {name: data.login, region: data.region, id: res.id }
				dispatch( {type: 'SET_USER', payload: userData });
			});

		} 
	})
)(App)

