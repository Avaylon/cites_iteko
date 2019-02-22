import React from 'react'
import Row from './Row.jsx'
import {hash3, ObjToArr} from '../../utils/utils.js'

class Table extends React.Component {

	constructor (props) {
		super(props);
	}

	render() {	

		return !!this.props.data ?
				<div className="table" >
					<Row key={hash3(0)} title={true} val={this.props.headerTitles} />
					{this.props.data.map((currValue, index) => <Row customCol={this.props.customCol} currCity={this.props.currCity} key={hash3(index)} title={false} focus={this.props.focus} val={ ObjToArr(currValue)} /> )}
				</div>
				: <div className="loading-table"> </div>


	}
}


export default Table;