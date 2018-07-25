const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const User = require('./user');
const Card = require('./card');

const TeamSchema = new Schema({
	userId: {
		type: String,
		ref: 'User',
		required: true
	},
	team: [{ type: String, ref: 'User' }],
	teamRequests: [{ type: String, ref: 'User' }],
	teamInvites: [{ type: String, ref: 'User' }],
	cards: [{ type: String, ref: 'Card' }],
},
{
	timestamps: true
});

module.exports = mongoose.model('Team', TeamSchema);