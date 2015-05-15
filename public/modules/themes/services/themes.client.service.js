'use strict';

//Themes service used to communicate Themes REST endpoints
angular.module('themes').factory('Themes', ['$resource',
	function($resource) {
		return $resource('themes/:themeId', { themeId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);