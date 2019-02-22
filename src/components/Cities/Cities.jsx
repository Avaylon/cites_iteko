import React from 'react'
import Table from '../Table/Table.jsx'
import { Route } from 'react-router'
import { NewCity } from './NewCity.jsx'
import { EditCity } from './EditCity.jsx'

export class Cities extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			cities: [ ],
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
 				if (row.region === this.props.user.region ) return true;

			}) ] 
		});

	};

 	filterCities = async (event) => {

 		if (event) {
 			await this.setState({ filter: event.target.checked }); 
 		}

		this.setState({ cities: this.props.data.filter( (row) => {

 				if (!this.state.filter) return true;
 				if (row.region === this.props.user.region ) return true;

			})
		});

	};

	regionClass() {
		return this.props.user.region ? 'region-check' : 'region-check none'
	}

	template = () => (
		<div className="cities">
			<div className="table-wrapp">
				<div className="tables">
					<Table headerTitles={this.state.headers} user={this.props.user} focus={this.props.focus} currCity={this.props.currCity} data={this.state.cities} />
					{ this.props.user.role === 'admin' ? <EditCity remove={this.props.remove} edit={this.props.edit} focus={this.props.currCity.id} data={ this.state.cities} /> : ''  }
				</div>
				{ this.props.user.role === 'admin' ? <NewCity add={this.props.add} data={this.props.data} /> : '' }
			</div>
			<div className={this.regionClass()}><label> <span>Свой регион</span> <input onChange={this.filterCities} type="checkbox" /> <div className="input-checkbox"/> </label></div>
		</div>
	);

	render() {

		return (
			<Route path="/" component={this.template}/>
		)
	}
}