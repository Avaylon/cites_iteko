import React from 'react'
import Row from './Row.jsx'
import * as Utils from '../../utils/utils.js'

class Table extends React.Component {
	


	render() {

		return (
			<div className="table">
				<div className="tr"><div className="td">id</div><div className="td">Город</div><div className="td">Координаты</div><div className="td">Страна</div><div className="td">Домашний регион</div><div className="td">Описание</div></div>
				{this.props.rows.cities.map((currValue, index) => <Row key={Utils.hash3(index)} getID={this.props.getID} val={currValue} />)}
			</div>
		)
	}
}


export default Table;