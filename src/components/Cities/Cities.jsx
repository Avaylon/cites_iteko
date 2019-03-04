import React from 'react'
import Table from '../Table/Table.jsx'
import { Route } from 'react-router'
import { NewCity } from './NewCity.jsx'
import { EditTable } from '../Table/EditTable.jsx'
import { renameKeys } from '../../utils/utils.js'

export class Cities extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			cities: [ ],
			filter: false,
		}

	}

	componentWillReceiveProps = (props) => {

		this.setState({ cities: props.data.filter( (row) => {

 				if (!this.state.filter) return true;
 				if (row.region === this.props.user.region ) return true;

			})
		});

	};

 	filterCities = async (event) => {

 		if (event) {
 			await this.setState({ filter: event.target.checked }); 
 		}

		this.setState({ cities: this.props.data.filter( (row) => {

 				if (!this.state.filter) return true;
 				if (row.region === this.props.user.region ) return true;

			})
		});

	};

	template = () => {

		const { cities } = this.state;
		const {user, currCity, data, focus, remove, edit, add} = this.props;

		return (
			<aside className="cities">
				<div className="table-wrapp">
					<div className="tables">
						<Table user={user} focus={focus} select={currCity} data={cities}/>
						{/*{*/}
							{/*user.role === 'admin' ?*/}
								{/*<EditTable remove={remove} edit={edit} focus={currCity.id} data={cities.map( (currValue) => ( renameKeys(currValue, {city: 'name', region: 'value'} ) ) )}/>*/}
							{/*: false*/}
						{/*}*/}
					</div>

				</div>
				{
					user.region ?
						<div className="region-check">
							<label>
								<span>Свой регион: <span className="region">{user.region}</span>  </span>  <div className="info" title="Домашний регион запоминается при регистрации"></div>  <input
								onChange={this.filterCities} type="checkbox"/>
								<div className="input-checkbox"/>
							</label>
							{user.role === 'admin' ? <NewCity add={add} data={data}/> : ''}
						</div>
					: false
				}
			</aside>
			)};

	render() {

		return (
			<Route path="/" component={this.template}/>
		)
	}
}