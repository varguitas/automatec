'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Course Schema
 */
var CourseSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Course name',
		trim: true
	},
	description: {
		type: String,
		default: '',
	},
	quizzes: [
  	{
    	type: Schema.ObjectId,
    	require: true,
    	ref: "Quiz"
  	}  
  ],
  groups: [
    {
      type: Schema.ObjectId,
      require: true,
      ref: "Group"
    }  
  ],
  subjects: [
    {
      type: Schema.ObjectId,
      require: true,
      ref: "Subject"
    }  
  ],
  evaluations: [
    {
      type: Schema.ObjectId,
      require: true,
      ref: "Evaluation"
    }  
  ],
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Course', CourseSchema);