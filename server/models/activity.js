const mongoose = require('mongoose');
const Card = require('./card');
const Schema = mongoose.Schema;

const ActivitySchema = new Schema({
	id: {
		type: String,
		required: true
	},
	cardId: {
		type: String, 
		ref: 'Card',
		required: true
	},
	userId: {
		type: String,
		ref: 'user',
		required: true
	},
	timestamp: {
		type: String,
		required: true
	},
	changes: []
})

ActivitySchema.pre('save', function(next) {
	if(this.isNew)
		this.model('Card').update({ id: this.cardId }, { $push: { activity: this.id } }, next)
	else
		next();
});

module.exports = mongoose.model('Activity', ActivitySchema)
