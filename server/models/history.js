const mongoose = require('mongoose');
const Card = require('./card');
const Schema = mongoose.Schema;

const HistorySchema = new Schema({
	cardId: {
		type: String,
		required: true
	},
	changes: [{ username: String, title: String, description: String, completed: String, members: String }]
})

module.exports = mongoose.model('History', HistorySchema)
