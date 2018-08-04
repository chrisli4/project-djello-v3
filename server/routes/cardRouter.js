const router = require('express').Router({ mergeParams: true })
const shortid = require('shortid')

const Card = require('../models/card')
const History = require('../models/history')

function diff(a, b) {
	return a.filter(i =>
		b.indexOf(i) === -1
	)
}

// get card
router.get('/:cardId', function(req, res) {

	Card.findOne({ _id: req.params.cardId })
	.then(card =>
		res.status(200).json(card)
		)
	.catch(e =>
		res.status(500).json(e)
		)
})

// create new card
router.post('/', function(req, res) {

	let input = req.body.card

	let card = new Card({
		_id: shortid.generate(),
		userId: input.userId,
		listId: input.listId,
		title: input.title,
		description: input.description
	})

	card.save()
	.then(saved =>
		res.status(200).json(saved)
		)
	.catch(e =>
		res.status(500).json(e)
		)
})

// update card

router.put('/:cardId', function(req, res) {
	
	let input = req.body.card

	Card.findOne({ _id: input._id })
	.then(card =>
		Object.assign(card, { ...input })
		)
	.then(card => 
		card.save()
		)
	.then(updated =>
		res.status(200).json(updated)
		)
	.catch(e => 
		res.status(500).json(e)
		)
})

// delete card
router.delete('/:cardId', function(req, res) {

	let input = req.body.card

	Card.findOne({ _id: input._id })
	.then(card =>
		card.remove()
		)
	.then(deleted =>
		res.status(200).json(deleted)
		)
	.catch(e =>
		res.status(500).json(e)
		)
})



module.exports = router