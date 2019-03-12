import React from 'react'
import { Route, browserHistory } from 'react-router'
import { Attrs } from '../Attrs/Attrs.jsx'

export class Fields extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            name: this.props.name,
            value: this.props.value
        }
    }

    changeValue = (event) => {
        this.setState({value: event.target.value})
    };
    changeName  = (event) => {
        this.setState({name: event.target.value})
    };

    disabled = () => (this.state.value === this.props.value && this.state.name === this.props.name);

    edit = () => {

        if ( this.disabled() ) return false;

        this.props.submit(this.state.name, this.state.value, this.props.id)
    };
    del = () => {
        this.props.del(this.props.id)
    };

    render () {
        const {name, value} = this.state;
        const {cl, id, onlyValue} = this.props;
        const {changeName, changeValue, del, edit, disabled} = this;


        return (
            <div className="field">
                <input onChange={changeName} data-id={id} value={ name } disabled={onlyValue} className={cl}  />
                <input onChange={changeValue} data-id={id} value={ value } className={cl}  />
                <div onClick={edit} className={`edit ${disabled}`} >Изменить</div>
                <div onClick={del} >Удалить</div>
            </div>
        )
    }
}