'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	UserQuiz = mongoose.model('UserQuiz'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, userQuiz;

/**
 * User quiz routes tests
 */
describe('User quiz CRUD tests', function() {
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

		// Save a user to the test db and create new User quiz
		user.save(function() {
			userQuiz = {
				name: 'User quiz Name'
			};

			done();
		});
	});

	it('should be able to save User quiz instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new User quiz
				agent.post('/user-quizzes')
					.send(userQuiz)
					.expect(200)
					.end(function(userQuizSaveErr, userQuizSaveRes) {
						// Handle User quiz save error
						if (userQuizSaveErr) done(userQuizSaveErr);

						// Get a list of User quizzes
						agent.get('/user-quizzes')
							.end(function(userQuizzesGetErr, userQuizzesGetRes) {
								// Handle User quiz save error
								if (userQuizzesGetErr) done(userQuizzesGetErr);

								// Get User quizzes list
								var userQuizzes = userQuizzesGetRes.body;

								// Set assertions
								(userQuizzes[0].user._id).should.equal(userId);
								(userQuizzes[0].name).should.match('User quiz Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save User quiz instance if not logged in', function(done) {
		agent.post('/user-quizzes')
			.send(userQuiz)
			.expect(401)
			.end(function(userQuizSaveErr, userQuizSaveRes) {
				// Call the assertion callback
				done(userQuizSaveErr);
			});
	});

	it('should not be able to save User quiz instance if no name is provided', function(done) {
		// Invalidate name field
		userQuiz.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new User quiz
				agent.post('/user-quizzes')
					.send(userQuiz)
					.expect(400)
					.end(function(userQuizSaveErr, userQuizSaveRes) {
						// Set message assertion
						(userQuizSaveRes.body.message).should.match('Please fill User quiz name');
						
						// Handle User quiz save error
						done(userQuizSaveErr);
					});
			});
	});

	it('should be able to update User quiz instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new User quiz
				agent.post('/user-quizzes')
					.send(userQuiz)
					.expect(200)
					.end(function(userQuizSaveErr, userQuizSaveRes) {
						// Handle User quiz save error
						if (userQuizSaveErr) done(userQuizSaveErr);

						// Update User quiz name
						userQuiz.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing User quiz
						agent.put('/user-quizzes/' + userQuizSaveRes.body._id)
							.send(userQuiz)
							.expect(200)
							.end(function(userQuizUpdateErr, userQuizUpdateRes) {
								// Handle User quiz update error
								if (userQuizUpdateErr) done(userQuizUpdateErr);

								// Set assertions
								(userQuizUpdateRes.body._id).should.equal(userQuizSaveRes.body._id);
								(userQuizUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of User quizzes if not signed in', function(done) {
		// Create new User quiz model instance
		var userQuizObj = new UserQuiz(userQuiz);

		// Save the User quiz
		userQuizObj.save(function() {
			// Request User quizzes
			request(app).get('/user-quizzes')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single User quiz if not signed in', function(done) {
		// Create new User quiz model instance
		var userQuizObj = new UserQuiz(userQuiz);

		// Save the User quiz
		userQuizObj.save(function() {
			request(app).get('/user-quizzes/' + userQuizObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', userQuiz.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete User quiz instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new User quiz
				agent.post('/user-quizzes')
					.send(userQuiz)
					.expect(200)
					.end(function(userQuizSaveErr, userQuizSaveRes) {
						// Handle User quiz save error
						if (userQuizSaveErr) done(userQuizSaveErr);

						// Delete existing User quiz
						agent.delete('/user-quizzes/' + userQuizSaveRes.body._id)
							.send(userQuiz)
							.expect(200)
							.end(function(userQuizDeleteErr, userQuizDeleteRes) {
								// Handle User quiz error error
								if (userQuizDeleteErr) done(userQuizDeleteErr);

								// Set assertions
								(userQuizDeleteRes.body._id).should.equal(userQuizSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete User quiz instance if not signed in', function(done) {
		// Set User quiz user 
		userQuiz.user = user;

		// Create new User quiz model instance
		var userQuizObj = new UserQuiz(userQuiz);

		// Save the User quiz
		userQuizObj.save(function() {
			// Try deleting User quiz
			request(app).delete('/user-quizzes/' + userQuizObj._id)
			.expect(401)
			.end(function(userQuizDeleteErr, userQuizDeleteRes) {
				// Set message assertion
				(userQuizDeleteRes.body.message).should.match('User is not logged in');

				// Handle User quiz error error
				done(userQuizDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		UserQuiz.remove().exec();
		done();
	});
});