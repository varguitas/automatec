'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	UserQuiz = mongoose.model('UserQuiz');

/**
 * Globals
 */
var user, userQuiz;

/**
 * Unit tests
 */
describe('User quiz Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			userQuiz = new UserQuiz({
				name: 'User quiz Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return userQuiz.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			userQuiz.name = '';

			return userQuiz.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		UserQuiz.remove().exec();
		User.remove().exec();

		done();
	});
});