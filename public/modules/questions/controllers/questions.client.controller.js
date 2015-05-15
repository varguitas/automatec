'use strict';

// Questions controller
angular.module('questions').controller('QuestionsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Questions',
	function($scope, $stateParams, $location, Authentication, Questions) {
		$scope.authentication = Authentication;

		// Create new Question
		$scope.create = function() {
			// Create new Question object
			var question = new Questions ({
				name: this.name
			});

			// Redirect after save
			question.$save(function(response) {
				$location.path('questions/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Question
		$scope.remove = function(question) {
			if ( question ) { 
				question.$remove();

				for (var i in $scope.questions) {
					if ($scope.questions [i] === question) {
						$scope.questions.splice(i, 1);
					}
				}
			} else {
				$scope.question.$remove(function() {
					$location.path('questions');
				});
			}
		};

		// Update existing Question
		$scope.update = function() {
			var question = $scope.question;

			question.$update(function() {
				$location.path('questions/' + question._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Questions
		$scope.find = function() {
			$scope.questions = Questions.query();
		};

		// Find existing Question
		$scope.findOne = function() {
			$scope.question = Questions.get({ 
				questionId: $stateParams.questionId
			});
		};
	}
]);