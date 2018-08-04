const mongoose = require('mongoose');
const User = require('./user');
const List = require('./list');
const Schema = mongoose.Schema;

const CardSchema = new Schema({
	_id: {
		type: String,
		required: true
	},
	userId: {
		type: String,
		ref: 'User',
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
	_previousMembers: []
})

CardSchema.pre('remove', function(next) {
	this.model('List').update({ cards: this._id }, { $pull: { cards: this._id } }, next)
});

CardSchema.pre('save', function(next) {
	if(this.isNew)
		this.model('List').update({ _id: this.listId }, { $push: { cards: this._id } }, next)
	else
		next();
});

/*
CardSchema.pre('remove', function(next) {
	this.model('Activity').remove({ cardId: this._id }, next)
})

CardSchema.pre('save', function(next) {
	
	let toAdd = diff(this.members, this._previousMembers)
		
	this.model('User').update({ _id: { $in: toAdd } }, { multi: true }, { $addToSet: { pending: this._id } }, next)
})

CardSchema.pre('save', function(next) {

	let toDelete = diff(this._previousMembers, this.members)

	this.model('User').update({ _id: { $in: toDelete } }, { multi: true }, { $pull: { cards: this._id } }, next)
})

function diff(a, b) {
	return a.filter(i => {
		return b.indexOf(i) === -1
	})
}
*/

module.exports = mongoose.model('Card', CardSchema)


