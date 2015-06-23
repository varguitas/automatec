'use strict';

// Courses controller
angular.module('courses').controller('quicesPorCursoController', ['$scope', '$stateParams', '$location', 'Authentication', 'Courses',
	function($scope, $stateParams, $location, Authentication, Courses) {
		$scope.authentication = Authentication



		var curso =
		{
		'id_curso':'2',
		'nombre_curso': 'Probabilidades',
			'quices' :  [
							{
								'quiz_id': '1',
								'nombre':'quiz_1',
                                'description': 'Primer quiz',
                                'tema':'Conteo'
							},
							{
								'quiz_id': '2',
								'nombre':'quiz_2',
                                'description': 'Segunto quiz',
                                'tema':'Integrales'
							},
							{
								'quiz_id': '3',
								'nombre':'quiz_3',
                                'description': 'Tercer quiz',
                                'tema':'Metricas'
							},
							{
								'quiz_id': '4',
								'nombre':'quiz_4',
                                'description': 'Cuarto quiz',
                                'tema':'Limites'
							}

					  ]
		}
		var tema = 
		{
			'temas':
			[
				{
					'id_tema': '1',
					'id_curso': '1',
					'nombre_tema': 'conteo',
					"preguntas" : []
				},
				{
					'id_tema': '2',
					'id_curso': '1',
					'nombre_tema': 'Integrales',
					"preguntas" : []
				},
				{
					'id_tema': '3',
					'id_curso': '1',
					'nombre_tema': 'Limites',
					"preguntas" : []
				},
				{
					'id_tema': '4',
					'id_curso': '2',
					'nombre_tema': 'Metricas',
					"preguntas" : []
				}
			]
		}



		$scope.iniciar = function(){
			$scope.filtro=curso.id_curso
			$scope.nombreCurso = curso.nombre_curso
			$scope.info = curso.quices
			$scope.temas=tema.temas

		}

		$scope.print = function(){
			console.log("Es un exito----------------------");
		}
		$scope.funcion=function(id){
			console.log(id)
		}
	}
]);