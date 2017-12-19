var mongoose = require('mongoose');
var User = require('../models/user');
var session = require('express-session');


module.exports = {

	
	user: function(req, res){
		console.log(session.user_id)
		if (session.user_id){
			User.findOne({_id: session.user_id}, function(err, user){
				if (err) {
					console.log(err)
					console.log("trouble finding current user")
					return res.json({error:"unable to find user"})
				}
				else {
					return res.json({user: user})
				}
			});
		}
		else {
			return res.json({user: null})
		}	
	},


	users: function(req, res){
		User.find({_id: {$ne: session.user_id }}, function(err, users){
			if (err) {
				console.log(err)
				console.log("trouble finding users")
				return res.json({error:"unable to find users"})
			}
			else {
				return res.json({users: users})
			}
		});
	},


	login: function(req, res) {
		// console.log("arrived at login");
		console.log(req.body);
		var user = new User(req.body);
		user.save(function(err) {
			if (err) {
				console.log('trouble saving new user')
				return res.json({error:err.errors})
			}

			session.user_id = user._id
			console.log("User in session is: ", session.user_id)
			console.log('returning user: ', user)
			return res.json({user: user})
		});
	},

	logout: (req, res) => {
	        if ('user_id' in session) {
	            delete session['user_id'];
	            return res.json({status:"logged-out"})
	        }
	    }

	// 	show: function(req, res){
	// 	console.log("inside of show")
	// 	console.log("this req.params.id is: ", req.params.id)
	// 	Question.findOne({_id: req.params.id})
	// 		.populate('answers')
	// 		.exec(function(err, question){
	// 		if (err) {
	// 			console.log(err)
	// 			console.log("trouble finding question at show")
	// 			return res.json({error:err.errors})
	// 		}
	// 		else {
	// 			console.log("the question is:", question)
	// 			return res.json({question:question})
	// 		}
	// 	});
	// },	



}