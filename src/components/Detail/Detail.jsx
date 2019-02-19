import React from 'react'
import PropTypes from 'prop-types'
import { Router, Route, browserHistory } from 'react-router'


export class Detail extends React.Component {

	componentWillReceiveProps = (props) =>  {


		if (this.props.currCity.id != props.currCity.id) {
			this.props.getDetail()
		}


	}


	template = () => (

		this.props.currCity.id ?
			<div className="current-city-main">		
				<div className="current-city">
					<div className="title"> { this.props.detail.title }  </div>
					<div>Описание: { this.props.detail.description } </div>
				</div>
			</div>
		:
			<div className="current-city-main">		
				<div className="current-city">
					<div className="title"> Город не выбран </div>
					
				</div>
			</div>
	)

	render() {



		return (
			<Route component={this.template} path="/">
			</Route>
		)
	}
}

