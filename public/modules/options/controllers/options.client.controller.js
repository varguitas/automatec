'use strict';

// Options controller
angular.module('options').controller('OptionsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Options',
	function($scope, $stateParams, $location, Authentication, Options) {
		$scope.authentication = Authentication;

		// Create new Option
		$scope.create = function() {
			// Create new Option object
			var option = new Options ({
				name: this.name
			});

			// Redirect after save
			option.$save(function(response) {
				$location.path('options/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Option
		$scope.remove = function(option) {
			if ( option ) { 
				option.$remove();

				for (var i in $scope.options) {
					if ($scope.options [i] === option) {
						$scope.options.splice(i, 1);
					}
				}
			} else {
				$scope.option.$remove(function() {
					$location.path('options');
				});
			}
		};

		// Update existing Option
		$scope.update = function() {
			var option = $scope.option;

			option.$update(function() {
				$location.path('options/' + option._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Options
		$scope.find = function() {
			$scope.options = Options.query();
		};

		// Find existing Option
		$scope.findOne = function() {
			$scope.option = Options.get({ 
				optionId: $stateParams.optionId
			});
		};
	}
]);