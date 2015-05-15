'use strict';

// Configuring the Articles module
angular.module('themes').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Themes', 'themes', 'dropdown', '/themes(/create)?');
		Menus.addSubMenuItem('topbar', 'themes', 'List Themes', 'themes');
		Menus.addSubMenuItem('topbar', 'themes', 'New Theme', 'themes/create');
	}
]);