import React from 'react'
import InlineSVG from 'svg-inline-react';
import { hash3 } from '../../utils/utils.js'


export class EditCity extends React.Component {

	constructor (props) {
		super(props);

		this.state = {
			currEvent: false,
			currControl: false,
			lastID: false,
			data: [...props.data],
			field_city: false,
			field_region: false,
			

		}
	}

	focusClass = (index) => {

		return index === this.props.focus ? 'focus' : ''
	};

	componentWillReceiveProps = (props) => {

		this.setState({data: props.data})

	};

	modify = (event) => {

		const id = event.currentTarget.getAttribute('data-id')*1;

		if (this.state.lastID === id ) return false;

		this.setState({currControl: id, lastID: id})

	};

	beforeModify = (event) => {
		this.setState({currEvent: event.currentTarget.getAttribute('data-event')})
	};

	close = () => {

		this.setState({currControl: false, lastID: false, field_city: false, field_region: false})

	};

	edit = async (event) => {

		if (this.state.currEvent === 'edit') {
			await this.props.edit(event, {id: this.state.lastID, city: this.state.field_city, region: this.state.field_region })
		}
		if (this.state.currEvent === 'delete') {
			await this.props.remove(event, {id: this.state.lastID })
		}

		this.close()

	};

	fieldCity  = (event) => {

		this.state.field_city = event.target.value
	};
	fieldRegion  = (event) => {

		this.state.field_region = event.target.value

	};

	controlClass(index) {

		let name = 'control';

		if (index === this.state.currControl) {
			name += this.state.currEvent === 'edit' ? ' on' : this.state.currEvent === 'delete' ? ' on delete' : ''
		}

		return name

	}
	render () {

		return (
			<div className="controls">
				{ this.state.data.map((currValue, index) =>
					<div key={hash3(index)} data-id={currValue.id} onClick={this.modify} className={this.controlClass(currValue.id)}>
						<input className="city-field"  onChange={this.fieldCity} defaultValue={currValue.city} />
						<input className="region-field"  onChange={this.fieldRegion} defaultValue={currValue.region} />

						<div className="icons active">
							<div onClick={this.beforeModify} data-event="edit" className={`icon edit ${this.focusClass(currValue.id)}`}>
								<InlineSVG src={require('../../includes/edit.svg-js')} />
							</div>
							<div onClick={this.beforeModify} data-event="delete"  className={`icon delete ${this.focusClass(currValue.id)}`}>
								<InlineSVG src={require('../../includes/line.svg-js')} />
							</div>
						</div>

						<div className="icons inactive">
							<div onClick={this.edit} className={`icon checked focus`}>
								<InlineSVG src={require('../../includes/checked.svg-js')} />
							</div>
							<div onClick={this.close}className="icon close focus">
								<InlineSVG src={require('../../includes/cross.svg-js')} />
							</div>
						</div>

					</div> 
				)}
			</div>
		)
	}
}