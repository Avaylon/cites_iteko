import React from 'react'
import Col from './Col.jsx'
import Row from './Row.jsx'
import Table from './Table.jsx'
import { Router, Route, browserHistory } from 'react-router'



export class Cities extends React.Component {
	constructor(props) {
		super(props);
		this.props.getCities();

	}

	componentWillReceiveProps = (props) =>  {

		if (this.props.user.region != props.user.region) {
			this.props.getCities();
		}

	}

	filterCities = (event) => {

		this.setState({filter: event.target.checked});
	}

	regionClass() {
		return this.props.user.region ? 'region-check' : 'region-check none'
	}


	template = () => (
		<div className="table-main">
			<Table user={this.props.user} getID={this.props.getID} getCities={this.props.getCities} rows={this.props.rows} />
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