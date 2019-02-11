import React from 'react'
import PropTypes from 'prop-types'
import { Router, Route, browserHistory } from 'react-router'


export class Detail extends React.Component {

	template = () => (
		<div className="current-city">
			Выбранный город: { this.props.id } 
		</div>
	)

	render() {


		return (
			<Route component={this.template} exact path="/">
			</Route>
		)
	}
}

