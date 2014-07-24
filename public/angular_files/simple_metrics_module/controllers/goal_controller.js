(function(){
	var app = angular.module('SimpleMetrics');

	app.controller(
		'GoalController',
		[
			'GoalData',
			'$scope',
			function(goalData,$scope){
				$scope.goals = goalData.goals;

			}
		]
	);

	
})();

