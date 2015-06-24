'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	User = mongoose.model('User'),
	_ = require('lodash');

/**
 * Extend user's controller
 */
module.exports = _.extend(
	require('./users/users.authentication.server.controller'),
	require('./users/users.authorization.server.controller'),
	require('./users/users.password.server.controller'),
	require('./users/users.profile.server.controller')
);

function addRole(userOid, role) {
	User.update(
		{ "_id": userOid },
		{ "$push": { "roles": role } },
		callback);
}

function removeRole(userOid, role){
	User.update(
		{'_id': userOid}, 
		{ "$pull": { "roles" : { type: role } } },
		false,
		true);
}

function getRoles(userOid){
	User.aggregate(
		[
			{ $match: { "_id": userOid } },
			{ $sort: { "_id": -1 } }
		],
		callback);
}

function getAllUsersRoles() {
	User.find(
        { },
		{  "username": 1, "firstName": 1, "lastName": 1 , "roles": 1} );
}
user.server.controller.prototype ={
	addRole: function(req,res){
	var id = req.body.userOid;
	var role = req.body.role;
	}
	
	removeRole: function(req,res){
		
	}
	getRoles: function(req,res){
	role.find()	
	}
	
	getAllUsersRoles: function(req,res){
	
	}
}
