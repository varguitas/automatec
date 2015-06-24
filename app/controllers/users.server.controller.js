'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash');

/**
 * Extend user's controller
 */
module.exports = _.extend(
	require('./users/users.authentication.server.controller'),
	require('./users/users.authorization.server.controller'),
	require('./users/users.password.server.controller'),
	require('./users/users.profile.server.controller')
);

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