(function(){
	var app = angular.module('MainApp',['ngAnimate']);
	app.service('HomeData',function(){
		this.title=HomeTable.title;
	});
	app.controller('HomeController',['HomeData',function(homeData){
		this.title=homeData.title;
	}]);

})();