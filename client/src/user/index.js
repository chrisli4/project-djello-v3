import React, { Component } from 'react'
import { connect } from 'react-redux'
import { userUpdate, userUpdateSubmit } from './actions'
import { Container, CardHeader, Card, CardBody, CardFooter, Row } from 'mdbreact'

import Header from '../components/header'


class Profile extends Component {

	onChange = (e) => {
		e.preventDefault();
		this.props.userUpdate(e.target.name, e.target.value)
	}

	onSubmit = (e) => {
		e.preventDefault();
		this.props.userUpdateSubmit(this.props.user)
	}

	render() {
		return (
			<Container>
				<Header title='Profile' description='Edit your personal information'/>
				<hr />
				<Card className='mx-auto mt-3' style={{maxWidth:"450px"}}>
					<CardHeader border="default" color="default-color" className='text-center'>
						<h3 className='py-1'>Profile</h3>
					</CardHeader>
					<CardBody>
					<label htmlFor="userName" className="grey-text">Your username</label>
					<span name="userName" type="text" className="form-control grey-text">{this.props.user.username}</span>
					<br/>
					<label htmlFor="email" className="grey-text">Your email</label>
					<span name="email" type="email" className="form-control grey-text">{this.props.user.email}</span>
					<br/>
					<label htmlFor="firstName" className="grey-text">Your first name</label>
					<input  name="firstName" type="text" value={this.props.user.firstName} onChange={this.onChange} className="form-control grey-text"></input>
					<br/>
					<label htmlFor="lastName" className="grey-text">Your first name</label>
					<input  name="lastName" type="text" value={this.props.user.lastName} onChange={this.onChange} className="form-control grey-text"/>
					<br/>
					</CardBody>
					<CardFooter className='justify-content-center'>
						<Row className='justify-content-center'>
							<button className='btn btn-default' onClick={this.onSubmit}>Submit</button>
						</Row>
					</CardFooter>
				</Card>
			</Container>
			)
	}
}

const mapStateToProps = (state) => ({
	user: state.user
})

const mapDispatchToProps = {
	userUpdate,
	userUpdateSubmit
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)

