'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var subjects = require('../../app/controllers/subjects.server.controller');

	// Subjects Routes
	app.route('/subjects')
		.get(users.requiresLogin, users.hasAuthorization(['admin', 'teacher']), subjects.list)
		.post(users.requiresLogin, users.hasAuthorization(['admin', 'teacher']), subjects.create);

	app.route('/subjects/:subjectId')
		.get(users.requiresLogin, users.hasAuthorization(['admin', 'teacher']), subjects.read)
		.put(users.requiresLogin, subjects.hasAuthorization, users.hasAuthorization(['admin', 'teacher']), subjects.update)
		.delete(users.requiresLogin, subjects.hasAuthorization, users.hasAuthorization(['admin']), subjects.delete);

	// Finish by binding the Subject middleware
	app.param('subjectId', subjects.subjectByID);
};
