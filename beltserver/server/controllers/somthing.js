
	// update: function(req, res){
	// 	console.log("arrived at answer update")
	// 	console.log("answer id is: ", req.body)
	// 	Answer.update({_id: req.body.id}, {$inc: {likes: 1}}, function(err){
	// 		if (err){
	// 			console.log('error updating likes count')
	// 			return res.json({error: err.errors})
	// 		}
	// 		return res.json({status: "like count updated"})
	// 	})

	// },



	// show: function(req, res){
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
