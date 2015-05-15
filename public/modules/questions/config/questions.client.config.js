'use strict';

// Configuring the Articles module
angular.module('questions').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Questions', 'questions', 'dropdown', '/questions(/create)?');
		Menus.addSubMenuItem('topbar', 'questions', 'List Questions', 'questions');
		Menus.addSubMenuItem('topbar', 'questions', 'New Question', 'questions/create');
	}
]);