import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router'

import io from "socket.io-client";

import { dataRequest } from './actions'
import { userSet } from '../user/actions'
import { cardReceiveDelete, cardReceiveUpdate } from '../card/actions'
import { inviteReceive, inviteCancel, inviteDecline, inviteAccept } from '../team/actions'

import Navbar from '../components/navbar'
import Board from '../board'
import Profile from '../user'
import Team from '../team'
import TeamCards from '../card/teamcards'


class Dashboard extends Component {

	componentDidMount() {
		this.props.dataRequest({ username: 'test1', token: 'test' })
		this.props.userSet({ user: { username: 'test1', firstName: 'test', lastName: '1'}, token: 'test' })
		const socket = io('http://localhost:3001')

		socket.on('connect', () => {
			socket.emit('userConnected', this.props.user.username)
		})

		socket.on('INVITE_RECEIVE', (user) => {
			console.log('INVITE_RECEIVE')
			this.props.inviteReceive(user)
		})

		socket.on('INVITE_DECLINE', (user) => {
			console.log('INVITE_DECLINE')
			this.props.inviteDecline(user)
		})

		socket.on('INVITE_CANCEL', (user) => {
			console.log('INVITE_CANCEL')
			this.props.inviteCancel(user)
		})

		socket.on('INVITE_ACCEPT', (user) => {
			console.log('INVITE_ACCEPT')
			this.props.inviteAccept(user)
		})

		socket.on('CARD_UPDATE', (card) => {
			console.log('CARD_UPDATE')

			if(card.userId !== this.props.user.username) {

				if(card.members.indexOf(this.props.user.username) === -1) {
					this.props.cardReceiveDelete(card)
				} else {
					this.props.cardReceiveUpdate(card)
				}
			}
		})

		socket.on('CARD_DELETE', (card) => {
			console.log('CARD_DELETE')
			if(card.userId !== this.props.user.username) {
				this.props.cardReceiveDelete(card)
		}
		})
	}

	render() {
		return (
			<div>
				<Navbar />
				<div className='mt-3 pt-4'>
					<Switch>
						<Route path='/home/profile' component={Profile} />
						<Route path='/home/teamcards' component={TeamCards} />
						<Route path='/home/team' component={Team} />
						<Route path='/home' component={Board} />
					</Switch>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	user: state.user
})

const mapDispatchToProps = { 
	dataRequest,
	cardReceiveUpdate,
	cardReceiveDelete,
	inviteReceive,
	inviteAccept,
	inviteCancel,
	inviteDecline,
	userSet
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)