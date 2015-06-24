'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var groups = require('../../app/controllers/groups.server.controller');

	// Groups Routes
	app.route('/groups')
		.get(users.requiresLogin, groups.hasAuthorization, users.hasAuthorization(['admin', 'teacher', 'user']), groups.list)
		.post(users.requiresLogin, users.hasAuthorization(['admin', 'teacher']), groups.create);

	app.route('/groups/:groupId')
		.get(groups.hasAuthorization, users.hasAuthorization(['admin', 'teacher']), groups.read)
		.put(users.requiresLogin, groups.hasAuthorization, users.hasAuthorization(['admin', 'teacher']), groups.update)
		.delete(users.requiresLogin, groups.hasAuthorization, users.hasAuthorization(['admin', 'teacher']), groups.delete);

	// Finish by binding the Group middleware
	app.param('groupId', groups.groupByID);
};
