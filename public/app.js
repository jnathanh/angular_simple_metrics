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
			'Passport',
			function($routeParams, homeData,$scope,Passport){
				$scope.title=homeData.title;
				this.title=homeData.title;
				$scope.user = {
					username:"",
					password:""
				}
				$scope.login = function(){
					console.log($scope.user);
					console.log(Passport.authenticate($scope.user));
					// Passport.authenticate($scope.user);

				}
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



	app.service('Passport',['$http', function($http){
		// return {authenticate:authenticate};
		this.authenticate = function(userPasswordObject){
			// console.log("authenticating...");
			$http({
				method:'POST', 
				url:'/login', 
				data:JSON.stringify(userPasswordObject),
				headers: {'Content-Type': 'application/json'}
			}).
			success(function(data, status, headers, config) {
				console.log(status + JSON.stringify(data));
			}).
			error(function(data, status, headers, config) {
				console.log('ERROR ERROR!!!');
				console.log(data)
			});
		};
	}]);


})();