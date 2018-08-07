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
	return Card.find({ userId: username })
		.then(cards => 
			cards.reduce((acc, card) => {
				acc[card._id] = card;
				return acc
			}, {})
		)
	.catch(e =>
		res.status(500).json(e.stack)
		)
}

function teamByUser(username) {
	return Team.findOne({ userId: username })
		.then(team => team)
}

function teamCardsByUser(username) {
	return Card.find({ members: username })
		.then(cards => 
			cards.reduce((acc, card) => {
				acc[card._id] = card;
				return acc
			}, {})
		)
		.catch(e =>
			res.status(500).json(e.stack)
			)
}


module.exports = {
	boardsByUser,
	listsByUser,
	cardsByUser,
	teamByUser,
	teamCardsByUser
}