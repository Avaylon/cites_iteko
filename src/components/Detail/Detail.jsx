import React from 'react'
import PropTypes from 'prop-types'
import { Router, Route, browserHistory } from 'react-router'


export class Detail extends React.Component {

	componentWillReceiveProps = (props) =>  {


		if (this.props.id != props.id) {
			this.props.getDetail()
		}


	}


	template = () => (

		this.props.id ?
			<div className="current-city-main">		
				<div className="current-city">
					<div className="title"> Карточка города </div>
					<div>Выбранный город: { this.props.detail.title } </div>
					<div>Описание: { this.props.detail.description } </div>
				</div>
			</div>
		:
			<div className="current-city-main">		
				<div className="current-city">
					<div className="title"> Карточка города </div>
					Город не выбран
				</div>
			</div>
	)

	render() {



		return (
			<Route component={this.template} exact path="/">
			</Route>
		)
	}
}

