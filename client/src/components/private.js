import React from 'react'
import { Route, Redirect } from 'react-router'

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route {...rest} render={(props) => (
		props.isAuth === true
			? <Component {...props} />
			: <Redirect to='/login' />
		)} />
	)

export default PrivateRoute