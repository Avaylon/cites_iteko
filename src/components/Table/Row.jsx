import React from 'react'
import Col from './Col.jsx'
import {hash3} from '../../utils/utils.js'

class Row extends React.Component {

    selectClass() {
        return this.props.attr === this.props.select.id ? 'tr select' : 'tr'
    }

    focus = (event) => {

        if (!this.props.focus) return false;

        this.props.focus(event.currentTarget.getAttribute('data-id') * 1)
    };

    render() {
        const {val, title, attr} = this.props;

        return (
            title ?
                <div className="th">
                    {val.map((currValue, index) => <Col key={hash3(index)} index={index} val={currValue}/>)}
                </div>
                :
                <div onClick={this.focus} data-id={attr} className={this.selectClass()}>
                    {val.map((currValue, index) => <Col key={hash3(index)} index={index} val={currValue}/>)}
                </div>
        )

    }
}


export default Row;


{/*<div onClick={this.props.focus} data-id={this.props.val[0] } className={this.customClass()}>*/
}
