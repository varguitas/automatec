'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Evaluation Schema
 */
function dateValidator(value) {
  return this.startDate <= value;
}
 
var EvaluationSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Evaluation name',
		trim: true
	},
	description: {
		type: String,
		default: '',
	},
	questions: [
    	{
        	type: Schema.ObjectId,
        	require: true,
        	ref: 'Question'
    	}
    ],
    time: {
    	type: Number,
    	min: 1,
    	required: true,
    	default: 30
    },
    start_date: {
		type: Date,
		required: true
	},
	end_date: {
		type: Date,
		required: true,
		validate: [{ validator: dateValidator, msg: 'Start Date must be less than End Date' }]
	},
	time_method: {
		type: String,
		required: true,
		match: ['listed', 'single']
	},
	group: {
		type: Schema.ObjectId,
		ref: 'Group'
	},
	quiz_evaluation: [
    	{
        	type: Schema.ObjectId,
        	require: true,
        	ref: 'UserQuiz'
    	}
    ],
    options_qty: {
    	type: Number,
    	min: 1,
    	required: true,
    	default: 5
    },
    evaluation_state: {
    	type: String,
    	required: true,
    	match: ['pending', 'inprogress', 'finished']
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

mongoose.model('Evaluation', EvaluationSchema);