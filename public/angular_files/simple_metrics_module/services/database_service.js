(function(){
	var app = angular.module('SimpleMetrics');

	app.service('Database',function(){
		this.table = function(table){
			if(table == 'HomeTable'){
				return HomeTable;
			}else if (table == 'GoalData'){
				return GoalTable;
			}
		};
	});

})();