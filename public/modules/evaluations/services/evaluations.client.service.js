'use strict';

//Evaluations service used to communicate Evaluations REST endpoints
angular.module('evaluations').factory('Evaluations', ['$resource',
	function($resource) {
		return $resource('evaluations/:evaluationId', { evaluationId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);