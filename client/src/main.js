import React, { Component } from 'react'
import { Route } from 'react-router'

class Main extends Component {
	render() {
		return (
			<div>
				<Navbar />
				<Container className='mt-3 pt-3'>
					<Switch>
						<Route path='/home/dashboard' component={Dashboard} />
						<Route path='/home/team' component={Team} />
						<Route path='/home/profile' component={Profile} />
					</Switch>
				</Container>
			</div>
		)
	}
}

export default Main