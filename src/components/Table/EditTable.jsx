import React from 'react'
import InlineSVG from 'svg-inline-react';
import { hash3 } from '../../utils/utils.js'


export class EditTable extends React.Component {

	constructor (props) {
		super(props);

		this.state = {
			currEvent: false,
			currControl: false,
			lastID: false,
			data: [...props.data],
			field_name: false,
			field_value: false,
			

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
		this.setState({currControl: false, lastID: false, field_name: false, field_value: false})

	};

	edit = async (event) => {
		if (this.state.currEvent === 'edit') {
			await this.props.edit(event, {id: this.state.lastID, name: this.state.field_name, value: this.state.field_value })
		}
		if (this.state.currEvent === 'delete') {
			await this.props.remove(event, {id: this.state.lastID })
		}

		this.close()

	};

	fieldName  = (event) => {
		this.state.field_name = event.target.value
	};
	fieldValue  = (event) => {
		this.state.field_value = event.target.value

	};

	controlClass(index) {
		let name = 'control';

		if (index === this.state.currControl) {
			name += this.state.currEvent === 'edit' ? ' on' : this.state.currEvent === 'delete' ? ' on delete' : ''
		}

		return name

	}
	render () {


		const {data} = this.state;

		return (
			<div className="controls">
				{ data.map((currValue, index) =>
					<div key={hash3(index)} data-id={currValue.id} onClick={this.modify} className={this.controlClass(currValue.id)}>
						<input className="name-field"  onChange={this.fieldName} defaultValue={currValue.name} />
						<input className="value-field"  onChange={this.fieldValue} defaultValue={currValue.value} />

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