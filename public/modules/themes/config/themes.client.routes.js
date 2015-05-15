'use strict';

//Setting up route
angular.module('themes').config(['$stateProvider',
	function($stateProvider) {
		// Themes state routing
		$stateProvider.
		state('listThemes', {
			url: '/themes',
			templateUrl: 'modules/themes/views/list-themes.client.view.html'
		}).
		state('createTheme', {
			url: '/themes/create',
			templateUrl: 'modules/themes/views/create-theme.client.view.html'
		}).
		state('viewTheme', {
			url: '/themes/:themeId',
			templateUrl: 'modules/themes/views/view-theme.client.view.html'
		}).
		state('editTheme', {
			url: '/themes/:themeId/edit',
			templateUrl: 'modules/themes/views/edit-theme.client.view.html'
		});
	}
]);