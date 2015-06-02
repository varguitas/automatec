'use strict';

//Setting up route
angular.module('options').config(['$stateProvider',
	function($stateProvider) {
		// Options state routing
		$stateProvider.
		state('listOptions', {
			url: '/options',
			templateUrl: 'modules/options/views/list-options.client.view.html'
		}).
		state('createOption', {
			url: '/options/create',
			templateUrl: 'modules/options/views/create-option.client.view.html'
		}).
		state('viewOption', {
			url: '/options/:optionId',
			templateUrl: 'modules/options/views/view-option.client.view.html'
		}).
		state('editOption', {
			url: '/options/:optionId/edit',
			templateUrl: 'modules/options/views/edit-option.client.view.html'
		});
	}
]);