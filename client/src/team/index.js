import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Container } from 'mdbreact'
import { teamSend, teamSendCancel, teamAccept, teamDecline, teamRemove } from './actions'
import { Card, CardHeader, CardBody, CardFooter, ListGroup, ListGroupItem, Row, Col } from 'mdbreact'

import Header from '../components/header'
import CustomListGroup from '../components/group'
import CustomCard from '../components/card'

class Team extends Component {

	constructor() {
		super();
		this.state = {
			member: '',

		}
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

		return (
			<Container>
				<Header title='Team Management' description='Add and remove users from your team'/>
				<hr />
				<Row>
					<Col className='col-6'>
						<CustomCard text='Add Member' color='default-color' tag='h4' className="m-3 w-100"
							compA={
								<div>
									<label htmlFor="member" className="grey-text">Username:</label>
									<input type="text" name='member' className="form-control" onChange={this.onChange} value={this.state.member}/>
								</div>
							}
							compB={
								<Row className='justify-content-center'>
									<button onClick={this.onTeamSend} className='btn btn-default mx-auto'>Submit</button>
								</Row>
							} 
						/>
					</Col>
					<Col className='col-6'>
						<CustomCard text='Team Members' color='default-color' tag='h4' className="m-3 w-100"
							compA={
								<CustomListGroup
									array={this.props.team.team}
									onClick={this.onTeamRemove}
							/>
							} 
						/>
					</Col>
					<Col className='col-6'>
						<CustomCard text='Invites Sent' color='default-color' tag='h4' className="m-3 w-100"
							compA={
								<CustomListGroup
									array={this.props.team.teamSend}
									onClick={this.onTeamSendCancel}
								/>} 
						/>
					</Col>
					<Col className='col-6'>
						<CustomCard text='Pending Requests' color='default-color' tag='h4' className="m-3 w-100"
							compA={
								<ListGroup>
									{ this.props.team.teamReceived.map(received => (
										<ListGroupItem key={received} className='grey-text'>{ received }
											<button onClick={() => this.onTeamAccept(received)}>Accept</button>
											<button onClick={() => this.onTeamDecline(received)}>Decline</button>
										</ListGroupItem>
									))}
								</ListGroup>} 
						/>
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
	teamSend,
	teamSendCancel,
	teamAccept,
	teamDecline,
	teamRemove,
}

export default connect(mapStateToProps, mapDispatchToProps)(Team)