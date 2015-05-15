'use strict';

// Configuring the Articles module
angular.module('evaluations').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Evaluations', 'evaluations', 'dropdown', '/evaluations(/create)?');
		Menus.addSubMenuItem('topbar', 'evaluations', 'List Evaluations', 'evaluations');
		Menus.addSubMenuItem('topbar', 'evaluations', 'New Evaluation', 'evaluations/create');
	}
]);