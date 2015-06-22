'use strict';

// User quizzes controller
angular.module('user-quizzes').controller('UserQuizzesController', ['$scope', '$stateParams', '$location', 'Authentication', 'UserQuizzes',
	function($scope, $stateParams, $location, Authentication, UserQuizzes) {
		$scope.authentication = Authentication;

		// Create new User quiz
		$scope.create = function() {
			// Create new User quiz object
			var userQuiz = new UserQuizzes ({
				name: this.name
			});

			// Redirect after save
			userQuiz.$save(function(response) {
				$location.path('user-quizzes/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing User quiz
		$scope.remove = function(userQuiz) {
			if ( userQuiz ) { 
				userQuiz.$remove();

				for (var i in $scope.userQuizzes) {
					if ($scope.userQuizzes [i] === userQuiz) {
						$scope.userQuizzes.splice(i, 1);
					}
				}
			} else {
				$scope.userQuiz.$remove(function() {
					$location.path('user-quizzes');
				});
			}
		};

		// Update existing User quiz
		$scope.update = function() {
			var userQuiz = $scope.userQuiz;

			userQuiz.$update(function() {
				$location.path('user-quizzes/' + userQuiz._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of User quizzes
		$scope.find = function() {
			$scope.userQuizzes = UserQuizzes.query();
		};

		// Find existing User quiz
		$scope.findOne = function() {
			$scope.userQuiz = UserQuizzes.get({ 
				userQuizId: $stateParams.userQuizId
			});
		};
	}
]);