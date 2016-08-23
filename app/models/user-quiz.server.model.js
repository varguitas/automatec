'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

function dateValidator (value) {
    return this.start_date <= this.end_date;
}

function solveDateValidator (value) {
    return this.solve_start_date <= this.solve_end_date;
}
/**
 * User quiz Schema
 */
var UserQuizSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill User quiz name',
		trim: true
	},
	description: {
		type: String,
		default: ''
	},
	questions: [
		{
			statement: String,
			value: Number,
			type: String,
			options: [{
				text: String,
				is_correct: Boolean,
				user_check_this: Boolean
			}]
		}
    ],
    time: {
    	type: Number,
    	required: true,
    	min: 1
    },
    start_date: {
		type: Date,
		required: true
	},
	end_date: {
		type: Date,
		required: true
	},
	time_method: {
		type: String,
		required: true,
		match: ['listed', 'single']
	},
	points: {
    	type: Number,
    	required: true,
    	min: 1
    },
   	student: {
		type: Schema.ObjectId,
		ref: 'User',
		required: true
	},
	solve_start_date: {
		type: Date,
		required: true
	},
	solve_end_date: {
		type: Date,
		required: true
	},
	send_email: {
		type: Boolean,
		required: true
	},
	grade: {
		type: Number,
		required: true
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
	},
	validate_dates: [
		dateValidator, 
		'Fecha de inicio debe ser menor que la fecha de fin'
	],
	validate_solve_dates: [
		solveDateValidator,
		'Fecha de inicio para resolver el quiz debe ser menor que la fecha de finalización del mismo'
	]
});

mongoose.model('UserQuiz', UserQuizSchema);