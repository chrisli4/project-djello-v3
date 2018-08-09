import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Col, Container, Card, CardHeader, CardBody, ListGroup, Row } from 'mdbreact'

import TeamCard from './teamcard'
import Header from '../components/header';

class TeamCards extends Component {

	componentDidMount() {

	}

	render() {

		let ownerIds = Object.keys(this.props.teamCards)

		return (
			<Container>
				<Header title='Team Cards' description='Cards shared by team members'/>
			
				<hr className='my-3' />
				<Row>
				{ ownerIds.map(ownerId => {
					return (
						<Col className='col-4' key={ownerId}>
						<Card>
				<CardHeader className='text-center' border="primary" color="primary-color">
				{ownerId}
				</CardHeader>
						<CardBody>
						<ListGroup>
						{ this.props.teamCards[ownerId].map(cardId => {
							return <TeamCard key={cardId} _id={cardId}/>
						})}
						</ListGroup>
						</CardBody>
						</Card>
						</Col>
						)
				})}
				</Row>
			</Container>
			)
	}
}

function notOwn(cards, username) {

	let arr = {};

	for(let id in cards) {

		let ownerId = cards[id].userId

		if(ownerId !== username) {
			if(arr[ownerId])
				arr[ownerId] = [...arr[ownerId], cards[id]._id]
			else
				arr[ownerId] = [cards[id]._id]
		}
	}
	return arr
}

const mapStateToProps = (state) => ({
	teamCards: notOwn(state.cards.byId, state.user.username)
})

export default connect(mapStateToProps)(TeamCards)