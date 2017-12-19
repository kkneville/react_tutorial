var mongoose = require('mongoose');
var User = require('./user');
var UserSchema = require('./user');

var ItemSchema = new mongoose.Schema({

	title: {
		type: String,
		required: [true, 'Required'],
		minlength: 5
	},

	desc: {
		type: String,
		required: [true, 'Required'],
		minlength: 10
	},

	user: {
		type: String
	},

	status: {
		type: Boolean,
		default: false
	},

	_tags: [{
		type: mongoose.Schema.Types.ObjectId, ref: "User"
	}],


}, {timestamps: true});

module.exports = mongoose.model('Item', ItemSchema)