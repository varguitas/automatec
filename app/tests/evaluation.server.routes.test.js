'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Evaluation = mongoose.model('Evaluation'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, evaluation;

/**
 * Evaluation routes tests
 */
describe('Evaluation CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Evaluation
		user.save(function() {
			evaluation = {
				name: 'Evaluation Name'
			};

			done();
		});
	});

	it('should be able to save Evaluation instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Evaluation
				agent.post('/evaluations')
					.send(evaluation)
					.expect(200)
					.end(function(evaluationSaveErr, evaluationSaveRes) {
						// Handle Evaluation save error
						if (evaluationSaveErr) done(evaluationSaveErr);

						// Get a list of Evaluations
						agent.get('/evaluations')
							.end(function(evaluationsGetErr, evaluationsGetRes) {
								// Handle Evaluation save error
								if (evaluationsGetErr) done(evaluationsGetErr);

								// Get Evaluations list
								var evaluations = evaluationsGetRes.body;

								// Set assertions
								(evaluations[0].user._id).should.equal(userId);
								(evaluations[0].name).should.match('Evaluation Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Evaluation instance if not logged in', function(done) {
		agent.post('/evaluations')
			.send(evaluation)
			.expect(401)
			.end(function(evaluationSaveErr, evaluationSaveRes) {
				// Call the assertion callback
				done(evaluationSaveErr);
			});
	});

	it('should not be able to save Evaluation instance if no name is provided', function(done) {
		// Invalidate name field
		evaluation.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Evaluation
				agent.post('/evaluations')
					.send(evaluation)
					.expect(400)
					.end(function(evaluationSaveErr, evaluationSaveRes) {
						// Set message assertion
						(evaluationSaveRes.body.message).should.match('Please fill Evaluation name');
						
						// Handle Evaluation save error
						done(evaluationSaveErr);
					});
			});
	});

	it('should be able to update Evaluation instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Evaluation
				agent.post('/evaluations')
					.send(evaluation)
					.expect(200)
					.end(function(evaluationSaveErr, evaluationSaveRes) {
						// Handle Evaluation save error
						if (evaluationSaveErr) done(evaluationSaveErr);

						// Update Evaluation name
						evaluation.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Evaluation
						agent.put('/evaluations/' + evaluationSaveRes.body._id)
							.send(evaluation)
							.expect(200)
							.end(function(evaluationUpdateErr, evaluationUpdateRes) {
								// Handle Evaluation update error
								if (evaluationUpdateErr) done(evaluationUpdateErr);

								// Set assertions
								(evaluationUpdateRes.body._id).should.equal(evaluationSaveRes.body._id);
								(evaluationUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Evaluations if not signed in', function(done) {
		// Create new Evaluation model instance
		var evaluationObj = new Evaluation(evaluation);

		// Save the Evaluation
		evaluationObj.save(function() {
			// Request Evaluations
			request(app).get('/evaluations')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Evaluation if not signed in', function(done) {
		// Create new Evaluation model instance
		var evaluationObj = new Evaluation(evaluation);

		// Save the Evaluation
		evaluationObj.save(function() {
			request(app).get('/evaluations/' + evaluationObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', evaluation.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Evaluation instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Evaluation
				agent.post('/evaluations')
					.send(evaluation)
					.expect(200)
					.end(function(evaluationSaveErr, evaluationSaveRes) {
						// Handle Evaluation save error
						if (evaluationSaveErr) done(evaluationSaveErr);

						// Delete existing Evaluation
						agent.delete('/evaluations/' + evaluationSaveRes.body._id)
							.send(evaluation)
							.expect(200)
							.end(function(evaluationDeleteErr, evaluationDeleteRes) {
								// Handle Evaluation error error
								if (evaluationDeleteErr) done(evaluationDeleteErr);

								// Set assertions
								(evaluationDeleteRes.body._id).should.equal(evaluationSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Evaluation instance if not signed in', function(done) {
		// Set Evaluation user 
		evaluation.user = user;

		// Create new Evaluation model instance
		var evaluationObj = new Evaluation(evaluation);

		// Save the Evaluation
		evaluationObj.save(function() {
			// Try deleting Evaluation
			request(app).delete('/evaluations/' + evaluationObj._id)
			.expect(401)
			.end(function(evaluationDeleteErr, evaluationDeleteRes) {
				// Set message assertion
				(evaluationDeleteRes.body.message).should.match('User is not logged in');

				// Handle Evaluation error error
				done(evaluationDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Evaluation.remove().exec();
		done();
	});
});