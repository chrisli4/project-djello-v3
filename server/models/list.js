const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Board = require('./board');
const Card = require('./card');

const ListSchema = new Schema({
	id: {
		type: String,
		required: true
	},
	boardId: {
		type: String, 
		ref: 'List',
		required: true
	},
	title: {
		type: String
	},
	description: {
		type: String
	},
	position: Number,
	completed: {
		type: Boolean,
		default: false
	},
	cards: [{ type: String, ref: 'Card' }]
})

ListSchema.pre('remove', function(next) {
	this.model('Board').update({ lists: this.id }, { $pull: { lists: this.id } })
		.then(() => {
			this.model('Card').remove({ listId: this.id }, next);
		})
});

ListSchema.pre('save', function(next) {
	if(this.isNew)
		this.model('Board').update({ id: this.boardId }, { $push: { lists: this.id } }, next);
	else
		next();
})


module.exports = mongoose.model('List', ListSchema)