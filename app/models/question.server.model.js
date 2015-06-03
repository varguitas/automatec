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
		type: int,
		default: 0,
		required: 'Please fill Question version_id'
	},
	statement: {
		type: String,
		default: '',
		required: 'Please fill Question statement',
		trim: true
	},
	value: {
		type: int,
		required: 'Please fill Question value'
	},
	options: [
    {
      list: {
        type: Schema.OptionSchema,
        require: true,
        ref: "List"
      },
      allocations: [
        {
          type: Number,
          required: true
        }
      ]
    },
	type: {
		type: String,
		default: '',
		required: 'Please fill Question type',
		trim: true
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

mongoose.model('Question', QuestionSchema);