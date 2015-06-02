'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var options = require('../../app/controllers/options.server.controller');

	// Options Routes
	app.route('/options')
		.get(users.requiresLogin, users.hasAuthorization(['user','admin']), options.list)
		.post(users.requiresLogin, users.hasAuthorization(['user','admin']), options.create);

	app.route('/options/:optionId')
		.get(users.requiresLogin, users.hasAuthorization(['user','admin']), options.read)
		.put(users.requiresLogin, users.hasAuthorization(['user','admin']), options.hasAuthorization, options.update)
		.delete(users.requiresLogin, users.hasAuthorization(['user','admin']), options.hasAuthorization, options.delete);

	// Finish by binding the Option middleware
	app.param('optionId', options.optionByID);
};
