import React, { Component } from 'react'
import { Route, Switch } from 'react-router'

import Navbar from './components/navbar'
import Dashboard from './dashboard'

class Main extends Component {
	render() {
		return (
			<div>
				<Navbar />
				<div className='mt-3 pt-3'>
					<Switch>
						<Route path='/' component={Dashboard} />
					</Switch>
				</div>
			</div>
		)
	}
}

export default Main