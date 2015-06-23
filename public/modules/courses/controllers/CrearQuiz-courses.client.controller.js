'use strict';

// Courses controller
angular.module('courses').controller('CrearQuiz', ['$scope', '$stateParams', '$location', 'Authentication', 'Courses',
	function($scope, $stateParams, $location, Authentication, Courses) {
		$scope.authentication = Authentication

	}
]);