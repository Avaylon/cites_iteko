import React from 'react'
import Table from '../Table/Table.jsx'
import { Route } from 'react-router'
import { EditAttrs } from './EditAttrs.jsx'

export class Attrs extends React.Component {
	
	
	constructor(props) {
		super(props);

		this.state = {
			attrs: this.tablePart(this.props.data).required,
			optionalAttrs: this.tablePart(this.props.data).optional,
			headers: [...this.props.headers],
		};
	}

	tablePart = data => {
		const attrs = [ {...data} ];
		const optionalAttrs =  { ...attrs[0].optional } ;

		delete attrs[0].optional;

		return { required: attrs, optional: { values: [ optionalAttrs ], headers: Object.keys(optionalAttrs) } }
	};


	componentWillReceiveProps = (props) => {
		this.setState({ attrs: this.tablePart(props.data).required, optionalAttrs: this.tablePart(props.data).optional  });
	};

	template = () => (
		<div className="attrs">
			<div className="required">
				{/*<Table headerTitles={this.state.headers} user={this.props.user} focus={this.props.focus} currCity={this.props.currCity} data={this.state.attrs} />*/}
			</div>
			<div className="optional">
				<Table headerTitles={this.state.optionalAttrs.headers} user={this.props.user} focus={this.props.focus} select={this.props.currCity} data={this.state.optionalAttrs.values} />
				{ this.props.user.role === 'admin' ?  <EditAttrs currCity={this.props.currCity} headers={this.state.optionalAttrs.headers} remove={this.props.remove} edit={this.props.edit} focus={() => {}} data={ this.state.optionalAttrs.values[0] } /> : ''  }
			</div>
		</div>
	);

	render() {


		return (
			<Route path="/" component={this.template}/>
		)
	}
}

