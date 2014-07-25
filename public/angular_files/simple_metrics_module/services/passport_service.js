(function(){
	var app = angular.module('SimpleMetrics');

	app.service(
		'Passport',
		[
			'$rootScope',
			'$http',
			'$location',
			function($rootScope,$http,$location){

				// default usage is to just pass in username and password and it will set the user as a global variable for the app
				this.authenticate = function(username, password, options){
					options = options ? options : {};
					var success = function(user){
						// No error: authentication OK
						$rootScope.message = options['successMessage'] || 'Authentication successful!';
						$rootScope.user = user;
						$location.url(options['successUrl'] || '/goals');
					};
					var error = function(){
						// Error: authentication failed
						$rootScope.message = options['errorMessage'] || 'Authentication failed.';
						$location.url(options['errorUrl'] || '/login');
					};
					// console.log($scope.user);
					$http
						.post(options['postUrl'] || '/login', {
							username: username,
							password: password,
						})
						.success(options['success'] || success)
						.error(options['error'] || error)
					;
				};
			}
		]
	);

})();