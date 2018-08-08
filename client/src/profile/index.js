import React, { Component } from 'react'
import { Container, CardHeader, Card, CardBody, FormInline, Row } from 'mdbreact'
import { Field, reduxForm } from 'redux-form'

class Profile extends Component {

	render() {
		return (
			<Container>
				<Row>
					<div className='col text-left my-1'>
						<div disabled name='title' className='form-control-plaintext h1-responsive'>Edit Profile</div>
					</div>
				</Row>
				<Row>
					<div className='col text-left my-1'>
						<div disabled name='description' className='form-control-plaintext lead grey-text'>Edit your personal information</div>
					</div>
				</Row>
			
				<hr />
				<Card className='mx-auto mt-2' style={{maxWidth:"450px"}}>
					<CardHeader border="default" color="default-color" className='text-center'>
						<h3 className='py-1'>Profile</h3>
					</CardHeader>
					<CardBody>
							<div>
								<label htmlFor="username" className="grey-text">Email:</label>
								<Field name="username" component="input" type="text" className="form-control" />
							</div>
							<br/>
							<div>
								<label htmlFor="username" className="grey-text">Username:</label>
								<Field name="username" component="input" type="text" className="form-control" />
							</div>
							<br/>
							<div>
								<label htmlFor="username" className="grey-text">First Name:</label>
								<Field name="username" component="input" type="text" className="form-control" />
							</div>
							<br/>
							<div>
								<label htmlFor="username" className="grey-text">Last Name:</label>
								<Field name="username" component="input" type="text" className="form-control" />
							</div>
							<br/>
					</CardBody>
				</Card>
			</Container>
			)
	}

}

export default reduxForm({
	form: 'profile'
})(Profile)