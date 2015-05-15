'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Evaluation = mongoose.model('Evaluation'),
	_ = require('lodash');

/**
 * Create a Evaluation
 */
exports.create = function(req, res) {
	var evaluation = new Evaluation(req.body);
	evaluation.user = req.user;

	evaluation.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(evaluation);
		}
	});
};

/**
 * Show the current Evaluation
 */
exports.read = function(req, res) {
	res.jsonp(req.evaluation);
};

/**
 * Update a Evaluation
 */
exports.update = function(req, res) {
	var evaluation = req.evaluation ;

	evaluation = _.extend(evaluation , req.body);

	evaluation.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(evaluation);
		}
	});
};

/**
 * Delete an Evaluation
 */
exports.delete = function(req, res) {
	var evaluation = req.evaluation ;

	evaluation.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(evaluation);
		}
	});
};

/**
 * List of Evaluations
 */
exports.list = function(req, res) { 
	Evaluation.find().sort('-created').populate('user', 'displayName').exec(function(err, evaluations) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(evaluations);
		}
	});
};

/**
 * Evaluation middleware
 */
exports.evaluationByID = function(req, res, next, id) { 
	Evaluation.findById(id).populate('user', 'displayName').exec(function(err, evaluation) {
		if (err) return next(err);
		if (! evaluation) return next(new Error('Failed to load Evaluation ' + id));
		req.evaluation = evaluation ;
		next();
	});
};

/**
 * Evaluation authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.evaluation.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
