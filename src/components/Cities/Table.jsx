import React from 'react'
import Row from './Row.jsx'
import * as Utils from '../../utils/utils.js'

class Table extends React.Component {


	constructor (props) {
		super(props);

		this.state = {
			data: this.props.rows.cities,
			filter: false
		}
	}

	componentWillReceiveProps = (props) =>  {

		this.setState({data: props.rows.cities})

	}

	headerTitles() {

		const headerTitles = [
			'id',
			'Город',
			'Координаты',
			'Страна',
			'Описание',
		]

		return headerTitles
	}




	render() {	
		return !!this.state.data ?
				<div className="table">
					<Row key={Utils.hash3(0)} title={true} val={this.headerTitles()} /> 
					{this.state.data.map((currValue, index) => <Row rows={this.props.rows} key={Utils.hash3(index)} title={false} getID={this.props.getID} val={currValue} /> )}
				</div>
				: <div> Загрузка... </div>


	}
}


export default Table;