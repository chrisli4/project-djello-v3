const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const User = require('./user');
const Card = require('./card');

const TeamSchema = new Schema({
	userId: {
		type: String,
		ref: 'User',
		required: true,
		unique: true
	},
	team: [{ type: String, ref: 'User' }],
	teamSend: [{ type: String, ref: 'User' }],
	teamReceived: [{ type: String, ref: 'User' }]
},
{
	timestamps: true
});

module.exports = mongoose.model('Team', TeamSchema);