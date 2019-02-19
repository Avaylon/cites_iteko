import React from 'react'
import Table from '../Table/Table.jsx'
import { Route } from 'react-router'
import { NewCity } from './NewCity.jsx'
import InlineSVG from 'svg-inline-react';

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
			],
			// i don't know what i do
			customCol: [
				{
					position: 2,
					event: { type: 'click', callback: this.props.edit },
					elem: <div className="edit">edit</div>
				},
				{
					position: 2,
					event: { type: 'click', callback: this.props.remove },
					elem: <div className="edit">remove</div>
				}
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
			<div className="table-wrapp">
				<Table customCol={this.state.customCol} headerTitles={this.state.headers} user={this.props.user} focus={this.props.focus} currCity={this.props.currCity} data={this.state.cities} />
				<NewCity data="this.props.data" /> 
			</div>
			<div className={this.regionClass()}><label> <span>Свой регион</span> <input onChange={this.filterCities} type="checkbox" /> <div className="input-checkbox"></div> </label></div>
		</div>
	)

	render() {



		return (
			<Route path="/" component={this.template}></Route>
		)
	}
}



// численность