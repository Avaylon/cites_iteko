import React from 'react'
import Row from './Row.jsx'
import * as Utils from '../../utils/utils.js'

class Table extends React.Component {



	headerTitles() {
		const headerTitles = [
			'id',
			'Город',
			'Координаты',
			'Страна',
			'Описание',
		]

		if (this.props.user.region) {
			headerTitles.push( 'Домашний регион' )
		}

		return headerTitles
	}


	render() {	

		return !!this.props.rows.cities ?
				<div className="table">
					<Row key={Utils.hash3(0)} title={true} val={this.headerTitles()} /> 
					{this.props.rows.cities.map((currValue, index) => <Row key={Utils.hash3(index)} title={false} getID={this.props.getID} val={currValue} /> )}
				</div>
				: <div></div>


	}
}


export default Table;