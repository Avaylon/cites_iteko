import React from 'react'
import Row from './Row.jsx'
import {hash3} from '../../utils/utils.js'


// Table(Array)
class Table extends React.Component {

	constructor (props) {
		super(props);

		this.state = {
			list: [],
			attrs: []
		}
	}


	componentWillReceiveProps = (props) => {
		this.setState({
			list: [...props.data].map( ({...elem}) => { delete elem.id; return elem }),
			attrs: [...props.data].map( ({...elem}) => { return elem.id }),
		})
	};

	render() {

		const {list, attrs} = this.state;
		const {select, focus} = this.props;

		return (
			<div className="table">
				{
					list.map(
						(currValue, index) => (
							index === 0 ?
								[
									<Row attr={''} select={select} key={hash3(index)} title={true} focus={focus} val={Object.keys(currValue)}/>,
									<Row attr={attrs[index]} select={select} key={hash3(index)} title={false} focus={focus} val={Object.values(currValue)}/>,
								]
							:
								<Row attr={attrs[index]} select={select} key={hash3(index)} title={false} focus={focus} val={Object.values(currValue)}/>
						)
					)
				}
			</div>
		)
	}
}


export default Table;
