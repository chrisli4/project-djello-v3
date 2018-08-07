import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container } from 'mdbreact'

class TeamCards extends Component {

	componentDidMount() {

	}

	render() {
		return (
			<Container>
				{ this.props.teamCards.map(card =>
					<div>{card.title}</div>
					)}
			</Container>
			)
	}
}

function notOwn(cards, username) {

	let arr = [];

	for(let id in cards) {
		if(cards[id].userId !== username) {
			arr = [...arr, cards[id]]
		}
	}
	return arr
}

const mapStateToProps = (state) => ({
	teamCards: notOwn(state.cards.byId, state.user.username)
})

export default connect(mapStateToProps)(TeamCards)

