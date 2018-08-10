import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router'
import { connect } from 'react-redux'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faStroopwafel, faPlus, faUsers, faUser, faHome, faChalkboard, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

import Dashboard from './dashboard'
import Login from './login'
import Signup from './signup'

library.add(faStroopwafel, faPlus, faUsers, faUser, faHome, faChalkboard, faSignOutAlt)


class App extends Component {
	render() {
		return (
			<div className="App">
					<Switch>
						<Route path='/register' component={Signup} />
						<Route path='/login' component={Login} />
						<Route path='/home' render={() => {
							return (
								this.props.user.username ? 
									<Dashboard />
									: <Redirect to='/login' />
								)
						}} />
						/>
					</Switch>
			</div>
			);
	}
}

const mapStateToProps = (state) => ({
	user: state.user
})

export default connect(mapStateToProps, null, null, {pure: false})(App)