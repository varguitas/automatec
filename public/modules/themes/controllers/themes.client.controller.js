'use strict';

// Themes controller
angular.module('themes').controller('ThemesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Themes',
	function($scope, $stateParams, $location, Authentication, Themes) {
		$scope.authentication = Authentication;

		// Create new Theme
		$scope.create = function() {
			// Create new Theme object
			var theme = new Themes ({
				name: this.name
			});

			// Redirect after save
			theme.$save(function(response) {
				$location.path('themes/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Theme
		$scope.remove = function(theme) {
			if ( theme ) { 
				theme.$remove();

				for (var i in $scope.themes) {
					if ($scope.themes [i] === theme) {
						$scope.themes.splice(i, 1);
					}
				}
			} else {
				$scope.theme.$remove(function() {
					$location.path('themes');
				});
			}
		};

		// Update existing Theme
		$scope.update = function() {
			var theme = $scope.theme;

			theme.$update(function() {
				$location.path('themes/' + theme._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Themes
		$scope.find = function() {
			$scope.themes = Themes.query();
		};

		// Find existing Theme
		$scope.findOne = function() {
			$scope.theme = Themes.get({ 
				themeId: $stateParams.themeId
			});
		};
	}
]);