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

	template = () => {
		const {add, remove, edit, user, attrs, currCity, region} = this.props;
		const {headers} = this.state;

		return (
			this.props.currCity.id ?
				<section className="current-city-main">
					<div className="current-city">
						<div className="title"> { currCity.city }  </div>
						<div> Регион: { currCity.region } </div>
					</div>
					<Attrs add={add} remove={remove} edit={edit} headers={headers} user={user} data={attrs} currCity={currCity} focus={ () => {} } />
				</section>
			:
				<section className="current-city-main">
					<div className="current-city">
						<div className="title-min"> Необходимо выбрать город </div>

					</div>
				</section>
	)};

	render() {



		return (
			<Route component={this.template} path="/">
			</Route>
		)
	}
}

