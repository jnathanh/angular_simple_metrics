(function(){
	var app = angular.module('SimpleMetrics');

	app.controller(
		'GoalController',
		[
			'Database',
			'$scope',
			function(Database,$scope){
				$scope.goals = Database.table('GoalData').goals;

			}
		]
	);

	
})();

