'use strict';

// Quizzes controller
angular.module('quizzes').controller('crearQuizController', ['$scope', '$stateParams', '$location', 'Authentication', 'Quizzes',
	function($scope, $stateParams, $location, Authentication, Quizzes) {
		$scope.authentication = Authentication

		//Jsons de prueba utilizados para simular la informacion de entrada
		var j_quiz ={
		"nombre_quiz": "Quiz 1",
			"preguntas" :  [
							{
								"id_pregunta":"P1",
								"Descripcion":" Cuantas combinaciones posibles de 'Missisipi' hay?"
							},
							{
								"id_pregunta":"P2",
								"Descripcion":"Cuantas combinaciones posibles de 'Victoria' hay?"
							},
							{
								"id_pregunta":"P3",
								"Descripcion":"Cuantas combinaciones posibles de 'Murcielago' hay?"
							}
					  ]
		}

		var j_curso ={
		"nombre_curso": "Probabilidades",
			"temas" :  [
							{
								"id_tema":"T1",
								"Descripcion":" Conteo"
							},
							{
								"id_tema":"T2",
								"Descripcion":"Distribuciones Discretas"
							},
							{
								"id_tema":"T3",
								"Descripcion":"Distribuciones Continuas"
							}
					  ]
		}

		$scope.iniciar = function(){
			$scope.info = j_quiz.preguntas
			$scope.lista_temas = j_curso.temas
			
		}
		$scope.validar = function(){
			
			var v = document.getElementById('texto_descripcion').value.length;
			if (v == 0) {
				alert("No hay una descripcion valida.");}
			else{alert("Quiz creado satisfactoriamente");}
			
		}



		}]);

		
