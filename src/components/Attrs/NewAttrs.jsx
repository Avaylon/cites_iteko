import React from 'react'
import InlineSVG from 'svg-inline-react';
import {Route} from "react-router";


export class NewAttrs extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showFields: false,
            attrName: '',
            attrValue: ''
        }
    }

    crossClass = () => {
        return this.state.showFields ? 'add-cross' : 'add-cross rotate'
    };

    fieldsClass = () => {
        return this.state.showFields ? 'add-fields' : 'add-fields none'
    };

    checkFields = () => {

        const show = !this.state.showFields;

        this.setState({showFields: show})
    };

    add = (event) => {

        const data = { name: this.state.attrName, value: this.state.attrValue };
        if (!data.name || !data.value) return false;

        this.props.add(event, data )
    };

    updateFieldName = (event) => {
        this.setState({ attrName: event.target.value })
    };


    updateFieldRegion = (event) => {
        this.setState({ attrValue: event.target.value })
    };


    render() {
        return (
            <div className="add-attrs">
                <div className={this.crossClass()} onClick={this.checkFields}>
                    <InlineSVG src={require('../../includes/cross.svg-js')} />
                </div>
                <div className={this.fieldsClass()}>
                    <label className="field">
                        <span>Название</span>
                        <input value={this.state.attrName} onChange={this.updateFieldName} />
                    </label>
                    <label className="field">
                        <span>Содержание</span>
                        <input value={this.state.attrValue} onChange={this.updateFieldRegion} />
                    </label>
                    <button onClick={this.add} className="but">Добавить</button>
                </div>

            </div>
        )
    }
}