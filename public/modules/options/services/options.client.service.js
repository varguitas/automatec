'use strict';

//Options service used to communicate Options REST endpoints
angular.module('options').factory('Options', ['$resource',
	function($resource) {
		return $resource('options/:optionId', { optionId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);