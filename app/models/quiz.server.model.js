'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var Question = mongoose.model('Question');

/**
 * Quiz Schema
 */
var QuizSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Quiz name',
		trim: true
	},
	description: {
		type: String,
		default: '',
		trim: true
	},
	questions: [{
		type: Schema.ObjectId,
		require: true,
		ref: "Question"
	}],
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Quiz', QuizSchema);