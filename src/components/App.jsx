import { api } from '../utils/utils.js'
import React from 'react'
import actions from '../actions/actions.js'
import { storeAlias } from '../store/configureStore.jsx'
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

		this.props.getCities();
		this.props.getRegions();
		this.props.getAllAttrs();

	}

	render = () => {
		const {
			addCity, removeCity, editCity, cities, user, currCity, getCities,
			getCurrentCity, getAttrs, addAttr, removeAttr, editAttr, allAttrs,
			detail, getDetail, attrs, auth, registr, logout, regions, resetCity
		} = this.props;

		return (
			<main className="main">
				<Cities autocomplete={regions} add={addCity} remove={removeCity} edit={editCity} user={user} data={cities} currCity={currCity} focus={getCurrentCity} />
				<Detail getCities={getCities} getCity={getCurrentCity} allAttrs={allAttrs} addAttr={addAttr} resetCity={resetCity} removeCity={removeCity}
						removeAttr={removeAttr} editCity={editCity} editAttr={editAttr} detail={detail} getDetail={getDetail} user={user}
						attrs={attrs} currCity={currCity} getAttrs={getAttrs} />
				<User autocomplete={regions} send_auth={auth} send_registr={registr} user={user} />
				<UserAuth logout={logout} user={user} />
			</main>
		)
	}
}

export default connect(
	storeAlias,
	actions
)(App)
