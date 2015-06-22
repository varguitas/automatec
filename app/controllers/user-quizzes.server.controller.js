'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	UserQuiz = mongoose.model('UserQuiz'),
	_ = require('lodash');

/**
 * Create a User quiz
 */
exports.create = function(req, res) {
	var userQuiz = new UserQuiz(req.body);
	userQuiz.user = req.user;

	userQuiz.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(userQuiz);
		}
	});
};

/**
 * Show the current User quiz
 */
exports.read = function(req, res) {
	res.jsonp(req.userQuiz);
};

/**
 * Update a User quiz
 */
exports.update = function(req, res) {
	var userQuiz = req.userQuiz ;

	userQuiz = _.extend(userQuiz , req.body);

	userQuiz.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(userQuiz);
		}
	});
};

/**
 * Delete an User quiz
 */
exports.delete = function(req, res) {
	var userQuiz = req.userQuiz ;

	userQuiz.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(userQuiz);
		}
	});
};

/**
 * List of User quizzes
 */
exports.list = function(req, res) { 
	UserQuiz.find().sort('-created').populate('user', 'displayName').exec(function(err, userQuizzes) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(userQuizzes);
		}
	});
};

/**
 * User quiz middleware
 */
exports.userQuizByID = function(req, res, next, id) { 
	UserQuiz.findById(id).populate('user', 'displayName').exec(function(err, userQuiz) {
		if (err) return next(err);
		if (! userQuiz) return next(new Error('Failed to load User quiz ' + id));
		req.userQuiz = userQuiz ;
		next();
	});
};

/**
 * User quiz authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.userQuiz.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
