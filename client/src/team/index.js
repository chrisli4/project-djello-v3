import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Container } from 'mdbreact'
import { Field, reduxForm } from 'redux-form'
import { dataRequest } from '../dashboard/actions'
import { userSet } from '../user/actions'
import { teamSend, teamSendCancel, teamAccept, teamDecline, teamRemove } from './actions'
import { Card, CardHeader, CardBody, CardFooter, CardImage, CardTitle, CardText, Button, ListGroup, ListGroupItem, Row, Col } from 'mdbreact'

class Team extends Component {

	constructor() {
		super();
		this.state = {
			member: '',

		}
	}

	componentDidMount() {
		this.props.dataRequest({ username: 'test1', token: 'test' })
		this.props.userSet({ user: { username: 'test1'}, token: 'test' })
	}

	onChange = (e) =>
		this.setState({
			[e.target.name]: e.target.value
		})

	onTeamSend = (e) => {
		this.props.teamSend(this.props.user, this.state.member)
		this.setState({
			member: '',
		})
	}

	onTeamSendCancel = (member) =>
		this.props.teamSendCancel(this.props.user, member)

	onTeamAccept = (member) =>
		this.props.teamAccept(this.props.user, member)

	onTeamDecline = (member) =>
		this.props.teamDecline(this.props.user, member)

	onTeamRemove = (member) =>
		this.props.teamRemove(this.props.user, member)


	render() {

		const { handleSubmit } = this.props

		return (
			<Container>
				<Row>
					<Col className='p-3'>
						<Row className='my-3 p-2'>
							<Card className="m-3 w-100">
								<CardHeader className='text-center' color="default-color" tag="h4">
									Invites Sent
								</CardHeader>
								<CardBody>
								<ListGroup>
								{ this.props.team.teamSend.map(sent => (
										<ListGroupItem key={sent} className='grey-text'>{ sent }
											<button type="button" className="close" aria-label="Close" onClick={() => this.onTeamSendCancel(sent)}>
												<span aria-hidden="true">&times;</span>
											</button>
										</ListGroupItem>
									))}
								</ListGroup>
								</CardBody>
								
							</Card>
						</Row>
						<Row>
							<Card className="m-3 w-100">
								<CardHeader className='text-center' color="default-color" tag="h4">
									Pending Requests
								</CardHeader>
								<CardBody>
								<ListGroup>
									{ this.props.team.teamReceived.map(received => (
										<ListGroupItem key={received} className='grey-text'>{ received }
											<button onClick={() => this.onTeamAccept(received)}>Accept</button>
											<button onClick={() => this.onTeamDecline(received)}>Decline</button>
										</ListGroupItem>
										))}
								</ListGroup>
								</CardBody>
							</Card>
						</Row>
					</Col>
					<Col className='p-3'>
					<Row className='my-3 p-2'>
							<Card className="m-3 w-100">
								<CardHeader className='text-center' color="default-color" tag="h4">
									Add Member
								</CardHeader>
								<CardBody className='mb-3'>
									<label htmlFor="member" className="grey-text">Username:</label>
									<input type="text" name='member' className="form-control" onChange={this.onChange} value={this.state.member}/>

								</CardBody>
								<CardFooter>
								<Row className='justify-content-center'>
								<button onClick={this.onTeamSend} className='btn btn-default mx-auto'>Submit</button>
								</Row>
								</CardFooter>
							</Card>
							</Row>
							<Row>
								<Card className="m-3 w-100">
								<CardHeader className='text-center' color="default-color" tag="h4">
									 Team Members
								</CardHeader>
								<CardBody>
								<ListGroup>
									{ this.props.team.team.map(member => (
										<ListGroupItem key={member} className='grey-text'>{ member }
											<button type="button" className="close" aria-label="Close" onClick={() => this.onTeamRemove(member)}>
												<span aria-hidden="true">&times;</span>
											</button>
										</ListGroupItem>
										))}
								</ListGroup>
								</CardBody>
							</Card>
							</Row>
					</Col>

				</Row>
			</Container>
			)
	}
}

const mapStateToProps = (state) => ({
	user: state.user,
	team: state.team
})

const mapDispatchToProps = {
	dataRequest,
	teamSend,
	teamSendCancel,
	teamAccept,
	teamDecline,
	teamRemove,
	userSet,
}

export default connect(mapStateToProps, mapDispatchToProps)(Team)