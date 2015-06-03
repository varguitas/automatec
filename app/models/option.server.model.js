'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Option Schema
 */
var OptionSchema = new Schema({
	option_text: {
		type: String,
		default: '',
		required: 'Please fill Option text',
		trim: true
	},
	is_correct: {
		type: Boolean,
		default: false,
		required: 'Please fill Option Is Correct?'
	},
	modified: {
		type: Date,
		default: Date.now
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Option', OptionSchema);