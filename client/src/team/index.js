import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Container } from 'mdbreact'
import { Field, reduxForm } from 'redux-form'
import { dataRequest } from '../dashboard/actions'
import { userSet } from '../user/actions'
import { teamSend } from './actions'

class Team extends Component {

			componentDidMount() {
		this.props.dataRequest({ username: 'test1', token: 'test' })
		this.props.userSet({ user: { username: 'test1'}, token: 'test' })
	}


	render() {

		const { handleSubmit } = this.props

		return (
			<Container>
				<form onSubmit={handleSubmit(member => {
							this.props.teamSend(this.props.user, member.username)
						})}>		
								<label htmlFor="username" className="grey-text">Add Member:</label>
								<Field name="username" component="input" type="text" className="form-control" />
								<button type='submit'>Submit</button>
							</form>
							<div>
								Sent Invites
								{this.props.team.teamSent.map(sent =>
									<p>invite: {sent} </p>
									)}
							</div>
							<div>
								Pending Invites
								{this.props.team.teamReceived.map(received =>
									<p>received: {received} </p>
									)}
							</div>
														<div>
								Team Members
								{this.props.team.team.map(member =>
									<p>members: {member} </p>
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

export default reduxForm({
	form: 'team'
})(connect(mapStateToProps, { teamSend, dataRequest, userSet })(Team))