const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const Card = require('./card');

const UserSchema = new Schema({
	username: {
		type: String,
		lowercase: true,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		lowercase: true,
		unique: true,
		required: true
	},
	firstName: {
		type: String
	},
	lastName: {
		type: String
	},
	password: {
		type: String,
		required: true
	},
	token: {
		type: String
	},
	resetPasswordToken: { type: String },
	resetPasswordExpires: { type: Date }
},
{
	timestamps: true
});

UserSchema.pre('save', function(next) {
	const user = this,
	SALT_FACTOR = 5;

	if (!user.isModified('password')) return next();

	bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
		if(err) return next(err);

		bcrypt.hash(user.password, salt, null, function(err, hash) {
			if(err) return next(err);
			user.password = hash;
			next();
		});
	});
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		if(err) { return cb(err); }
		cb(null, isMatch)
	});
}

module.exports = mongoose.model('User', UserSchema);