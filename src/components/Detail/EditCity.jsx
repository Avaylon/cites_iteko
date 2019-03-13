import React from 'react'
import { browserHistory } from 'react-router'


export class EditCity extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            cityName: this.props.cityName,
            cityRegion: this.props.cityRegion,
        }
    };
    editFormChangeCity = async (event) => {
        await this.setState( { cityName: event.target.value });
        this.props.send(this.state, 'city');
    };
    editFormChangeRegion = async (event) => {
        await this.setState( { cityRegion: event.target.value });
        this.props.send(this.state, 'city');
    };

    render () {

        const {cityName, cityRegion } = this.state;

        return (
            <div className="current-city">
                <input onChange={this.editFormChangeCity} value={ cityName } data-field="city" className="title"  />
                <div>Регион: <input onChange={this.editFormChangeRegion} value={ cityRegion } data-field="region" className="subtitle" /></div>

            </div>
        )
    }


}