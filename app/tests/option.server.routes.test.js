'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Option = mongoose.model('Option'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, option;

/**
 * Option routes tests
 */
describe('Option CRUD tests', function() {
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

		// Save a user to the test db and create new Option
		user.save(function() {
			option = {
				name: 'Option Name'
			};

			done();
		});
	});

	it('should be able to save Option instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Option
				agent.post('/options')
					.send(option)
					.expect(200)
					.end(function(optionSaveErr, optionSaveRes) {
						// Handle Option save error
						if (optionSaveErr) done(optionSaveErr);

						// Get a list of Options
						agent.get('/options')
							.end(function(optionsGetErr, optionsGetRes) {
								// Handle Option save error
								if (optionsGetErr) done(optionsGetErr);

								// Get Options list
								var options = optionsGetRes.body;

								// Set assertions
								(options[0].user._id).should.equal(userId);
								(options[0].name).should.match('Option Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Option instance if not logged in', function(done) {
		agent.post('/options')
			.send(option)
			.expect(401)
			.end(function(optionSaveErr, optionSaveRes) {
				// Call the assertion callback
				done(optionSaveErr);
			});
	});

	it('should not be able to save Option instance if no name is provided', function(done) {
		// Invalidate name field
		option.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Option
				agent.post('/options')
					.send(option)
					.expect(400)
					.end(function(optionSaveErr, optionSaveRes) {
						// Set message assertion
						(optionSaveRes.body.message).should.match('Please fill Option name');
						
						// Handle Option save error
						done(optionSaveErr);
					});
			});
	});

	it('should be able to update Option instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Option
				agent.post('/options')
					.send(option)
					.expect(200)
					.end(function(optionSaveErr, optionSaveRes) {
						// Handle Option save error
						if (optionSaveErr) done(optionSaveErr);

						// Update Option name
						option.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Option
						agent.put('/options/' + optionSaveRes.body._id)
							.send(option)
							.expect(200)
							.end(function(optionUpdateErr, optionUpdateRes) {
								// Handle Option update error
								if (optionUpdateErr) done(optionUpdateErr);

								// Set assertions
								(optionUpdateRes.body._id).should.equal(optionSaveRes.body._id);
								(optionUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Options if not signed in', function(done) {
		// Create new Option model instance
		var optionObj = new Option(option);

		// Save the Option
		optionObj.save(function() {
			// Request Options
			request(app).get('/options')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Option if not signed in', function(done) {
		// Create new Option model instance
		var optionObj = new Option(option);

		// Save the Option
		optionObj.save(function() {
			request(app).get('/options/' + optionObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', option.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Option instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Option
				agent.post('/options')
					.send(option)
					.expect(200)
					.end(function(optionSaveErr, optionSaveRes) {
						// Handle Option save error
						if (optionSaveErr) done(optionSaveErr);

						// Delete existing Option
						agent.delete('/options/' + optionSaveRes.body._id)
							.send(option)
							.expect(200)
							.end(function(optionDeleteErr, optionDeleteRes) {
								// Handle Option error error
								if (optionDeleteErr) done(optionDeleteErr);

								// Set assertions
								(optionDeleteRes.body._id).should.equal(optionSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Option instance if not signed in', function(done) {
		// Set Option user 
		option.user = user;

		// Create new Option model instance
		var optionObj = new Option(option);

		// Save the Option
		optionObj.save(function() {
			// Try deleting Option
			request(app).delete('/options/' + optionObj._id)
			.expect(401)
			.end(function(optionDeleteErr, optionDeleteRes) {
				// Set message assertion
				(optionDeleteRes.body.message).should.match('User is not logged in');

				// Handle Option error error
				done(optionDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Option.remove().exec();
		done();
	});
});