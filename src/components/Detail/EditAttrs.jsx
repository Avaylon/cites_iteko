import React from 'react'
import {browserHistory} from 'react-router'
import {hash3} from '../../utils/utils.js'
import {Fields} from './Fields.jsx'

export class EditAttrs extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            attrsOptionalFields: {
                name: '',
                value: '',
            },
            optional: [...this.props.optional],
            required: [...this.props.required],
        }
    };

    addRequired = async (event) => {
        const name = event.currentTarget.getAttribute('data-name');
        await this.setState({required: this.state.required.concat({id: hash3(0), name: name, value: '', added: true})});
        this.send()
    };

    addOptional = async () => {
        const {name, value} = this.state.attrsOptionalFields;
        const data = {name: name, value: value, added: true, edited: true};

        await this.setState({
            attrsOptionalFields: {name: '', value: ''},
            optional: [...this.state.optional].concat(data),
        });

        this.send()
    };

    send = () => {
        this.props.send(this.props.send([...this.state.required, ...this.state.optional], 'attrs'))
    };

    delRequired = (id) => {
        this.setState({required: this.state.required.filter((currValue) => (currValue.id !== id))})

    };

    del = async (id) => {
        await this.setState({
            optional: this.state.optional.map((currValue) => (
                currValue.id !== id ? currValue : {...currValue, deleted: true}))
        });

        this.send()
    };

    revive = (event) => {
        const id = event.currentTarget.getAttribute('data-id') * 1;
        this.setState({
            optional: this.state.optional.map((currValue) => (
                currValue.id !== id ? currValue : {...currValue, deleted: false}))
        })
    };

    addOptionalName = (event) => {
        this.setState({attrsOptionalFields: {...this.state.attrsOptionalFields, name: event.target.value}})
    };

    addOptionalValue = (event) => {
        this.setState({attrsOptionalFields: {...this.state.attrsOptionalFields, value: event.target.value}})
    };

    editRequired = async (name, value, id) => {
        await this.setState({
            required: this.state.required.map((currValue) => (currValue.id !== id ? currValue : {
                ...currValue,
                name: name,
                value: value,
                edited: true
            }))
        });
        this.send()
    };

    editOptional = async (name, value, id) => {
        await this.setState({
            optional: this.state.optional.map((currValue) => (currValue.id !== id ? currValue : {
                ...currValue,
                name: name,
                value: value,
                edited: true
            }))
        });
        this.send()
    };

    classNameOptionalFields = (edited) => (edited ? 'fields edited' : 'fields');

    render() {
        const {attrsList} = this.props;
        const {attrsOptionalFields, optional, required} = this.state;
        const {addOptionalName, addOptionalValue, addOptional, del, editRequired, delRequired, revive, editOptional, addRequired, classNameOptionalFields} = this;

        return (
            <div className="attrs">
                <div className="required">
                    <div className="title">Основные</div>

                    <div className="fields-wrapp">
                        {required.map((currValue, index) => (
                            <div className="fields" key={hash3(index)}>
                                <Fields onlyValue={true} del={delRequired} submit={editRequired} id={currValue.id}
                                        name={currValue.name} value={currValue.value} cl={'title'}/>
                            </div>
                        ))}
                        {attrsList.map((currValue, index) => {

                            // to do: be better
                            const haveName = required.find((elem) => (elem.name === currValue.name));

                            if (!currValue.required || haveName) return false;

                            return (
                                <div className="fields add" key={hash3(index)}>
                                    <div className="field">
                                        <div className="title"><span>Требуется: {currValue.name}</span></div>
                                        <div onClick={addRequired} className="but" data-name={currValue.name}>Добавить
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="optional">
                    <div className="title">Дополнительные</div>
                    <div className="fields-wrapp">
                        {optional.map((currValue, index) => (
                            !currValue.deleted ?
                                <div className={classNameOptionalFields(currValue.edited)} key={hash3(index)}>
                                    <Fields del={del} submit={editOptional} id={currValue.id} name={currValue.name}
                                            value={currValue.value} cl={'title'}/>

                                </div>
                                :
                                <div className="fields revive" key={hash3(index)}>
                                    <div onClick={revive} data-id={currValue.id}> Восстановить
                                        : <span>{currValue.name}</span></div>
                                </div>
                        ))}
                        <div className="fields">
                            <div className="field new">
                                <input onChange={addOptionalName} value={attrsOptionalFields.name} data-field="city"
                                       className="title"/>
                                <input onChange={addOptionalValue} value={attrsOptionalFields.value} data-field="city"
                                       className="title"/>
                                <div onClick={addOptional} className="but">Добавить</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }


}