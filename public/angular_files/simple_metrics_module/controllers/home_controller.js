(function(){
	var app = angular.module('SimpleMetrics');

	app.controller(
	'HomeController',
	[
		// '$routeParams',
		'HomeData',
		'$scope',
		'$rootScope',
		'$http',
		'$location',
		// 'Passport',
		function(homeData,$scope,$rootScope,$http,$location){
			// $scope.title=homeData.title;
			this.title=homeData.title;
			$scope.user = {
				username:"",
				password:""
			};
			$scope.login = function(){
				console.log($scope.user);
				$http
					.post('/login', {
						username: $scope.user.username,
						password: $scope.user.password,
					})
					.success(function(user){
						// No error: authentication OK
						$rootScope.message = 'Authentication successful!';
						$location.url('/goals');
					})
					.error(function(){
						// Error: authentication failed
						$rootScope.message = 'Authentication failed.';
						$location.url('/login');
					});
			};
		}
	]
);


})();