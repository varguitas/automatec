'use strict';

//Questions service used to communicate Questions REST endpoints
angular.module('questions').factory('Questions', ['$resource',
	function($resource) {
		return $resource('questions/:questionId', { questionId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);