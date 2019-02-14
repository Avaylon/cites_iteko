import React from 'react'
import Table from '../Table/Table.jsx'
import { Route } from 'react-router'



export class Cities extends React.Component {
	constructor(props) {
		super(props);
		this.props.getCities();

		this.state = {
			cities: !!this.props.cities.length ? [ ...this.props.cities ] : null
		}

	}

	componentWillReceiveProps = (props) => {

		this.setState({ cities: [ ...props.cities ] });

		if (this.props.user.region != props.user.region) {
			this.props.getCities();
		}

	}

 	filterCities = (event) => {
 		let checkbox = event.target.checked
 		let citiesFiltred = this.props.cities.filter( (row) => {

 				if (!checkbox) return true


 				if (row[3] == this.props.user.region ) return true

			})


		this.setState({ cities: citiesFiltred });
		return true 


	}


	regionClass() {
		return this.props.user.region ? 'region-check' : 'region-check none'
	}


	template = () => (
		<div className="table-main">
			<Table user={this.props.user} getID={this.props.getID} getCities={this.props.getCities} currCity={this.props.currCity} cities={this.state.cities} />
			<div className={this.regionClass()}><label> Домашний регион <input onChange={this.filterCities} type="checkbox" />  </label></div>
		</div>
	)

	render() {


		return (
			<Route exact path="/" component={this.template}></Route>
		)
	}
}



// численность