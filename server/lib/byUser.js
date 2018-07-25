const Board = require('../models/board')
const List = require('../models/list')
const Card = require('../models/card')
const Team = require('../models/team')

function boardsByUser(username) {
	return 
	Board.find({ userId: username })
	.then(boards =>
		boards.reduce((acc, current) => {
			acc[current._id] = current
			return acc
		}, {})
		)
	.catch(e => 
		new Error(e)
		)
}

function listsByUser(username) {
	return
	Board.find({ userId: username })
	.populate({
		path: 'lists'
	})
	.then(boards =>
		boards.reduce((acc, current) => {
			current.lists.forEach(list =>
				acc[list._id] = list
				)
			return acc
		}, {})
		)
	.catch(e => 
		new Error(e)
		)
}

function cardsByUser(username) {
	return
	Board.find({ userId: username })
	.populate({
		path: 'lists',
		populate: {
			path: 'cards',
			populate: {
				path: 'activity'
			}
		}
	})
	.then(boards =>
		boards.reduce((acc, current) => {
			current.lists.forEach(list =>
				list.cards.forEach(card =>
					acc[card._id] = card
					)
				)
			return acc
		}, {})
		)
	.catch(e =>
		new Error(e)			
		)
}

function teamCardsByUser(username) {
	return 
	Team.find({ userId: username })
	.populate({
		path: 'cards'
	})
	.then(team =>
		team.cards.reduce((acc, current) => {
			acc[current._id] = current
			return acc
		}, {})
		)
	.catch(e =>
		new Error(e)
		)
}

module.exports = {
	boardsByUser,
	listsByUser,
	cardsByUser,
	teamCardsByUser,
}