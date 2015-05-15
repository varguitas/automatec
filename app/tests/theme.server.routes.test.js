'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Theme = mongoose.model('Theme'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, theme;

/**
 * Theme routes tests
 */
describe('Theme CRUD tests', function() {
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

		// Save a user to the test db and create new Theme
		user.save(function() {
			theme = {
				name: 'Theme Name'
			};

			done();
		});
	});

	it('should be able to save Theme instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Theme
				agent.post('/themes')
					.send(theme)
					.expect(200)
					.end(function(themeSaveErr, themeSaveRes) {
						// Handle Theme save error
						if (themeSaveErr) done(themeSaveErr);

						// Get a list of Themes
						agent.get('/themes')
							.end(function(themesGetErr, themesGetRes) {
								// Handle Theme save error
								if (themesGetErr) done(themesGetErr);

								// Get Themes list
								var themes = themesGetRes.body;

								// Set assertions
								(themes[0].user._id).should.equal(userId);
								(themes[0].name).should.match('Theme Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Theme instance if not logged in', function(done) {
		agent.post('/themes')
			.send(theme)
			.expect(401)
			.end(function(themeSaveErr, themeSaveRes) {
				// Call the assertion callback
				done(themeSaveErr);
			});
	});

	it('should not be able to save Theme instance if no name is provided', function(done) {
		// Invalidate name field
		theme.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Theme
				agent.post('/themes')
					.send(theme)
					.expect(400)
					.end(function(themeSaveErr, themeSaveRes) {
						// Set message assertion
						(themeSaveRes.body.message).should.match('Please fill Theme name');
						
						// Handle Theme save error
						done(themeSaveErr);
					});
			});
	});

	it('should be able to update Theme instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Theme
				agent.post('/themes')
					.send(theme)
					.expect(200)
					.end(function(themeSaveErr, themeSaveRes) {
						// Handle Theme save error
						if (themeSaveErr) done(themeSaveErr);

						// Update Theme name
						theme.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Theme
						agent.put('/themes/' + themeSaveRes.body._id)
							.send(theme)
							.expect(200)
							.end(function(themeUpdateErr, themeUpdateRes) {
								// Handle Theme update error
								if (themeUpdateErr) done(themeUpdateErr);

								// Set assertions
								(themeUpdateRes.body._id).should.equal(themeSaveRes.body._id);
								(themeUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Themes if not signed in', function(done) {
		// Create new Theme model instance
		var themeObj = new Theme(theme);

		// Save the Theme
		themeObj.save(function() {
			// Request Themes
			request(app).get('/themes')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Theme if not signed in', function(done) {
		// Create new Theme model instance
		var themeObj = new Theme(theme);

		// Save the Theme
		themeObj.save(function() {
			request(app).get('/themes/' + themeObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', theme.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Theme instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Theme
				agent.post('/themes')
					.send(theme)
					.expect(200)
					.end(function(themeSaveErr, themeSaveRes) {
						// Handle Theme save error
						if (themeSaveErr) done(themeSaveErr);

						// Delete existing Theme
						agent.delete('/themes/' + themeSaveRes.body._id)
							.send(theme)
							.expect(200)
							.end(function(themeDeleteErr, themeDeleteRes) {
								// Handle Theme error error
								if (themeDeleteErr) done(themeDeleteErr);

								// Set assertions
								(themeDeleteRes.body._id).should.equal(themeSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Theme instance if not signed in', function(done) {
		// Set Theme user 
		theme.user = user;

		// Create new Theme model instance
		var themeObj = new Theme(theme);

		// Save the Theme
		themeObj.save(function() {
			// Try deleting Theme
			request(app).delete('/themes/' + themeObj._id)
			.expect(401)
			.end(function(themeDeleteErr, themeDeleteRes) {
				// Set message assertion
				(themeDeleteRes.body.message).should.match('User is not logged in');

				// Handle Theme error error
				done(themeDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Theme.remove().exec();
		done();
	});
});