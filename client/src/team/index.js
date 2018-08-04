import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Container } from 'mdbreact'
import { Field, reduxForm } from 'redux-form'
import { dataRequest } from '../dashboard/actions'
import { userSet } from '../user/actions'
import { teamSend, teamSendCancel, teamAccept, teamDecline } from './actions'

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

	onTeamSendCancel = (e) =>
		this.props.teamSendCancel()

	onTeamAccept = (member) =>
		this.props.teamAccept(this.props.user, member)

	onTeamDecline = (member) =>
		this.props.teamDecline(this.props.user, member)


	render() {

		const { handleSubmit } = this.props

		return (
			<Container>
				<label htmlFor="member" className="grey-text">Add Member:</label>
				<input type="text" name='member' className="form-control" onChange={this.onChange}/>
				<button onClick={this.onTeamSend}>Submit</button>
							
							<div>
								Sent Invites
								{this.props.team.teamSend.map(sent =>
									<p key={sent}>invite: {sent} </p>
									)}
							</div>
							<div>
								Pending Invites
								{this.props.team.teamReceived.map(member =>
									<div key={member}>
										{member}
										<button onClick={() => this.onTeamAccept(member)}>Accept</button>
										<button onClick={() => this.onTeamDecline(member)}>Decline</button>
									</div>
									)}
							</div>

							<div>
								Team Members
								{this.props.team.team.map(member =>
									<p key={member}>members: {member} </p>
									)}
							</div>
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
	userSet,
}

export default connect(mapStateToProps, mapDispatchToProps)(Team)