'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Option = mongoose.model('Option'),
	_ = require('lodash');

/**
 * Create a Option
 */
exports.create = function(req, res) {
	var option = new Option(req.body);
	option.user = req.user;

	option.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(option);
		}
	});
};

/**
 * Show the current Option
 */
exports.read = function(req, res) {
	res.jsonp(req.option);
};

/**
 * Update a Option
 */
exports.update = function(req, res) {
	var option = req.option ;

	option = _.extend(option , req.body);

	option.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(option);
		}
	});
};

/**
 * Delete an Option
 */
exports.delete = function(req, res) {
	var option = req.option ;

	option.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(option);
		}
	});
};

/**
 * List of Options
 */
exports.list = function(req, res) { 
	Option.find().sort('-created').populate('user', 'displayName').exec(function(err, options) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(options);
		}
	});
};

/**
 * Option middleware
 */
exports.optionByID = function(req, res, next, id) { 
	Option.findById(id).populate('user', 'displayName').exec(function(err, option) {
		if (err) return next(err);
		if (! option) return next(new Error('Failed to load Option ' + id));
		req.option = option ;
		next();
	});
};

/**
 * Option authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.option.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
