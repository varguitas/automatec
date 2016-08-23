'use strict';

//User quizzes service used to communicate User quizzes REST endpoints
angular.module('user-quizzes').factory('UserQuizzes', ['$resource',
	function($resource) {
		return $resource('user-quizzes/:userQuizId', { userQuizId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);