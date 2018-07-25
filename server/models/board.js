const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const List = require('./list');

const BoardSchema = new Schema({
	id: {
		type: String,
		required: true
	},
	userId: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
	},
	lists: [{ type: String, ref: 'List' }]
})

BoardSchema.pre('remove', function(next) {
	this.model('List').remove({ boardId: this._id }, next);
})

module.exports = mongoose.model('Board', BoardSchema)