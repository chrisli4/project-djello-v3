const router = require('express').Router({ mergeParams: true })
const listRouter = require('./listRouter')
const shortid = require('shortid')

const Board = require('../models/board')

// get board
router.get('/:boardId', function(req, res) {

	Board.findOne({ _id: req.params.boardId })
	.then(board =>
		res.status(200).json(board)
		)
	.catch(e =>
		res.status(500).json(e)
		)
})

// create new board
router.post('/', function(req, res) {

	let input = req.body.board

	let board = new Board({
		_id: shortid.generate(),
		userId: input.userId,
		title: input.title,
		description: input.description
	})

	board.save()
	.then(saved =>
		res.status(200).json(saved)
		)
	.catch(e =>
		res.status(500).json(e)
		)
})

// update board
router.put('/:boardId', function(req, res) {
	
	let input = req.body.board

	Board.findOne({ _id: input._id })
	.then(board =>
		Object.assign(board, { ...input })
		)
	.then(board => 
		board.save()
		)
	.then(updated =>
		res.status(200).json(updated)
		)
	.catch(e => 
		res.status(500).json(e)
		)
})

// delete board
router.delete('/:boardId', function(req, res) {

	let input = req.body.board

	Board.findOne({ _id: input._id })
	.then(board =>
		board.remove()
		)
	.then(deleted =>
		res.status(200).json(deleted)
		)
	.catch(e =>
		res.status(500).json(e)
		)
})

router.use('/:boardId/lists', listRouter)

module.exports = router