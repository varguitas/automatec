'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var questions = require('../../app/controllers/questions.server.controller');

	// Questions Routes
	app.route('/questions')
		.get(users.requiresLogin, questions.isTeacher, questions.list)
		.post(users.requiresLogin, questions.isTeacher, questions.create);

	app.route('/questions/:questionId')
		.get(users.requiresLogin, questions.isTeacher, questions.read)
		.put(users.requiresLogin, questions.isTeacher, questions.hasAuthorization, questions.update)
		.delete(users.requiresLogin, questions.isTeacher, questions.hasAuthorization, questions.delete);

	// Finish by binding the Question middleware
	app.param('questionId', questions.questionByID);
};
