import React from 'react'
import List from './List/List.jsx'
import Order from './Order/Order.jsx'

class App extends React.Component {

	constructor(props) {
		super(props);

	}

	render = () => {

		return (
			<main className="main">
				<List />
				<Order />
			</main>
		)
	}
}

export default App
