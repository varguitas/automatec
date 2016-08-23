'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Subject Schema
 */
var SubjectSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Subject name',
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

mongoose.model('Subject', SubjectSchema);