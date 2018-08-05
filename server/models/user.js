const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const Card = require('./card');
const Team = require('./team');

const UserSchema = new Schema({
	_id: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		lowercase: true,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	profile: {
		firstName: { type: String },
		lastName: { type: String }
	},
	token: {
		type: String,
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

UserSchema.pre('save', function(next) {
	if(this.isNew)
		this.model('Team').create({ userId: this.username }, next)
	else
		next();
});

module.exports = mongoose.model('User', UserSchema);