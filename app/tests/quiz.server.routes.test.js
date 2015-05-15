'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Quiz = mongoose.model('Quiz'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, quiz;

/**
 * Quiz routes tests
 */
describe('Quiz CRUD tests', function() {
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

		// Save a user to the test db and create new Quiz
		user.save(function() {
			quiz = {
				name: 'Quiz Name'
			};

			done();
		});
	});

	it('should be able to save Quiz instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Quiz
				agent.post('/quizzes')
					.send(quiz)
					.expect(200)
					.end(function(quizSaveErr, quizSaveRes) {
						// Handle Quiz save error
						if (quizSaveErr) done(quizSaveErr);

						// Get a list of Quizzes
						agent.get('/quizzes')
							.end(function(quizzesGetErr, quizzesGetRes) {
								// Handle Quiz save error
								if (quizzesGetErr) done(quizzesGetErr);

								// Get Quizzes list
								var quizzes = quizzesGetRes.body;

								// Set assertions
								(quizzes[0].user._id).should.equal(userId);
								(quizzes[0].name).should.match('Quiz Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Quiz instance if not logged in', function(done) {
		agent.post('/quizzes')
			.send(quiz)
			.expect(401)
			.end(function(quizSaveErr, quizSaveRes) {
				// Call the assertion callback
				done(quizSaveErr);
			});
	});

	it('should not be able to save Quiz instance if no name is provided', function(done) {
		// Invalidate name field
		quiz.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Quiz
				agent.post('/quizzes')
					.send(quiz)
					.expect(400)
					.end(function(quizSaveErr, quizSaveRes) {
						// Set message assertion
						(quizSaveRes.body.message).should.match('Please fill Quiz name');
						
						// Handle Quiz save error
						done(quizSaveErr);
					});
			});
	});

	it('should be able to update Quiz instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Quiz
				agent.post('/quizzes')
					.send(quiz)
					.expect(200)
					.end(function(quizSaveErr, quizSaveRes) {
						// Handle Quiz save error
						if (quizSaveErr) done(quizSaveErr);

						// Update Quiz name
						quiz.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Quiz
						agent.put('/quizzes/' + quizSaveRes.body._id)
							.send(quiz)
							.expect(200)
							.end(function(quizUpdateErr, quizUpdateRes) {
								// Handle Quiz update error
								if (quizUpdateErr) done(quizUpdateErr);

								// Set assertions
								(quizUpdateRes.body._id).should.equal(quizSaveRes.body._id);
								(quizUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Quizzes if not signed in', function(done) {
		// Create new Quiz model instance
		var quizObj = new Quiz(quiz);

		// Save the Quiz
		quizObj.save(function() {
			// Request Quizzes
			request(app).get('/quizzes')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Quiz if not signed in', function(done) {
		// Create new Quiz model instance
		var quizObj = new Quiz(quiz);

		// Save the Quiz
		quizObj.save(function() {
			request(app).get('/quizzes/' + quizObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', quiz.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Quiz instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Quiz
				agent.post('/quizzes')
					.send(quiz)
					.expect(200)
					.end(function(quizSaveErr, quizSaveRes) {
						// Handle Quiz save error
						if (quizSaveErr) done(quizSaveErr);

						// Delete existing Quiz
						agent.delete('/quizzes/' + quizSaveRes.body._id)
							.send(quiz)
							.expect(200)
							.end(function(quizDeleteErr, quizDeleteRes) {
								// Handle Quiz error error
								if (quizDeleteErr) done(quizDeleteErr);

								// Set assertions
								(quizDeleteRes.body._id).should.equal(quizSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Quiz instance if not signed in', function(done) {
		// Set Quiz user 
		quiz.user = user;

		// Create new Quiz model instance
		var quizObj = new Quiz(quiz);

		// Save the Quiz
		quizObj.save(function() {
			// Try deleting Quiz
			request(app).delete('/quizzes/' + quizObj._id)
			.expect(401)
			.end(function(quizDeleteErr, quizDeleteRes) {
				// Set message assertion
				(quizDeleteRes.body.message).should.match('User is not logged in');

				// Handle Quiz error error
				done(quizDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Quiz.remove().exec();
		done();
	});
});