'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var themes = require('../../app/controllers/themes.server.controller');

	// Themes Routes
	app.route('/themes')
		.get(themes.list)
		.post(users.requiresLogin, themes.create);

	app.route('/themes/:themeId')
		.get(themes.read)
		.put(users.requiresLogin, themes.hasAuthorization, themes.update)
		.delete(users.requiresLogin, themes.hasAuthorization, themes.delete);

	// Finish by binding the Theme middleware
	app.param('themeId', themes.themeByID);
};
