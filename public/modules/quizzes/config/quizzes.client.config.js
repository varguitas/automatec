'use strict';

// Configuring the Articles module
angular.module('quizzes').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Quizzes', 'quizzes', 'dropdown', '/quizzes(/crearQuiz)?');
		Menus.addSubMenuItem('topbar', 'quizzes', 'List Quizzes', 'quizzes');
		Menus.addSubMenuItem('topbar', 'quizzes', 'Crear Quiz', 'crearQuiz');
	}
]);