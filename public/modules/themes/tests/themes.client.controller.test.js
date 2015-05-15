'use strict';

(function() {
	// Themes Controller Spec
	describe('Themes Controller Tests', function() {
		// Initialize global variables
		var ThemesController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Themes controller.
			ThemesController = $controller('ThemesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Theme object fetched from XHR', inject(function(Themes) {
			// Create sample Theme using the Themes service
			var sampleTheme = new Themes({
				name: 'New Theme'
			});

			// Create a sample Themes array that includes the new Theme
			var sampleThemes = [sampleTheme];

			// Set GET response
			$httpBackend.expectGET('themes').respond(sampleThemes);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.themes).toEqualData(sampleThemes);
		}));

		it('$scope.findOne() should create an array with one Theme object fetched from XHR using a themeId URL parameter', inject(function(Themes) {
			// Define a sample Theme object
			var sampleTheme = new Themes({
				name: 'New Theme'
			});

			// Set the URL parameter
			$stateParams.themeId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/themes\/([0-9a-fA-F]{24})$/).respond(sampleTheme);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.theme).toEqualData(sampleTheme);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Themes) {
			// Create a sample Theme object
			var sampleThemePostData = new Themes({
				name: 'New Theme'
			});

			// Create a sample Theme response
			var sampleThemeResponse = new Themes({
				_id: '525cf20451979dea2c000001',
				name: 'New Theme'
			});

			// Fixture mock form input values
			scope.name = 'New Theme';

			// Set POST response
			$httpBackend.expectPOST('themes', sampleThemePostData).respond(sampleThemeResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Theme was created
			expect($location.path()).toBe('/themes/' + sampleThemeResponse._id);
		}));

		it('$scope.update() should update a valid Theme', inject(function(Themes) {
			// Define a sample Theme put data
			var sampleThemePutData = new Themes({
				_id: '525cf20451979dea2c000001',
				name: 'New Theme'
			});

			// Mock Theme in scope
			scope.theme = sampleThemePutData;

			// Set PUT response
			$httpBackend.expectPUT(/themes\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/themes/' + sampleThemePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid themeId and remove the Theme from the scope', inject(function(Themes) {
			// Create new Theme object
			var sampleTheme = new Themes({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Themes array and include the Theme
			scope.themes = [sampleTheme];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/themes\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleTheme);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.themes.length).toBe(0);
		}));
	});
}());