import React from 'react'
import Col from './Col.jsx'
import { hash3 } from '../../utils/utils.js'

class Row extends React.Component {

	selectClass() {
		return this.props.attr === this.props.select.id ? 'tr select' : 'tr'
	}


	render () {
		const {val, title, attr, focus} = this.props;

		return (
			title ?
				<div className="th">
					{val.map((currValue, index) => <Col key={hash3(index)} index={index} val={currValue}  />)}
				</div>
			:
				<div onClick={focus} data-id={ attr} className={this.selectClass()}>
					{val.map((currValue, index) => <Col key={hash3(index)} index={index} val={currValue} />)}
				</div>
		)

	}
}


export default Row;



{/*<div onClick={this.props.focus} data-id={this.props.val[0] } className={this.customClass()}>*/}
