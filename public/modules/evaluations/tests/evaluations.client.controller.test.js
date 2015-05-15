'use strict';

(function() {
	// Evaluations Controller Spec
	describe('Evaluations Controller Tests', function() {
		// Initialize global variables
		var EvaluationsController,
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

			// Initialize the Evaluations controller.
			EvaluationsController = $controller('EvaluationsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Evaluation object fetched from XHR', inject(function(Evaluations) {
			// Create sample Evaluation using the Evaluations service
			var sampleEvaluation = new Evaluations({
				name: 'New Evaluation'
			});

			// Create a sample Evaluations array that includes the new Evaluation
			var sampleEvaluations = [sampleEvaluation];

			// Set GET response
			$httpBackend.expectGET('evaluations').respond(sampleEvaluations);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.evaluations).toEqualData(sampleEvaluations);
		}));

		it('$scope.findOne() should create an array with one Evaluation object fetched from XHR using a evaluationId URL parameter', inject(function(Evaluations) {
			// Define a sample Evaluation object
			var sampleEvaluation = new Evaluations({
				name: 'New Evaluation'
			});

			// Set the URL parameter
			$stateParams.evaluationId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/evaluations\/([0-9a-fA-F]{24})$/).respond(sampleEvaluation);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.evaluation).toEqualData(sampleEvaluation);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Evaluations) {
			// Create a sample Evaluation object
			var sampleEvaluationPostData = new Evaluations({
				name: 'New Evaluation'
			});

			// Create a sample Evaluation response
			var sampleEvaluationResponse = new Evaluations({
				_id: '525cf20451979dea2c000001',
				name: 'New Evaluation'
			});

			// Fixture mock form input values
			scope.name = 'New Evaluation';

			// Set POST response
			$httpBackend.expectPOST('evaluations', sampleEvaluationPostData).respond(sampleEvaluationResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Evaluation was created
			expect($location.path()).toBe('/evaluations/' + sampleEvaluationResponse._id);
		}));

		it('$scope.update() should update a valid Evaluation', inject(function(Evaluations) {
			// Define a sample Evaluation put data
			var sampleEvaluationPutData = new Evaluations({
				_id: '525cf20451979dea2c000001',
				name: 'New Evaluation'
			});

			// Mock Evaluation in scope
			scope.evaluation = sampleEvaluationPutData;

			// Set PUT response
			$httpBackend.expectPUT(/evaluations\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/evaluations/' + sampleEvaluationPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid evaluationId and remove the Evaluation from the scope', inject(function(Evaluations) {
			// Create new Evaluation object
			var sampleEvaluation = new Evaluations({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Evaluations array and include the Evaluation
			scope.evaluations = [sampleEvaluation];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/evaluations\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleEvaluation);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.evaluations.length).toBe(0);
		}));
	});
}());