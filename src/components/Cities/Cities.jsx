import React from 'react'
import Col from './Col.jsx'
import Row from './Row.jsx'
import Table from './Table.jsx'
import { Router, Route, browserHistory } from 'react-router'



export class Cities extends React.Component {
	constructor(props) {
		super(props)
		this.props.getCities()
	}

	componentWillReceiveProps = (props) =>  {

		// NEED FIX!!!
		// this.props.getCities()


	}


	template = () => (
		<div>
			<Table user={this.props.user} getID={this.props.getID} getCities={this.props.getCities} rows={this.props.rows} />
		</div>
	)

	render() {

		return (
			<Route exact path="/" component={this.template}></Route>
		)
	}
}
