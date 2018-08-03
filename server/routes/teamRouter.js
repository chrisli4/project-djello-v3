const router = require('express').Router({ mergeParams: true })
const Team = require('../models/team')
const User = require('../models/user')

// create team
router.post('/', function(req, res) {

	let input = req.body.user

	let team = new Team({
		userId: input.username
	})

	team.save()
	.then(saved =>
		res.status(200).json(saved)
		)
	.catch(e =>
		res.status(500).json(e)
		)
})

// send team invite
router.post('/send', function(req, res) {

	let send = req.body.user
	let receiveId = req.body.receiveId
	console.log(send, receiveId)
	User.findOne({ username: receiveId })
	.then(user => {
		if(user !== null) {
			Team.findOneAndUpdate({ userId: send.username }, { $addToSet: { teamSent: receiveId } }, { upsert: true, setDefaultsOnInsert: true } )
			.then(() =>
				Team.findOneAndUpdate({ userId: receiveId }, { $addToSet: { teamReceived: send.username } }, { upsert: true, setDefaultsOnInsert: true } )
				)
			.then(() =>
				res.status(200).json(user.username)
				)
		} else {
			res.status(404).json('')
		}
	})
})

// cancel team invite
router.post('/cancel', function(req, res) {

	let send = req.body.user
	let receiveId = req.body.receiveId

	Team.findOneAndUpdate({ userId: send.username }, { $pull: { teamSent: receiveId } })
	.then(() =>
		Team.findOneAndUpdate({ userId: receiveId }, { $pull: { teamReceived: send.username } })
		)
	.then(() =>
		res.status(200).json(receiveId)
		)
	.catch(e =>
		res.status(500).json(e)
		)
})

// accept team request
router.post('/accept', function(req, res) {

	let accept = req.body.user
	let sendId = req.body.sendId

	Team.findOneAndUpdate({ userId: accept.username }, { $addToSet: { team: sendId }, $pull: { teamReceived: sendId }, $pull: { teamSent: sendId } })
	.then(() =>
		Team.findOneAndUpdate({ userId: sendId }, { $addToSet: { team: accept.username }, $pull: { teamSent: accept.username }, $pull: { teamReceived: accept.username } })
		)
	.then(() =>
		res.status(200).json(sendId)
		)
	.catch(e =>
		res.status(500).json(e)
		)
})

// decline team request
router.post('/decline', function(req, res) {

	let decline = req.body.user
	let sendId = req.body.sendId

	Team.findOneAndUpdate({ userId: decline.username }, { $pull: { teamReceived: sendId } })
	.then(() =>
		Team.findOneAndUpdate({ userId: sendId }, { $pull: { teamSent: decline.username } })
		)
	.then(() =>
		res.status(200).json(sendId)
		)
	.catch(e =>
		res.status(500).json(e)
		)
})

module.exports = router