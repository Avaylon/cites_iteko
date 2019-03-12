import React from 'react'
import { Route, browserHistory } from 'react-router'
import { EditAttrs } from './EditAttrs.jsx'
import { EditCity} from "./EditCity.jsx";
import InlineSVG from 'svg-inline-react';
import Table from "../Table/Table.jsx";

export class Detail extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			mode: false,
			edit: {
				city: {
					send: {},
					data: {},
				}
			},
			attrs: {
				send: {},
				required: [],
				optional: [],
			}
		}
	}

	componentWillReceiveProps = (props) => {
		this.setState( {
			attrs: {
				required: props.attrs.filter( (currValue) => {
					for (let elem of props.allAttrs) {
						if (currValue.name === elem.name && elem.required )  {
							return true
						}}
					}) ,
				optional: props.attrs.filter( (currValue) => {
					for (let elem of props.allAttrs) {
						if (currValue.name === elem.name && !elem.required ) {
							return true
						}}
					}) ,
			}
		});

		if (props.currCity.id && (this.props.currCity.id !== props.currCity.id)  ) {
			this.props.getAttrs();
			this.reset();
		}
	};

	beforeModify = (event) => {
		this.setState({mode: event.currentTarget.getAttribute('data-event')})
	};

	modeOff = () => {
		this.setState({mode: false})
	};

	reset = (destroy) => {
		this.setState({mode: false, form: { city: {}, attrs: [] } });
		if (destroy) { this.props.resetCity(); }

	};

	needSend = (data, type) => {
		if (type === 'city') {
			this.setState({ edit: { ...this.state.edit, send: true, data: data } })
		}
		if (type === 'attrs') {

		}
	};

	modeAction = (event) => {
		if (this.state.mode === 'delete') {
			this.props.removeCity({id: this.props.currCity.id});

			this.reset(true);

		}
		if (this.state.mode === 'edit') {
			if (this.state.edit.send) {
				this.props.editCity( { id: this.props.currCity.id, name: this.state.edit.data.cityName, value: this.state.edit.data.cityRegion });
			}

			this.reset();

		}
	};

	modalCustom = (event) => {
		const params = {};

		params.title = this.state.mode === 'edit'? 'Редактирование' : 'Удалить город?';
		params.accept = this.state.mode === 'edit'? 'Применить' : 'Да';
		params.cancel = this.state.mode === 'edit'? 'Отмена' : 'Нет';
		params.className = this.state.mode === 'edit'? 'edit' : 'delete';

		return params
	};



	template = () => {
		const {add, remove, edit, user, currCity, region, allAttrs} = this.props;
		const {mode, attrs, editForm} = this.state;
		const {modalCustom, modeAction, modeOff, beforeModify, needSend} = this;

		return (
			<section className="current-city-main">


				{ mode ?
					<div className={`modal-detail ${modalCustom().className}`}>
						<div className="title">{modalCustom().title}</div>
						<div className="options">
							<div onClick={modeAction} className="option yes">{modalCustom().accept}</div>
							<div onClick={modeOff} className="option no">{modalCustom().cancel}</div>
						</div>
					</div>
					: false
				}

				{ currCity.id && user.role === 'admin' ?
					<div className="icons active">
						<div onClick={beforeModify} data-event="edit" className={`icon edit`}>
							<InlineSVG src={require('../../includes/edit.svg-js')}/>
						</div>
						<div onClick={beforeModify} data-event="delete" className={`icon delete`}>
							<InlineSVG src={require('../../includes/cross.svg-js')}/>
						</div>
					</div>
					: false
				}

				{ currCity.id && mode !== 'edit' ?
						<div className="detail-wrapp">
							<div className="current-city">
								<div className="title"> { currCity.city }  </div>
								<div> Регион: { currCity.region } </div>
							</div>
							<div className="attrs">
								<div className="optional">
									<div className="title">Основные параметры: </div>
									<Table user={user} select={currCity} data={attrs.required} />
								</div>
								{ attrs.optional.length > 0 ?
									<div className="optional">
										<div className="title">Дополнительно:</div>
										<Table user={user} select={currCity} data={attrs.optional}/>
									</div>
										:
									false
								}
							</div>
						</div>
					: mode === 'edit' ?
						<div className="detail-wrapp edit">
							<EditCity send={needSend} cityName={ currCity.city  } cityRegion={ currCity.region } />
							<EditAttrs send={needSend} required={ attrs.required } optional={ attrs.optional } attrsList={allAttrs} />
						</div>
					:
						<div className="detail-wrapp">
							<div className="current-city">
								<div className="title-min"> Необходимо выбрать город </div>
							</div>
						</div>
				}
			</section>
	)};

	render() {

		return (
			<Route component={this.template} path="/">
			</Route>
		)
	}
}

