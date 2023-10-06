const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Admin = require('../models/admins');
var bcrypt = require('bcrypt');


passport.use(new LocalStrategy({usernameField: 'email',passReqToCallback: true},function (req, email, password, done) {
		
		Admin.findOne({ email: email }).then((user) => {
			
			if (!user) { return done(null, false,{message:"Incorrect username"}) }
			
			if (!bcrypt.compareSync(password,user.password)) {
				return done(null, false,{message:"Incorrect password"});
			}
			console.log("user",user)
			return done(null, user);
		}).catch((err) => {
			return done(err);
		})
	}
));

passport.serializeUser((user, done) => {
	if (user) {
		return done(null, user.id);
	}
	return done(null, false);
});

passport.deserializeUser(function (id, done) {

	Admin.findById({ _id: id }).then((user) => {
		return done(null, user);
	}).catch((err) => {
		return done(err);
	})

});


passport.isAuthenticated = (req, res, done) => {
	if (req.user) {
		return done()
	}
	// return res.redirect('/login');
	return res.json({
		message: "It will redirect to the login page"
	})
}
module.exports = passport;