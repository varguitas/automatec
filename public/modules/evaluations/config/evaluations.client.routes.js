'use strict';

//Setting up route
angular.module('evaluations').config(['$stateProvider',
	function($stateProvider) {
		// Evaluations state routing
		$stateProvider.
		state('listEvaluations', {
			url: '/evaluations',
			templateUrl: 'modules/evaluations/views/list-evaluations.client.view.html'
		}).
		state('createEvaluation', {
			url: '/evaluations/create',
			templateUrl: 'modules/evaluations/views/create-evaluation.client.view.html'
		}).
		state('viewEvaluation', {
			url: '/evaluations/:evaluationId',
			templateUrl: 'modules/evaluations/views/view-evaluation.client.view.html'
		}).
		state('editEvaluation', {
			url: '/evaluations/:evaluationId/edit',
			templateUrl: 'modules/evaluations/views/edit-evaluation.client.view.html'
		});
	}
]);