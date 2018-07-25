const mongoose = require('mongoose');
const User = require('./user');
const List = require('./list');
const Activity = require('./activity');
const Schema = mongoose.Schema;

const CardSchema = new Schema({
	id: {
		type: String,
		required: true
	},
	listId: {
		type: String, 
		ref: 'List',
		required: true
	},
	title: {
		type: String,
	},
	description: {
		type: String,
	},
	position: Number,
	completed: {
		type: Boolean,
		default: false,
	},
	members: {
		type: Array,
		default: [],
		set: function(members) {
			this._previousMembers = this.members;
			return members
		}
	},
	activity: [{ type: String, ref: 'Activity' }],
	_previousMembers: []
})

CardSchema.pre('remove', function(next) {
	this.model('List').update({ cards: this.id }, { $pull: { cards: this.id } }, next)
});

CardSchema.pre('remove', function(next) {
	this.model('Activity').remove({ cardId: this.id }, next)
})

CardSchema.pre('save', function(next) {
	if(this.isNew)
		this.model('List').update({ id: this.listId }, { $push: { cards: this.id } }, next)
	else
		next();
});

CardSchema.pre('save', function(next) {
	
	let toAdd = diff(this.members, this._previousMembers)
	
	this.model('User').update({ id: { $in: toAdd } }, { multi: true }, { $addToSet: { pending: this.id } }, next)
})

CardSchema.pre('save', function(next) {

	let toDelete = diff(this._previousMembers, this.members)

	this.model('User').update({ id: { $in: toDelete } }, { multi: true }, { $pull: { cards: this.id } }, next)
})

function diff(a, b) {
	return a.filter(i => {
		return b.indexOf(i) === -1
	})
}

module.exports = mongoose.model('Card', CardSchema)




















