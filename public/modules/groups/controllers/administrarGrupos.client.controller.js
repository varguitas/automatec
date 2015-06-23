'use strict';

// Groups controller
angular.module('groups').controller('administrarGruposController', ['$scope', '$stateParams', '$location', 'Authentication', 'Groups',
	function($scope, $stateParams, $location, Authentication, Quizzes) {
		$scope.authentication = Authentication

		//JSon utilizado meramente para prueba. Simula la entrada de informacion de los grupos
		//a la vista 'administrarGrupos'
		var grupo ={
		"id": "1",
			"grupos" :  [
							{
								"id_grupo":"GR1",
								"Descripcion":" Conteo"
							},
							{
								"id_grupo":"GR2",
								"Descripcion":"Distribuciones Discretas"
							},
							{
								"id_grupo":"GR3",
								"Descripcion":"Distribuciones Continuas"
							}
					  ]
		}

		$scope.iniciar = function(){
			$scope.info = grupo.grupos
		}

		
	}
]);