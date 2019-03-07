import React from 'react'
import Table from '../Table/Table.jsx'
import { Route } from 'react-router'
import { EditTable } from '../Table/EditTable.jsx'
import { NewAttrs } from "./NewAttrs.jsx";

export class Attrs extends React.Component {
	
	
	constructor(props) {
		super(props);

		this.state = {
			attrs: [...props.data]
		};
	}


	componentWillReceiveProps = (props) => {
		this.setState({ attrs: [...props.data]  });
	};

	template = () => {
		const {add, user, focus, currCity, edit, remove} = this.props;
		const {attrs} = this.state;

		return (
			<div className="attrs">
				<div className="optional">
					<div className="title">Основные параметры: </div>
					<Table user={user} focus={focus} select={currCity} data={attrs} />
				</div>
				<div className="optional">
					<div className="title">Дополнительно: </div>
					<Table user={user} focus={focus} select={currCity} data={attrs} />

				</div>
			</div>
		)};

	render() {
		return (
			<Route path="/" component={this.template}/>
		)
	}
}


