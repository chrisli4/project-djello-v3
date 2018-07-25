const router = require('express').Router({ mergeParams: true })
const Team = require('../models/team')
const User = require('../models/user')

// send team invite
router.post('/send', function(req, res) {

	let send = req.body.user
	let receiveId = req.body.recieveId

	User.find({ username: receiveId })
	.then(user => {
		if(user) {
			Team.findOneAndUpdate({ userId: send.username }, { $addToSet: { teamInvites: receiveId } }, { upsert: true, setDefaultsOnInsert: true } )
			.then(() =>
				Team.findOneAndUpdate({ userId: recieveId }, { $addToSet: { teamRequests: userId } } )
				)
			.then(() =>
				res.status(200).json(recieveId)
				)
		} else {
			res.status(500).json()
		}
	})
})

// cancel team invite
router.post('/cancel', function(req, res) {

	let send = req.body.user
	let receiveId = req.body.recieveId

	Team.findOneAndUpdate({ userId: send.username }, { $pull: { teamInvites: receiveId } })
	.then(() =>
		Team.findOneAndUpdate({ userId: recieveId }, { $pull: { teamRequests: userId } })
		)
	.then(() =>
		res.status(200).json(recieveId)
		)
	.catch(e =>
		res.status(500).json(e)
		)
})

// accept team request
router.post('/accept', function(req, res) {

	let accept = req.body.user
	let sendId = req.body.sendId

	Team.findOneAndUpdate({ userId: accept.username }, { $addToSet: { team: sendId }, $pull: { teamRequests: sendId } })
	.then(() =>
		Team.findOneAndUpdate({ userId: sendId }, { $addToSet: { team: accept.username }, $pull: { teamRequests: accept.username } })
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

	Team.findOneAndUpdate({ userId: decline.username }, { $pull: { teamRequests: sendId } })
	.then(() =>
		Team.findOneAndUpdate({ userId: sendId }, { $pull: { teamInvites: decline.username } })
		)
	.then(() =>
		res.status(200).json(sendId)
		)
	.catch(e =>
		res.status(500).json(e)
		)
})

module.exports = router