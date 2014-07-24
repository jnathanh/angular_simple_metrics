"use strict";

(function(){
	var app = angular.module('SimpleMetrics',['ngAnimate','ngRoute','ngResource']);

	// app.config(
	// 	[
	// 		'$locationProvider',
	// 		'$httpProvider',
	// 		function($locationProvider,$httpProvider){
	// 			console.log("hello there");
	// 			//Check if the user is connected
	// 			var checkLoggedin = function($q, $timeout, $http, $location, $rootScope){
	// 				// Initialize a new promise
	// 				var deferred = $q.defer();

	// 				// Make an AJAX call to check if the user is logged in
	// 				$http.get('/loggedin').success(function(user){
	// 					// Authenticated
	// 					if (user !== '0'){
	// 						$timeout(deferred.resolve, 0);
	// 					}

	// 					// Not Authenticated
	// 					else {
	// 						$rootScope.message = 'You need to log in.';
	// 						$timeout(function(){deferred.reject();}, 0);
	// 						$location.url('/login');
	// 					}
	// 				});

	// 				return deferred.promise;
	// 			};

	// 			// Add an interceptor for AJAX errors
	// 			$httpProvider.responseInterceptors.push(function($q, $location) {
	// 				return function(promise) {
	// 					return promise.then(
	// 						// Success: just return the response
	// 						function(response){
	// 							return response;
	// 						},
	// 						// Error: check the error status to get only the 401
	// 						function(response) {
	// 							if (response.status === 401)
	// 							$location.url('/login');
	// 							return $q.reject(response);
	// 						}
	// 					);
	// 				};
	// 			});
	// 		}
	// 	]
	// );
	// app.config(
	// 	[
	// 		'$locationProvider',
	// 		'$httpProvider',
	// 		'$routeProvider',
	// 		function($locationProvider, $httpProvider, $routeProvider) {
	// 			// Check if the user is connected
	// 			var checkLoggedin = function($q, $timeout, $http, $location, $rootScope){
	// 				// Initialize a new promise
	// 				var deferred = $q.defer();

	// 				// Make an AJAX call to check if the user is logged in
	// 				$http.get('/loggedin').success(function(user){
	// 					// Authenticated
	// 					if (user !== '0'){
	// 						$timeout(deferred.resolve, 0);
	// 					}

	// 					// Not Authenticated
	// 					else {
	// 						$rootScope.message = 'You need to log in.';
	// 						$timeout(function(){deferred.reject();}, 0);
	// 						$location.url('/login');
	// 					}
	// 				});

	// 				return deferred.promise;
	// 			};

	// 			// Add an interceptor for AJAX errors
	// 			$httpProvider.responseInterceptors.push(function($q, $location) {
	// 				return function(promise) {
	// 					return promise.then(
	// 						// Success: just return the response
	// 						function(response){
	// 							return response;
	// 						},
	// 						// Error: check the error status to get only the 401
	// 						function(response) {
	// 							if (response.status === 401)
	// 							$location.url('/login');
	// 							return $q.reject(response);
	// 						}
	// 					);
	// 				};
	// 			});

	// 			//Define all the routes
	// 			$routeProvider.when(
	// 				'/home',
	// 				{
	// 					templateUrl: 'views/home.html',
	// 					controller: 'HomeController',
	// 					controllerAs: 'home'
	// 				}
	// 			);
	// 			$routeProvider.when(
	// 				'/login', {
	// 					templateUrl: 'views/home.html',
	// 					controller: 'HomeController',
	// 					controllerAs: 'home'
	// 				}
	// 			);
	// 			$routeProvider.when(
	// 				'/goals',
	// 				{
	// 					templateUrl: 'views/goals.html',
	// 					controller: 'GoalController',
	// 					resolve: {loggedin: checkLoggedin}
	// 				}
	// 			);
	// 			$routeProvider.otherwise(
	// 				{
	// 					redirectTo:'/home'
	// 				}
	// 			);
	// 			// configure html5 to get links working on jsfiddle
	// 			// $locationProvider.html5Mode(true);
	// 		}
	// 	]
	// );

	app.run(function($rootScope, $http){
		$rootScope.message = '';

		// Logout function is available in any pages
		$rootScope.logout = function(){
			$rootScope.message = 'Logged out.';
			$http.post('/logout');
		};
	});

	app.service('HomeData',function(){
		this.title=HomeTable.title;
	});
	

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