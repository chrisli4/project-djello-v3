import React, { Component } from 'react';
import { connect } from 'react-redux';
import loginRequest from './actions';
import { Container, Row, Col, Input, Button } from 'mdbreact';
import { Field, reduxForm } from 'redux-form'
import { history } from '../'

class Login extends Component {

	render() {

		const { handleSubmit } = this.props

		return (
			<Container className="mt-3">
				<Row>
					<Col className="mx-auto mt-3" style={{maxWidth:"450px"}}>
						<form onSubmit={handleSubmit(values => {
							this.props.loginRequest({ ...values })
						})}>
							<p className="h4 text-center mb-4">Sign In</p>
							<div>
								<label htmlFor="email" className="grey-text">Your email</label>
								<Field name="email" component="input" type="text" className="form-control" />
							</div>
							<br/>
							<div>
								<label htmlFor="password" className="grey-text">Your password</label>
								<Field name="password" component="input" type="password" className="form-control" />
							</div>
							<br/>
							<div className="text-center mt-4">
							<button type="submit" className="btn btn-indigo">Login</button>
							</div>
						</form>
					</Col>
				</Row>
			</Container>
			)
	}

}

export default reduxForm({
	form: 'login'
})(connect(null, { loginRequest })(Login))