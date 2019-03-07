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
			filter: false,
		}
	}

 	filterCities = async (event) => {
 		if (event) {
 			await this.setState({ filter: event.target.checked });
 		}
	};

	template = () => {
		const {user, currCity, data, focus, remove, edit, add, autocomplete} = this.props;
		const cities = this.props.data.filter( (row) => {
			if (!this.state.filter || row.region === this.props.user.region) return true;
		});

		return (
			<aside className="cities">
				<div className="table-wrapp">
					<div className="tables">
						<Table user={user} notRender={['id', 'type']} focus={focus} select={currCity} data={cities}/>
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
								<span>Регион: <span title="Домашний регион запоминается при регистрации" className="region">{user.region}</span>  </span> <input onChange={this.filterCities} type="checkbox"/>
								<div className="input-checkbox"/>
							</label>
							{user.role === 'admin' ? <NewCity autocomplete={autocomplete} add={add} data={data}/> : ''}
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