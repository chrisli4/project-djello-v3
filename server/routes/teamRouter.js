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

function inTeam(userA, userB) {
	return Team.findOne({ userId: userA })
				.then(team =>
					team.team.indexOf(userB) !== -1
					)
}

function inSend(userA, userB) {
	return Team.findOne({ userId: userA })
				.then(team =>
					team.teamSend.indexOf(userB) !== -1
					)
}

function inReceived(userA, userB) {
	return Team.findOne({ userId: userA })
				.then(team =>
					team.teamReceived.indexOf(userB) !== -1
					)
}

function remove(userA, userB) {
	return Team.findOneAndUpdate({ userId: userA }, { $pull: { team: userB } })
}

function send(userA, userB) {
	return Team.findOneAndUpdate({ userId: userA }, { $addToSet: { teamSend: userB } }, { upsert: true, setDefaultsOnInsert: true })
}

function receive(userA, userB) {
	return Team.findOneAndUpdate({ userId: userB }, { $addToSet: { teamReceived: userA } }, { upsert: true, setDefaultsOnInsert: true })
}

function accept(userA, userB) {
	return Team.findOneAndUpdate({ userId: userA }, { $addToSet: { team: userB }, $pull: { teamReceived: userB, teamSend: userB } })
}

function cancel(userA, userB) {
	return Team.findOneAndUpdate({ userId: userA }, { $pull: { teamSend: userB }})
				.then(() => (
					Team.findOneAndUpdate({ userId: userB }, { $pull: { teamReceived: userA } })
					))
}

function decline(userA, userB) {
	return Team.findOneAndUpdate({ userId: userA }, { $pull: { teamReceived: userB } })
}

function declined(userA, userB) {
	return Team.findOneAndUpdate({ userId: userB }, { $pull: { teamSend: userA } })
}

// remove team member
router.post('/remove', function(req, res) {

	const userA = req.body.user.username
	const userB = req.body.userB

	inTeam(userA, userB)
		.then(team => {
			if(team) {
				remove(userA, userB)
					.then(() =>
						remove(userB, userA)
							)
							.then(() =>
								res.status(200).json(userB)
								)
							.catch(e =>
								res.status(500).json(e.stack)
								)
			} else
				res.status(200).json(null)
		})
})

// accept team request
router.post('/accept', function(req, res) {

	const userA = req.body.user.username
	const userB = req.body.userB

	inReceived(userA, userB)
		.then(receive => {
			if(receive && (userA !== userB) ) {
				accept(userA, userB)
					.then(() =>
						accept(userB, userA)
						)
						.then(() =>
							res.status(200).json(userB)
							)
						.catch(e => 
							res.status(500).json(e.stack)
							)
			} else 
				res.status(200).json(null)
			})
})


// send team invite
router.post('/send', function(req, res) {

	const userA = req.body.user.username
	const userB = req.body.userB

	inTeam(userA, userB)
		.then(team => {
			if(!team && (userA !== userB) ) {
				inSend(userA, userB)
					.then(snd => {
						if(!snd) {
						send(userA, userB)
							.then(() =>
								receive(userA, userB)
								)
								.then(() =>
									res.status(200).json(userB)
									)
						} else
							res.status(200).json(null)
					})
			}
			else
				res.status(200).json(null)
		})
		.catch(e =>
			res.status(500).json(e.stack)
			)	
})

// cancel team request
router.post('/cancel', function(req, res) {

	const userA = req.body.user.username
	const userB = req.body.userB

	inSend(userA, userB)
		.then(snd => {
			if(snd) {
				cancel(userA, userB)
					.then(() =>
						res.status(200).json(userB)
						)
					.catch(e => 
						res.status(500).json(e.stack)
						)
			} else 
				res.status(200).json(null)
		})
})

// decline team invite
router.post('/decline', function(req, res) {

	const userA = req.body.user.username
	const userB = req.body.userB

	inReceived(userA, userB)
		.then(receive => {
			if(receive) {
				decline(userA, userB)
					.then(() =>
						declined(userA, userB)
						)
						.then(() =>
							res.status(200).json(userB)
							)
						.catch(e => {
							res.status(500).json(e.stack)
							})
			} else 
				res.status(200).json(null)
		})
})


module.exports = router