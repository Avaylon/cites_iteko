import React from 'react'
import InlineSVG from 'svg-inline-react';
import { hash3 } from '../../utils/utils.js'
import TextArea from 'react-textarea-autosize'

export class EditAttrs extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            currEvent: false,
            currControl: false,
        }
    }

    focusClass = (index) => {
        return index === this.props.focus ? 'focus' : ''
    };

    modify = (event) => {

        const id = event.currentTarget.getAttribute('data-id')*1;

        if (this.state.lastID === id ) return false;

        this.setState({currControl: id, lastID: id})

    };

    controlClass(index) {

        let name = 'control-field';


        // console.log( index )
        if (index === this.state.currControl) {
            name += this.state.currEvent === 'edit' ? ' edit' : this.state.currEvent === 'delete' ? ' delete' : ''
        }

        return name
    }


    beforeModify = (event) => {
        this.setState({currEvent: event.currentTarget.getAttribute('data-event')})
    };

    render() {


        return (
            <div className="controls">
            {
                Object.entries(this.props.data).map( (currValue, index) => {
                    return (
                        currValue[0] !== 'id' ?
                            <div key={hash3(index)} className="control">
                                <div className={`control-field key ${this.controlClass(currValue) } `}>
                                    <input defaultValue={currValue[0]} />

                                    <div className="icons active">
                                        <div onClick={this.beforeModify} data-event="edit" className={`icon edit ${this.focusClass(currValue[0].id)}`}>
                                            <InlineSVG src={require('../../includes/edit.svg-js')} />
                                        </div>
                                        <div onClick={this.beforeModify} data-event="delete" className={`icon delete ${this.focusClass(currValue[0].id)}`}>
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
                                <div className={`control-field value ${this.controlClass(currValue[1].id) } `}>
                                    <TextArea defaultValue={currValue[1]} inputRef={tag => ('')} />

                                    <div className="icons active">
                                        <div onClick={this.beforeModify} data-event="edit" className={`icon edit ${this.focusClass(currValue[1].id)}`}>
                                            <InlineSVG src={require('../../includes/edit.svg-js')} />
                                        </div>
                                        <div onClick={this.beforeModify} data-event="delete"  className={`icon delete ${this.focusClass(currValue[1].id)}`}>
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
                            </div>
                        : false
                    )
                })
            }
            </div>

        )
    }

}



// {/*<Table headerTitles={this.props.headers} user={this.props.user} focus={this.props.focus} currCity={this.props.currCity} data={this.props.data} />*/}



