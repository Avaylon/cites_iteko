import React from 'react'
import Col from './Col.jsx'
import Row from './Row.jsx'
import Table from './Table.jsx'
import { Router, Route, browserHistory } from 'react-router'



export class Cities extends React.Component {

	template = () => (
		<div>
			<Table getID={this.props.getID} rows={this.props.rows} />
		</div>
	)

	render() {
		return (
			<Route exact path="/" component={this.template}></Route>
		)
	}
}
