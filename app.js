(function(){
	var app = angular.module('SimpleMetrics',['ngAnimate','ngRoute']);

	app.config(
		[
			'$routeProvider', 
			'$locationProvider',
			function($routeProvider, $locationProvider) {
				$routeProvider.when(
					'/home', 
					{
						templateUrl: 'home.html',
						controller: 'HomeController',
						controllerAs: 'home'
					}
				);
				$routeProvider.when(
					'/goals',
					{
						templateUrl: 'goals.html',
						controller: 'GoalController'
					}
				);
				$routeProvider.otherwise(
					{
						redirectTo:'/home'
					}
				);
				// configure html5 to get links working on jsfiddle
				// $locationProvider.html5Mode(true);
			}
		]
	);

	app.controller(
		'HomeController',
		[
			'$routeParams',
			'HomeData',
			'$scope',
			function($routeParams, homeData,$scope){
				$scope.title=homeData.title;
				this.title=homeData.title;
			}
		]
	);

	app.service('HomeData',function(){
		this.title=HomeTable.title;
	});
	
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

	app.service('GoalData',function(){
		this.goals=GoalTable.goals;
	});



})();