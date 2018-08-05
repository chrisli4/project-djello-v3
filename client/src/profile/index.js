import React, { Component } from 'react'
import { Container, CardHeader, Card, CardBody, FormInline, Row } from 'mdbreact'
import { Field, reduxForm } from 'redux-form'

class Profile extends Component {

	render() {
		return (
			<Container className='mt-5'>

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