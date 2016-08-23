'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var userQuizzes = require('../../app/controllers/user-quizzes.server.controller');

	// User quizzes Routes
	app.route('/user-quizzes')
		.get(users.requiresLogin, users.hasAuthorization(['admin', 'teacher']), userQuizzes.list)
		.post(users.requiresLogin, users.hasAuthorization(['admin', 'teacher', 'user']), userQuizzes.create);

	app.route('/user-quizzes/:userQuizId')
		.get(users.hasAuthorization(['admin', 'teacher', 'user']), userQuizzes.read)
		.put(users.requiresLogin, userQuizzes.hasAuthorization, users.hasAuthorization(['admin', 'user']), userQuizzes.update)
		.delete(users.requiresLogin, userQuizzes.hasAuthorization, userQuizzes.delete);

	// Finish by binding the User quiz middleware
	app.param('userQuizId', userQuizzes.userQuizByID);
};
