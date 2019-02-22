import React from 'react'
import Table from '../Table/Table.jsx'
import { Route } from 'react-router'


export class Attrs extends React.Component {
	constructor(props) {
		super(props);

		if (this.props.currCity.id) {
			this.props.init();
			
		}

		this.state = {
			attrs: Attrs.tablePart(this.props.data).required,
			optionalAttrs: Attrs.tablePart(this.props.data).optional,
			headers: [
				'Население',
				'Температура',
				'Координаты',
				'ВВП',
				'Обзор',
			],

		}

	}

	static tablePart (data) {
		const attrs = [ {...data} ];
		const optionalAttrs = { ...attrs[0].optional } ;

		delete attrs[0].optional;

		return {required: attrs, optional: optionalAttrs }
	}


	componentWillReceiveProps = (props) => {

		this.setState({ attrs: Attrs.tablePart(props.data).required, optionalAttrs: Attrs.tablePart(props.data).optional  });
		if (props.currCity.id && (this.props.currCity.id !== props.currCity.id)  ) {
			this.props.init();
		}

	};

	template = () => (
		<div className="attrs">
			<Table headerTitles={this.state.headers} user={this.props.user} focus={this.props.focus} currCity={this.props.currCity} data={this.state.attrs} />

		</div>
	);

	render() {
		return (
			<Route path="/" component={this.template}/>
		)
	}
}
