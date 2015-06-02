'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var questions = require('../../app/controllers/questions.server.controller');

	// Questions Routes
	app.route('/questions')
		.get(users.requiresLogin, users.hasAuthorization(['teacher','admin']), questions.list)
		.post(users.requiresLogin, users.hasAuthorization(['teacher','admin']), questions.create);

	app.route('/questions/:questionId')
		.get(users.requiresLogin, users.hasAuthorization(['teacher','admin']), questions.read)
		.put(users.requiresLogin, users.hasAuthorization(['teacher','admin']), questions.hasAuthorization, questions.update)
		.delete(users.requiresLogin, questions.isTeacher, questions.hasAuthorization, questions.delete);

	// Finish by binding the Question middleware
	app.param('questionId', questions.questionByID);
};
