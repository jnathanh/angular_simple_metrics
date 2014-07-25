(function(){
	var app = angular.module('SimpleMetrics');

	app.run(function($rootScope, $http){	// so it appears that .run is basically like a controller available on all pages (the 'App' controller)
		$rootScope.message = '';

		// Logout function is available in any pages
		$rootScope.logout = function(){
			$rootScope.message = 'Logged out.';
			$http.post('/logout');
		};
	});

})();