import React from 'react'
import { Route, browserHistory } from 'react-router'
import { Attrs } from '../Attrs/Attrs.jsx'

export class Detail extends React.Component {

	template = () => (

		this.props.currCity.id ?
			<div className="current-city-main">
				<div className="current-city">
					<div className="title"> { this.props.currCity.city }  </div>
					<div> Регион: { this.props.currCity.region } </div>
				</div>
				<Attrs user={this.props.user} data={this.props.attrs} currCity={this.props.currCity} focus={ () => {} } init={this.props.getAttrs} />
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

