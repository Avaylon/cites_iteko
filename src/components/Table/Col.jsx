import React from 'react'

class Col extends React.Component {
	render () {

		return (
			<div className='td'> {this.props.val} </div>
		)
	}
}

export default Col;