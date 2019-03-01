import React from 'react'
import Table from '../Table/Table.jsx'
import { Route } from 'react-router'
import { EditTable } from '../Table/EditTable.jsx'

export class Attrs extends React.Component {
	
	
	constructor(props) {
		super(props);

		this.state = {
			attrs: [...props.data]
		};
	}

	// tablePart = data => {
	// 	const attrs = [ {...data} ];
	// 	const optionalAttrs =  { ...attrs[0].optional } ;
	//
	// 	delete attrs[0].optional;
	//
	// 	return { required: attrs, optional: { values: [ optionalAttrs ], headers: Object.keys(optionalAttrs) } }
	// };


	componentWillReceiveProps = (props) => {

		this.setState({ attrs: [...props.data]  });
	};

	template = () => {

		const {user, focus, currCity, edit, remove} = this.props;
		const {attrs} = this.state;

		return (
			<div className="attrs">
				<div className="required">
					{/*<Table headerTitles={this.state.headers} user={user} focus={focus} currCity={currCity} data={attrs} />*/}
				</div>
				<div className="optional">
					<Table user={user} focus={focus} select={currCity} data={attrs} />
					{user.role === 'admin' ? <EditTable user={user} currCity={currCity} remove={remove} edit={edit} focus={() => {}} data={attrs}/> : ''}
				</div>
			</div>
		)};

	render() {


		return (
			<Route path="/" component={this.template}/>
		)
	}
}

