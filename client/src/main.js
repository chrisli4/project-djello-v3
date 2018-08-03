import React, { Component } from 'react'
import { Route, Switch } from 'react-router'

import Navbar from './components/navbar'
import Dashboard from './dashboard'
import Profile from './profile'
import Team from './team'

class Main extends Component {
	render() {
		return (
			<div>
				<Navbar />
				<div className='mt-3 pt-3'>
					<Switch>
						<Route path='/home/profile' component={Profile} />
						<Route path='/home/team' component={Team} />
						<Route path='/home' component={Dashboard} />
					</Switch>
				</div>
			</div>
		)
	}
}

export default Main