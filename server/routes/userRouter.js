const router = require('express').Router({ mergeParams: true })
const boardRouter = require('./boardRouter')
const teamRouter = require('./teamRouter')

const User = require('../models/user')
const { boardsByUser, listsByUser, cardsByUser, teamCardsByUser } = require('../lib/byUser');

// get user
router.get('/:username', function(req, res) {

	User.find({ username: req.params.username })
	.then(user =>
		res.status(200).json(user)
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

	Promise.all([boardsByUser(username), listsByUser(username), cardsByUser(username), teamCardsByUser(username)])
	.then(data => 
		res.status(200).json({
			boards: data[0],
			lists: data[1],
			cards: Object.assign(data[2], data[3])
		})
		)
	.catch(e =>
		res.status(500).json(e)
		)

})

router.use('/:username/boards', boardRouter)
router.use('/:username/team', teamRouter)

module.exports = router