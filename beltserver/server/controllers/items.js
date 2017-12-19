var mongoose = require('mongoose');
var User = require('../models/user');
var Item = require('../models/item');
var session = require('express-session');


module.exports = {

	// index: function(req, res){
	// 	console.log("inside of index")
	// 	Item.find({}, function(err, items){
	// 		if (err) {
	// 			console.log(err)
	// 			console.log("trouble finding items at index")
	// 			return res.json({error:err.errors})
	// 		}
	// 		else {
	// 			console.log("yo, here are your items:", items)
	// 			return res.json({items:items})
	// 		}
	// 	});
	// },	


	index: function(req, res){
		console.log("inside of index")
		User.findOne({_id: req.body.id})
			.populate('_items')
			.exec(function(err, user){
			if (err) {
				console.log(err)
				console.log("trouble finding user at index")
				return res.json({error:err.errors})
			}
			else {
				console.log("yo, here are your items:", user._items)
				return res.json({user: user})
			}
		});
	},	



	create: function(req, res){
		console.log("Arrived at item/create")	
		User.findOne({_id: session.user_id }, function(err, user){
			if (err){
				console.log('error finding user at items.create')
				return res.json({error: err.errors})
			}
			console.log("found user")
			var item = new Item(req.body);
			item._tags.push(user._id);
			item.user = user.name
			console.log(item)
			item.save(function(err){
				if (err){
					console.log('error saving item')
					return res.json({error: err.errors})
				}
				console.log("user saved to item")
				user._items.push(item._id);
				user.save(function(err){
					if (err){
						console.log('error saving user with new item')
						return res.json({error: err.errors})
					}
					console.log("first user:", user)	
					console.log("item saved to first user")	
					
					if (req.body.tag) {

						User.findOne({_id: req.body.tag}, function(err, user2){
							if (err){
								console.log('error finding second user at items.create')
								return res.json({error: err.errors})
							}
							console.log("found second user")
							item._tags.push(user2._id);
							console.log(item)
							item.save(function(err){
								if (err){
									console.log('error saving item with second user')
									return res.json({error: err.errors})
								}
								console.log("user saved to item")
								user2._items.push(item._id);
								user2.save(function(err){
									if (err){
										console.log('error saving second user with item')
										return res.json({error: err.errors})
									}
									console.log("second user:", user2)	
									console.log("item saved to second user")
									return res.json({status:"success - saved to current user and tag"})
								})		
							})

						})
					}
					else {
						return res.json({status:"success - saved to current user "})
					}	
				})
			})
		})
	},


// 	update: function(req, res){
// 		Item.findOne({_id: req.body.id}, function(err, item){
// 			if(err){
// 				console.log('error finding item')
// 			}
// 			else {
// 				if (item.status == true){
// 					item.status = false
// 					item.save(function(err){
// 							if (err){
// 								return res.json({error: err.errors})
// 							}
// 							else {
// 								return res.json({status:"success - saved to current user and tag"})	
// 							}	
// 				})
// 				item.status = true
// 					item.save(function(err){
// 							if (err){
// 								return res.json({error: err.errors})
// 							}
// 							else {
// 								return res.json({status:"success - saved to current user and tag"})	
// 							}	
// 				})
// 			}
// 		}
// 	})
// }	 		



