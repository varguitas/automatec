'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var courses = require('../../app/controllers/courses.server.controller');

	// Courses Routes
	app.route('/courses')
		.get(users.requiresLogin, users.hasAuthorization(['admin', 'teacher', 'user']), courses.list)
		.post(users.requiresLogin, users.hasAuthorization(['admin']), courses.create);

	app.route('/courses/:courseId')
		.get(users.requiresLogin, users.hasAuthorization(['admin', 'teacher', 'user']), courses.read)
		.put(users.requiresLogin, courses.hasAuthorization, users.hasAuthorization(['admin']), courses.update)
		.delete(users.requiresLogin, courses.hasAuthorization, users.hasAuthorization(['admin']), courses.delete);

	// Finish by binding the Course middleware
	app.param('courseId', courses.courseByID);
};
