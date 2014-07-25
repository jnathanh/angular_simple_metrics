(function(){
	var app = angular.module('SimpleMetrics');

	app.controller(
	'HomeController',
	[
		'Database',
		'$scope',
		'$rootScope',
		'$http',
		'$location',
		'Passport',
		function(Database,$scope,$rootScope,$http,$location, Passport){
			// $scope.title=homeData.title;
			this.title=Database.table('HomeTable').title;
			$scope.tempUser = {username:"",password:""};
			$scope.login = function(){
				Passport.authenticate($scope.tempUser.username, $scope.tempUser.password);
			};
		}
	]
);


})();