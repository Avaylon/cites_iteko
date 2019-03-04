import React from 'react'
import InlineSVG from 'svg-inline-react';


export class NewCity extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			showFields: false,
			cityName: '',
			cityRegion: ''
		}
	}

	crossClass = () => {
		return this.state.showFields ? 'add-cross' : 'add-cross rotate'
	};

	fieldsClass = () => {
		return this.state.showFields ? 'add-fields' : 'add-fields none'
	};

	close = () => {
		const show = !this.state.showFields;

		this.setState({showFields: show})
	};

	add = async (event) => {
		const data = { name: this.state.cityName, region: this.state.cityRegion };
		if (!data.name || !data.region) return false;

		await this.props.add(event, data );

		this.close();

	};

	updateFieldName = (event) => {
		this.setState({ cityName: event.target.value })
	};


	updateFieldRegion = (event) => {
		this.setState({ cityRegion: event.target.value })
	};


	render() {
		return (
			<div className="add-city">
				<div className={this.crossClass()} onClick={this.close}>
					<InlineSVG src={require('../../includes/cross.svg-js')} />
				</div>
				<div className={this.fieldsClass()}>
					<label className="field">
						<span>Город</span>
						<input value={this.state.cityName} onChange={this.updateFieldName} name="city" />
					</label>
					<label className="field">
						<span>Регион</span>
						<input value={this.state.cityRegion} onChange={this.updateFieldRegion} name="region" />
					</label>
					<button onClick={this.add} className="but">Добавить</button>
				</div>

			</div>
		)
	}
}