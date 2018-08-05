import React, { Component } from 'react'

class teamIndex extends Component {

	componentDidMount() {

	}

	render() {
		return (
			<div>
			</div>
			)
	}
}

function notOwn(cards, username) {

	const arr = [];

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

