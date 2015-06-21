'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Question Schema 
 */
var QuestionSchema = new Schema({
    version_id: {
		type: Number,
		default: 0,
		required: 'Please fill Question version_id with positive value '
	},
    statement: {
		type: String,
		default: '',
		required: 'Please fill Question statement ',
		trim: true
	},
    value: {
		type: Number,
		default: 0
	},
    type: {
		type: String,
		default: '',
        required: 'Please fill Question type',
		trim: true
	},
    Options: [{
		type: Schema.ObjectId,
		require: true,
		ref: 'Option'
	}],
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

mongoose.model('Question', QuestionSchema);