const Board = require('../models/board')
const List = require('../models/list')
const Card = require('../models/card')
const Team = require('../models/team')

function boardsByUser(username) {
	return Board.find({ userId: username })
	.then(boards =>
		boards.reduce((acc, curr) => {
			acc[curr._id] = curr
			return acc
		}, {})
		)
}

function listsByUser(username) {
	return Board.find({ userId: username })
	.populate({
		path: 'lists',
	})
	.then(boards => 
		boards.reduce((acc, curr) => {
			curr.lists.forEach(list => {
				acc[list._id] = list
			})

			return acc
		}, {})
		)
}

function cardsByUser(username) {
	return Board.find({ userId: username })
	.populate({
		path: 'lists',
		populate: {
			path: 'cards'
		}
	})
	.then(boards => 
		boards.reduce((acc, curr) => {
			curr.lists.forEach(list => 
				list.cards.forEach(card => 
					acc[card._id] = card
					)
				)

			return acc;

		}, {})
		)
}

function teamByUser(username) {
	return Team.findOne({ userId: username })
		.then(team => team)
}


module.exports = {
	boardsByUser,
	listsByUser,
	cardsByUser,
	teamByUser
}