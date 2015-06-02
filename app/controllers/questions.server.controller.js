'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Question = mongoose.model('Question'),
	_ = require('lodash');

/**
 * Create a Question
 */
exports.create = function(req, res) {
	var question = new Question(req.body);
	question.user = req.user;

	question.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(question);
		}
	});
};

/**
 * Show the current Question
 */
exports.read = function(req, res) {
	res.jsonp(req.question);
};

/**
 * Update a Question
 */
exports.update = function(req, res) {
	var question = req.question ;

	question = _.extend(question , req.body);

	question.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(question);
		}
	});
};

/**
 * Delete an Question
 */
exports.delete = function(req, res) {
	var question = req.question ;

	question.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(question);
		}
	});
};

/**
 * List of Questions
 */
exports.list = function(req, res) { 
	Question.find().sort('-created').populate('user', 'displayName').exec(function(err, questions) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(questions);
		}
	});
};

/**
 * Question middleware
 */
exports.questionByID = function(req, res, next, id) { 
	Question.findById(id).populate('user', 'displayName').exec(function(err, question) {
		if (err) return next(err);
		if (! question) return next(new Error('Failed to load Question ' + id));
		req.question = question ;
		next();
	});
};

/**
 * Question authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.question.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};



/**
 * Question is teacher middleware
 */
exports.isTeacher = function(req, res, next) {
	console.log('---------------- 1');
	console.log(req.user.roles);
	if (req.user.roles.indexOf("admin") >-1) {
		next();
	}
	if (req.user.roles.indexOf("teacher")  === -1) {
		return res.status(403).send('User is not authorized: Is not a teacher. ');
	}
	next();
};
