const jwt = require('jsonwebtoken'),  
      crypto = require('crypto'),
      User = require('../models/user'),
      config = require('../config/main'),
      shortid = require('shortid'),
      ExtractJwt = require('passport-jwt').ExtractJwt;

function generateToken(user) {
	return jwt.sign(user, config.secret, {
		expiresIn: 100800
	})
};


function setUserInfo(request) {
	return {
		_id: request._id,
		username: request.username,
		firstName: request.firstName,
		lastName: request.lastName,
		email: request.email,
	}
}

exports.login = function(req, res, next) {
	let userInfo = setUserInfo(req.user);

	res.status(200).json({
		token: 'JWT ' + generateToken(userInfo),
		user: userInfo
	})
}

exports.register = function(req, res, next) {
	
	const username = req.body.username;
	const email = req.body.email;
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const password = req.body.password;

	// return error if no username provided
	if(!username) {
		return res.status(422).send({ error: 'You must enter an username.'});
	}

	if(!email) {
		return res.status(422).send({ error: 'You must enter an email address.'});
	}

	// return error if no full name provided
	if(!firstName || !lastName) {
		return res.status(422).send({ error: 'You must enter your full name.'});
	}

	if(!password) {
		return res.status(422).send({ error: 'You must enter a password.'});
	}

	User.findOne({$or: [{email: email}, {username: username}]}, function(err, exisitingUser) {
		if(err) { return next(err); }

		if(exisitingUser) {
			return res.status(422).send({ error: 'That email and/or username is already taken.'})
		}

		let user = new User({
			_id: shortid.generate(),
			username: username,
			email: email,
			password: password,
			firstName: firstName, 
			lastName: lastName
		})

		user.save(function(err, user) {
			if(err) { return next(err); }

			let userInfo = setUserInfo(user);

			res.status(200).json({
				token: 'JWT ' + generateToken(userInfo),
				user: userInfo
			})
		})
	})
}