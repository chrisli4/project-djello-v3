import React, { Component } from 'react'
import { Route, Switch } from 'react-router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStroopwafel, faPlus, faUsers, faUser, faHome, faChalkboard, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

import { Container } from 'mdbreact'
import Main from './main'
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
						<Route path='/home' component={Main} />
					</Switch>
			</div>
			);
	}
}

export default App;