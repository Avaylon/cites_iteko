import React from 'react'
import Col from './Col.jsx'
import { store } from '../../store/configureStore.jsx'
import * as Utils from '../../utils/utils.js'

class Row extends React.Component {

	customClass() {
		let className = 'tr'

		if (this.props.val[0] == store.getState().cities.currCity) {
			className = "tr select"
		}
		
		return className
	}

	render () {

		return this.props.title ?
			<div className="tr">
				{this.props.val.map((currValue, index) => <Col key={Utils.hash3(index)} val={currValue} />)}
			</div>
			:
			<div onClick={this.props.getID} data-id={this.props.val[0] } className={this.customClass()}>
				{this.props.val.map((currValue, index) => <Col key={Utils.hash3(index)} val={currValue} />)}
			</div>

	}
}


export default Row;