'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var quizzes = require('../../app/controllers/quizzes.server.controller');

	// Quizzes Routes
	app.route('/quizzes')
        .get(users.requiresLogin, users.hasAuthorization(['user','admin']), quizzes.list)
		.post(users.requiresLogin, users.hasAuthorization(['user','admin']), quizzes.create);

	app.route('/quizzes/:quizId')
        .get(users.requiresLogin, users.hasAuthorization(['user','admin']), quizzes.read)
		.put(users.requiresLogin, users.hasAuthorization(['user','admin']), quizzes.hasAuthorization, quizzes.update)
		.delete(users.requiresLogin, users.hasAuthorization(['user','admin']), quizzes.hasAuthorization, quizzes.delete);

    
	// Finish by binding the Quiz middleware
	app.param('quizId', quizzes.quizByID);
};
