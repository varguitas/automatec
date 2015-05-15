'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Theme = mongoose.model('Theme'),
	_ = require('lodash');

/**
 * Create a Theme
 */
exports.create = function(req, res) {
	var theme = new Theme(req.body);
	theme.user = req.user;

	theme.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(theme);
		}
	});
};

/**
 * Show the current Theme
 */
exports.read = function(req, res) {
	res.jsonp(req.theme);
};

/**
 * Update a Theme
 */
exports.update = function(req, res) {
	var theme = req.theme ;

	theme = _.extend(theme , req.body);

	theme.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(theme);
		}
	});
};

/**
 * Delete an Theme
 */
exports.delete = function(req, res) {
	var theme = req.theme ;

	theme.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(theme);
		}
	});
};

/**
 * List of Themes
 */
exports.list = function(req, res) { 
	Theme.find().sort('-created').populate('user', 'displayName').exec(function(err, themes) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(themes);
		}
	});
};

/**
 * Theme middleware
 */
exports.themeByID = function(req, res, next, id) { 
	Theme.findById(id).populate('user', 'displayName').exec(function(err, theme) {
		if (err) return next(err);
		if (! theme) return next(new Error('Failed to load Theme ' + id));
		req.theme = theme ;
		next();
	});
};

/**
 * Theme authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.theme.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
