'use strict';

//Setting up route
angular.module('user-quizzes').config(['$stateProvider',
	function($stateProvider) {
		// User quizzes state routing
		$stateProvider.
		state('listUserQuizzes', {
			url: '/user-quizzes',
			templateUrl: 'modules/user-quizzes/views/list-user-quizzes.client.view.html'
		}).
		state('createUserQuiz', {
			url: '/user-quizzes/create',
			templateUrl: 'modules/user-quizzes/views/create-user-quiz.client.view.html'
		}).
		state('viewUserQuiz', {
			url: '/user-quizzes/:userQuizId',
			templateUrl: 'modules/user-quizzes/views/view-user-quiz.client.view.html'
		}).
		state('editUserQuiz', {
			url: '/user-quizzes/:userQuizId/edit',
			templateUrl: 'modules/user-quizzes/views/edit-user-quiz.client.view.html'
		});
	}
]);