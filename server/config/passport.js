const passport = require('passport'),  
      User = require('../models/user'),
      config = require('./main'),
      JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt,
      LocalStrategy = require('passport-local');

const localOptions = { usernameField: 'email' }

const localLogin = new LocalStrategy(localOptions, function(email, password, done) {

	User.findOne({ email: email }, function(err, user) {
		if(err) { return done(err); }
		if(!user) { return done(null, false, { error: 'Your login details could not be verified. Please try again.'})}

		user.comparePassword(password, function(err, isMatch) {
			if(err) { return done(err); }
			if(!isMatch) { return done(null, false, { error: 'Your login details could not be verified.'})}

			return done(null, user);
		})
	})
})

const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("Bearer"),
	secretOrKey: config.secret
}

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {

	User.findById(payload._id, function(err, user) {
		if(err) { 
			console.log(err)
			return done(err, false); }
		if(user) {
			console.log(user)
			done(null, user);
		} else {
			done(null, false);
		}
	})
	.catch(e => 
		console.log(e.stack)
		)
})

passport.use(jwtLogin);
passport.use(localLogin);