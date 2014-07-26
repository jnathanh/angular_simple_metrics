(function(){
	var app = angular.module('SimpleMetrics');

	app.controller(
		'GoalController',
		[
			'Database',
			'$scope',
			'$rootScope',
			function(Database,$scope,$rootScope){
				// $scope.goals = Database.table('GoalData').goals;
				$scope.goals = $rootScope['user'] ? $rootScope['user']['goals'] : null;
			}
		]
	);

	
})();

