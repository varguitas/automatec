'use strict';

//Setting up route
angular.module('questions').config(['$stateProvider',
	function($stateProvider) {
		// Questions state routing
		$stateProvider.
		state('listQuestions', {
			url: '/questions',
			templateUrl: 'modules/questions/views/list-questions.client.view.html'
		}).
		state('createQuestion', {
			url: '/questions/create',
			templateUrl: 'modules/questions/views/create-question.client.view.html'
		}).
		state('viewQuestion', {
			url: '/questions/:questionId',
			templateUrl: 'modules/questions/views/view-question.client.view.html'
		}).
		state('editQuestion', {
			url: '/questions/:questionId/edit',
			templateUrl: 'modules/questions/views/edit-question.client.view.html'
		});
	}
]);