'use strict';

// Configuring the Articles module
angular.module('user-quizzes').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'User quizzes', 'user-quizzes', 'dropdown', '/user-quizzes(/create)?');
		Menus.addSubMenuItem('topbar', 'user-quizzes', 'List User quizzes', 'user-quizzes');
		Menus.addSubMenuItem('topbar', 'user-quizzes', 'New User quiz', 'user-quizzes/create');
	}
]);