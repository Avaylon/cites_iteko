import { api } from '../utils/utils.js'
import React from 'react'
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

		this.props.getCities()

	}


	render = () => {

		const {
			addCity, removeCity, editCity, cities, user, currCity,
			getCity, getAttrs, addAttr, removeAttr, editAttr,
			detail, getDetail, attrs, auth, registr, logout
		} = this.props;

		return (
			<main className="main">
				<Cities add={addCity} remove={removeCity} edit={editCity} user={user} data={cities} currCity={currCity} focus={getCity} />
				<Detail add={addAttr} remove={removeAttr} edit={editAttr} detail={detail} getDetail={getDetail} user={user} attrs={attrs} currCity={currCity} focus={ () => {} } getAttrs={getAttrs} />
				<User send_auth={auth} send_registr={registr} user={user} />
				<UserAuth logout={logout} user={user} />
			</main>
		)
	}
}

export default connect(
	store => (
		{ currCity: store.currCity, user: store.user, cities: store.cities, detail: store.detail, attrs: store.attrs }
	),
	dispatch => ({
		removeCity: (event, data) => {
			api(`/city/${data.id}`, {method: 'DELETE', body: JSON.stringify(data) } ).then( async res => {
				if (res.status < 200 || res.status > 299) return false;
				
				const json = await res.json();

				dispatch( {type: 'DELETE_CITY', payload: json });
			});


		},
		addCity: (event, data) => {
			api("/city/", {method: 'POST', body: JSON.stringify(data) } ).then( async res => {
				if (res.status < 200 || res.status > 299) return false;
				
				const json = await res.json();

				dispatch( {type: 'ADD_CITY', payload: json });
			});

		},
		editCity: (event, data) => {
			api(`/city/${data.id}`, {method: 'PUT', body: JSON.stringify({ id: data.id, city: data.name, region: data.value }) } ).then( async res => {
				if (res.status < 200 || res.status > 299) return false;
				
				const json = await res.json();

				dispatch( {type: 'EDIT_CITY', payload: json });
			});
		},
		removeAttr: (event, data) => {
			api(`/attributes/${data.id}/`, {method: 'DELETE', body: JSON.stringify({ id: data.id, name: data.name, value: data.value }) } ).then( async res => {
				if (res.status < 200 || res.status > 299) return false;

				const json = await res.json();
				dispatch( {type: 'DELETE_ATTRS', payload: json });
			});
		},
		addAttr: (event, data) => {

			console.log( data )
			api("/attributes/", {method: 'POST', body: JSON.stringify(data) } ).then( async res => {
				if (res.status < 200 || res.status > 299) return false;

				const json = await res.json();

				dispatch( {type: 'ADD_ATTRS', payload: json });
			});

		},
		editAttr: (event, data) => {

			api(`/attributes/${data.id}/`, {method: 'PUT', body: JSON.stringify({ id: data.id, name: data.name, value: data.value }) } ).then( async res => {
				if (res.status < 200 || res.status > 299) return false;

				const json = await res.json();

				dispatch( {type: 'EDIT_ATTRS', payload: json });
			});

		},
		logout: (event, data) => {
			localStorage.removeItem('user_token');
			dispatch( {type: 'CLEAR_USER', payload: '' } );
		},
		getAttrs: event => {
			const id = store.getState().currCity.id;

			api(`/city/attributes/${id}`, {method: 'GET'} ).then( async res => {
				if (res.status < 200 || res.status > 299) return false;
				
				const json = await res.json();

				
				dispatch( {type: 'GET_ATTRS_LIST', payload: json });
			});
		},
		getCities: event => {
			api('/city', {method: 'GET'} ).then( async res => {
				if (res.status < 200 || res.status > 299) return false;
				
				const json = await res.json();
				dispatch( {type: 'GET_CITY_LIST', payload: json });
			});
		},
		getDetail: event => {
			const id = store.getState().currCity.id;

			api(`/city/${id}`, {method: 'GET'} ).then( async res => {
				if (res.status < 200 || res.status > 299) return false;
				
				const json = await res.json();
				dispatch( {type: 'GET_CITY_DETAIL', payload: json });
			});

		},

		getRegions: event => {



		},
		getCity: event => {
			const elem = event.currentTarget;
			const id = elem.getAttribute('data-id')*1;
			const old_id = store.getState().currCity.id;

			if ( old_id === id ) return false;




			const currCity = store.getState().cities.filter( (el, i, arr) => {
				return el.id === id
			});

			dispatch( {type: 'GET_CITY_INFO', payload: {...currCity[0], id: id} });
		},
		auth_token: () => {
			const token = localStorage.getItem('user_token')*1;

			api('add', {headers: {"X-Auth-Token": token} });
			api('/auth_token', {method: 'POST', body: JSON.stringify({}) }).then( async res => {
				if (res.status < 200 || res.status > 299) return false;

				const json = await res.json();

				dispatch( {type: 'SET_USER', payload: json });
			});
			
		},
		auth: (event, data) => {
			event.preventDefault();

			if (!data.login || !data.password) return false;

			api('/auth', {method: 'POST', body: JSON.stringify({login: data.login, password: data.password }) }).then( async res => {
				if (res.status < 200 || res.status > 299) return false;
				
				const json = await res.json();

				api('add', {headers: {"X-Auth-Token": json.token } });
				localStorage.setItem('user_token', json.token);

				const userData = {name: data.login, region: json.region, id: json.id, token: json.token, role: json.role };

				dispatch( {type: 'SET_USER', payload: userData });
			});
		},
		registr: (event, data) => {
			event.preventDefault();

			if (!data.login || !data.password || !data.region ) return false;

			api('/registr', {method: 'POST', body: JSON.stringify(data) }).then( async res => {
				if (res.status < 200 || res.status > 299) return false;

				const json = await res.json();

				api('add', {headers: {"X-Auth-Token": json.token} });
				localStorage.setItem('user_token', json.token);

				const userData = {name: data.login, region: data.region, id: json.id, token: json.token, role: json.role };
				dispatch( {type: 'SET_USER', payload: userData });
			});

		} 
	})
)(App)
