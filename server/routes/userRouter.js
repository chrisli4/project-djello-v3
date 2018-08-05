
const router = require('express').Router({ mergeParams: true })
const boardRouter = require('./boardRouter')
const teamRouter = require('./teamRouter')

const User = require('../models/user')
const { boardsByUser, listsByUser, cardsByUser, teamByUser, teamCardsByUser } = require('../lib/byUser');

function filt(user) {
	return user.username
}

// get username
router.get('/:username', function(req, res) {

	User.findOne({ username: req.params.username })
	.then(user => 
		res.status(200).json(user.username)
		)
	.catch(e => 
		res.status(500).json(e)
		)
})

// update user
router.put('/:username', function(req, res) {

	let input = req.body.user

	User.findOne({ username: input.username })
	.then(user =>
		Object.assign(user, { ...input })
		)
	.then(user => 
		user.save()
		)
	.then(updated =>
		res.status(200).json(updated)
		)
	.catch(e =>
		res.status(500).json(e)
		)
})

// delete user
router.delete('/:username', function(req, res) {
	
	let input = req.body.user

	User.findOne({ username: input.username })
	.then(user =>
		user.remove()
		)
	.then(deleted =>
		res.status(200).json(deleted)
		)
	.catch(e =>
		res.status(500).json(e)
		)
})

// get user data
router.get('/:username/data', function(req, res) {

	let username = req.params.username

	Promise.all([boardsByUser(username), listsByUser(username), cardsByUser(username), teamByUser(username), teamCardsByUser(username)])
	.then(([boards, lists, cards, team, teamCards]) =>
		res.status(200).json({
			boards: boards,
			lists: lists,
			cards: Object.assign(cards, teamCards),
			team: team
		})
		)
	.catch(e =>
		res.status(500).json(e)
		)

})

router.use('/:username/boards', boardRouter)
router.use('/:username/team', teamRouter)

module.exports = router