'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Evaluation Schema
 */
var EvaluationSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Evaluation name',
		trim: true
	},
+		description: {
+		type: String,
+		default: ''
+	},
	questions: [
    	{
        	type: Schema.ObjectId,
        	require: true,
        	ref: 'Question'
    	}
    ],
	time: {
		type: Number,
		default: 0
	},
	start_date: {
		type: Number,
		default: 0
	},
	end_date: {
		type: Number,
		default: 0
	},
	time_method: {
+		type: String,
+		default: ''
+	},
	group: [
    	{
        	type: Schema.ObjectId,
        	require: true,
        	ref: 'Group'
    	}
    ],
    quiz_evaluation: [
    	{
        	type: Schema.ObjectId,
        	require: true,
        	ref: 'UserQuiz'
    	}
    ],
+	timeout: {
+		type: String,
+		default: ''
+	},
	options_qty: {
		type: Number,
		default: 0
	},
	evalution_state:{
+		type: String,
+		default: ''
+	},
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