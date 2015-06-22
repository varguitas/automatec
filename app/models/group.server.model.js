'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Group Schema
 */
var GroupSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Group name',
		trim: true
	},
		description: {
		type: String,
		default: ''
	},
	period: {
		type: String,
		default: ''
	},
	students: [{
		user: {
			type: Schema.ObjectId,
			require: true,
			ref: 'User'
		},
		state: {
			type: String,
			default: ''
		}
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

mongoose.model('Group', GroupSchema);