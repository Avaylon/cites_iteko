import React from 'react'
import Table from '../Table/Table.jsx'
import { Route } from 'react-router'



export class Cities extends React.Component {
	constructor(props) {
		super(props);


		this.props.init();

		this.state = {
			cities: !!this.props.data.length ? [ ...this.props.data ] : null,
			filter: false,
			headers: [
				'id',
				'Город'
			]
		}

	}

	componentWillReceiveProps = (props) => {


		this.setState({ cities: [ ...props.data.filter( (row) => {


 				if (!this.state.filter) return true;
 				if (row.region == this.props.user.region ) return true;

			}) ] 
		});

		if (this.props.user.region != props.user.region) {
			this.props.init();
		}

	}

 	filterCities = async (event) => {

 		if (event) {
 			let checkbox = event.target.checked
 			await this.setState({ filter: checkbox }); 
 		}

		this.setState({ cities: this.props.data.filter( (row) => {

 				if (!this.state.filter) return true;
 				if (row.region == this.props.user.region ) return true;

			})
		});

	}


	regionClass() {
		return this.props.user.region ? 'region-check' : 'region-check none'
	}


	template = () => (
		<div className="cities">
			<Table headerTitles={this.state.headers} user={this.props.user} focus={this.props.focus} currCity={this.props.currCity} data={this.state.cities} />
			<div className={this.regionClass()}><label> <span>Свой регион</span> <input onChange={this.filterCities} type="checkbox" />  </label></div>
		</div>
	)

	render() {



		return (
			<Route exact path="/" component={this.template}></Route>
		)
	}
}



// численность