'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var evaluations = require('../../app/controllers/evaluations.server.controller');

	// Evaluations Routes
	app.route('/evaluations')
		.get(users.requiresLogin, evaluations.hasAuthorization, users.hasAuthorization(['admin', 'teacher', 'user']), evaluations.list)
+		.post(users.requiresLogin, users.hasAuthorization(['admin', 'teacher']), evaluations.create);

	app.route('/evaluations/:evaluationId')
		..get(evaluations.hasAuthorization, users.hasAuthorization(['admin', 'teacher']), evaluations.read)
+		.put(users.requiresLogin, evaluations.hasAuthorization, users.hasAuthorization(['admin', 'teacher']), evaluations.update)
+		.delete(users.requiresLogin, evaluations.hasAuthorization, users.hasAuthorization(['admin', 'teacher']), evaluations.delete);

	// Finish by binding the Evaluation middleware
	app.param('evaluationId', evaluations.evaluationByID);
};
