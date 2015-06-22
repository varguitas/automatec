'use strict';

(function() {
	// User quizzes Controller Spec
	describe('User quizzes Controller Tests', function() {
		// Initialize global variables
		var UserQuizzesController,
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

			// Initialize the User quizzes controller.
			UserQuizzesController = $controller('UserQuizzesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one User quiz object fetched from XHR', inject(function(UserQuizzes) {
			// Create sample User quiz using the User quizzes service
			var sampleUserQuiz = new UserQuizzes({
				name: 'New User quiz'
			});

			// Create a sample User quizzes array that includes the new User quiz
			var sampleUserQuizzes = [sampleUserQuiz];

			// Set GET response
			$httpBackend.expectGET('user-quizzes').respond(sampleUserQuizzes);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.userQuizzes).toEqualData(sampleUserQuizzes);
		}));

		it('$scope.findOne() should create an array with one User quiz object fetched from XHR using a userQuizId URL parameter', inject(function(UserQuizzes) {
			// Define a sample User quiz object
			var sampleUserQuiz = new UserQuizzes({
				name: 'New User quiz'
			});

			// Set the URL parameter
			$stateParams.userQuizId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/user-quizzes\/([0-9a-fA-F]{24})$/).respond(sampleUserQuiz);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.userQuiz).toEqualData(sampleUserQuiz);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(UserQuizzes) {
			// Create a sample User quiz object
			var sampleUserQuizPostData = new UserQuizzes({
				name: 'New User quiz'
			});

			// Create a sample User quiz response
			var sampleUserQuizResponse = new UserQuizzes({
				_id: '525cf20451979dea2c000001',
				name: 'New User quiz'
			});

			// Fixture mock form input values
			scope.name = 'New User quiz';

			// Set POST response
			$httpBackend.expectPOST('user-quizzes', sampleUserQuizPostData).respond(sampleUserQuizResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the User quiz was created
			expect($location.path()).toBe('/user-quizzes/' + sampleUserQuizResponse._id);
		}));

		it('$scope.update() should update a valid User quiz', inject(function(UserQuizzes) {
			// Define a sample User quiz put data
			var sampleUserQuizPutData = new UserQuizzes({
				_id: '525cf20451979dea2c000001',
				name: 'New User quiz'
			});

			// Mock User quiz in scope
			scope.userQuiz = sampleUserQuizPutData;

			// Set PUT response
			$httpBackend.expectPUT(/user-quizzes\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/user-quizzes/' + sampleUserQuizPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid userQuizId and remove the User quiz from the scope', inject(function(UserQuizzes) {
			// Create new User quiz object
			var sampleUserQuiz = new UserQuizzes({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new User quizzes array and include the User quiz
			scope.userQuizzes = [sampleUserQuiz];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/user-quizzes\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleUserQuiz);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.userQuizzes.length).toBe(0);
		}));
	});
}());