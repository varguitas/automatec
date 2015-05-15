'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var evaluations = require('../../app/controllers/evaluations.server.controller');

	// Evaluations Routes
	app.route('/evaluations')
		.get(evaluations.list)
		.post(users.requiresLogin, evaluations.create);

	app.route('/evaluations/:evaluationId')
		.get(evaluations.read)
		.put(users.requiresLogin, evaluations.hasAuthorization, evaluations.update)
		.delete(users.requiresLogin, evaluations.hasAuthorization, evaluations.delete);

	// Finish by binding the Evaluation middleware
	app.param('evaluationId', evaluations.evaluationByID);
};
