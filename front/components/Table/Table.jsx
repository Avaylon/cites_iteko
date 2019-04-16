import React from 'react'
import Row from './Row.jsx'
import {hash3} from '../../utils/utils.js'

class Table extends React.Component {

    render() {
        const {select, focus} = this.props;

        const list = [...this.props.data].map(({...elem}) => {
            delete elem.id;
            return elem
        });
        const attrs = [...this.props.data].map(({...elem}) => {
            return elem.id
        });

        return (
            <div className="table">
                {
                    list.map(
                        (currValue, index) => (
                            <Row attr={attrs[index]} select={select} key={hash3(index)} title={false} focus={focus}
                                 val={Object.values(currValue)}/>
                        )
                    )
                }
            </div>
        )
    }
}

export default Table;
