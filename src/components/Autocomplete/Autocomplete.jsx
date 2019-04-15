import React from 'react'
import {hash3} from "../../utils/utils.js";

export class Autocomplete extends React.Component {

    valueChange = (event) => {
        this.props.valueChange(event.currentTarget.getAttribute('data-value'))
    };

    render() {

        const data = [...this.props.data.filter((value) => {

            return value.indexOf(this.props.value) > -1 && value !== this.props.value
        })];


        return (
            <ul className="ul-autocomplete">
                {
                    data.map((currValue, index) => {
                        return (
                            <li onClick={this.valueChange} data-value={currValue} key={hash3(index)}> {currValue} </li>)
                    })
                }
            </ul>
        )
    }
}


