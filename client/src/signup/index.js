import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import signupRequest from './actions';
import { Container, Row, Col, Button } from 'mdbreact';
import { Field, reduxForm } from 'redux-form'
import { history } from '../'

class Signup extends Component {

	render() {

		const { handleSubmit } = this.props

		return (
			<Container className="mt-3">
				<Row>
					<Col className="mx-auto mt-3" style={{maxWidth:"450px"}}>
						<form onSubmit={handleSubmit(values => {
							this.props.signupRequest({ ...values })
						})}>
							<p className="h4 text-center mb-4">Sign Up</p>
							<div>
								<label htmlFor="email" className="grey-text">Your email</label>
								<Field name="email" component="input" type="text" className="form-control" />
							</div>
							<br/>
							<div>
								<label htmlFor="username" className="grey-text">Your username</label>
								<Field name="username" component="input" type="text" className="form-control"/>
							</div>
							<br/>
							<div>
								<label htmlFor="firstName" className="grey-text">Your first name</label>
								<Field name="firstName" component="input" type="text" className="form-control"/>
							</div>
							<br/>
							<div>
								<label htmlFor="lastName" className="grey-text">Your last name</label>
								<Field name="lastName" component="input" type="text" className="form-control"/>
							</div>
							<br/>
							<div>
								<label htmlFor="password" className="grey-text">Your password</label>
								<Field name="password" component="input" type="password" className="form-control"/>
							</div>
							<br/>
							<div className="text-center mt-4">
								<button type="submit" className="btn btn-indigo">Sign Up</button>
							</div>
						</form>
					</Col>
				</Row>
			</Container>
			)
	}

}

export default reduxForm({
	form: 'register'
})(connect(null, { signupRequest })(Signup))