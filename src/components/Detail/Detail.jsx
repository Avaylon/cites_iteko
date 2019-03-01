import React from 'react'
import { Route, browserHistory } from 'react-router'
import { Attrs } from '../Attrs/Attrs.jsx'

export class Detail extends React.Component {

	constructor (props) {
		super(props);

		this.state = {
			headers: [
				'Население',
				'Температура',
				'Координаты',
				'ВВП',
				'Обзор',
			],
		}
	}

	componentWillReceiveProps = (props) => {
		if (props.currCity.id && (this.props.currCity.id !== props.currCity.id)  ) {
			this.props.getAttrs();
		}
	};

	template = () => (
		this.props.currCity.id ?
			<div className="current-city-main">
				<div className="current-city">
					<div className="title"> { this.props.currCity.city }  </div>
					<div> Регион: { this.props.currCity.region } </div>
				</div>
				<Attrs headers={this.state.headers} user={this.props.user} data={this.props.attrs} currCity={this.props.currCity} focus={ () => {} } />
			</div>
		:
			<div className="current-city-main">		
				<div className="current-city">
					<div className="title"> Город не выбран </div>
					
				</div>
			</div>
	);

	render() {



		return (
			<Route component={this.template} path="/">
			</Route>
		)
	}
}

