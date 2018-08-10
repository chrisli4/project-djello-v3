const router = require('express').Router({ mergeParams: true })
const cardRouter = require('./cardRouter')
const shortid = require('shortid')
const List = require('../models/list')

// get list
router.get('/:listId', function(req, res) {

	List.findOne({ _id: req.params.listId })
	.then(list =>
		res.status(200).json(list)
		)
	.catch(e =>
		res.status(500).json(e)
		)
})

// create new list
router.post('/', function(req, res) {

	let input = req.body.list

	let list = new List({
		_id: shortid.generate(),
		boardId: input.boardId,
		title: input.title,
		description: input.description
	})

	list.save()
	.then(saved =>
		res.status(200).json(saved)
		)
	.catch(e =>
		res.status(500).json(e)
		)
})

// update list
router.put('/:listId', function(req, res) {
	
	let input = req.body.list

	List.findOne({ _id: input._id })
	.then(list =>
		Object.assign(list, { ...input })
		)
	.then(list => 
		list.save()
		)
	.then(updated =>
		res.status(200).json(updated)
		)
	.catch(e => 
		res.status(500).json(e)
		)
})

// delete list
router.delete('/:listId', function(req, res) {

	let input = req.body.list

	List.findOne({ _id: input._id })
	.then(list =>
		list.remove()
		)
	.then(deleted =>
		res.status(200).json(deleted)
		)
	.catch(e =>
		res.status(500).json(e)
		)
})

router.use('/:listId/cards', cardRouter)

module.exports = router