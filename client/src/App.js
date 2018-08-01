import React, { Component } from 'react'
import { Route } from 'react-router'
import { Container } from 'mdbreact'

import Dashboard from './dashboard'

class App extends Component {
	render() {
		return (
			<div className="App">
				<Container>
					<Dashboard />
				</Container>
			</div>
			);
	}
}

export default App;
