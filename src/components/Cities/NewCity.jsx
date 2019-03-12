import React from 'react'
import InlineSVG from 'svg-inline-react';
import {Autocomplete} from "../Autocomplete/Autocomplete.jsx";


export class NewCity extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			showFields: false,
			cityName: '',
			cityRegion: '',
			regionField: '',
		};
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

	add = async () => {
		const data = { name: this.state.cityName, region: this.state.cityRegion };
		if (!data.name || !data.region) return false;

		await this.props.add(data);

		this.close();

	};

	updateFieldName = (event) => {
		this.setState({ cityName: event.target.value })
	};


	updateFieldRegion = (event) => {
		const val = event.target.value;
		this.setState({ cityRegion: val})
	};

	forceUpdateFieldRegion = (val) => {
		this.setState({ cityRegion: val})
	};


	render() {

		const {cityName, cityRegion} = this.state;
		const {autocomplete} = this.props;
		const {updateFieldName, updateFieldRegion, forceUpdateFieldRegion, close, add, crossClass, fieldsClass } = this;

		return (
			<div className="add-city">
				<div className={crossClass()} onClick={close}>
					<InlineSVG src={require('../../includes/cross.svg-js')} />
				</div>
				<div className={fieldsClass()}>
					<label className="field">
						<span>Город</span>
						<input autoComplete="off" value={cityName} onChange={updateFieldName} name="city" />
					</label>
					<label className="field">
						<span>Регион</span>
						<div className="autocomplete-wrapp">
							<input autoComplete="off" value={cityRegion} onChange={updateFieldRegion} name="region" />
							<Autocomplete data={autocomplete} valueChange={forceUpdateFieldRegion} value={cityRegion} />
						</div>
					</label>
					<button onClick={add} className="but">Добавить</button>
				</div>

			</div>
		)
	}
}