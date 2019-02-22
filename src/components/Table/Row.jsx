import React from 'react'
import Col from './Col.jsx'
import { hash3 } from '../../utils/utils.js'

class Row extends React.Component {

	customClass() {
		return this.props.val[0] === this.props.currCity.id ? 'tr select' : 'tr'
	}

	render () {

		return this.props.title ?
			<div className="th">
				{this.props.val.map((currValue, index) => <Col key={hash3(index)} index={index} val={currValue}  />)}
			</div>
			:
			<div onClick={this.props.focus} data-id={this.props.val[0] } className={this.customClass()}>
				{this.props.val.map((currValue, index) => <Col key={hash3(index)} index={index} val={currValue} />)}
			</div>

	}
}


export default Row;