var genericSTS = angular.module('genericSTS', ['ngRoute']);

genericSTS.config(['$routeProvider',
	function ($routeProvider) {
		$routeProvider.
		when('/playerList', {
			templateUrl: 'template/playerList.html',
			controller: 'PlayerListCtrl'
		}).
		when('/profilePage', {
			templateUrl: 'template/profilePage.html',
			controller: 'ProfilePageCtrl'
		}).
		when('/attributePage', {
			templateUrl: 'template/attributePage.html',
			controller: 'AttributePageCtrl'
		}).
		when('/dashboard', {
			templateUrl: 'template/dashboard.html',
			controller: 'DashboardCtrl'
		}).
		when('/logout', {
			templateUrl: 'template/logout.html',
			controller: 'LogoutCtrl'
		}).
		otherwise({
			redirectTo: '/playerList'
		});
	}
]);

genericSTS.controller('MainCtrl', ['$scope', '$http','filterFilter', function ($scope,$http,filterFilter) {
  $scope.loginAs = (localStorage.u).toUpperCase();
}]);

genericSTS.controller('PlayerListCtrl', ['$scope', '$http','filterFilter', function ($scope,$http,filterFilter) {
	//console.log(localStorage.players);
	if(localStorage.players != undefined && localStorage.players != "")
		$scope.players = JSON.parse(localStorage.players)
	else
		$scope.players = [];

	//console.log($scope);
	$("#saveAddPlayer").click(function(){
		//console.log($scope.players);
		
		key = $scope.players.length;
		$scope.players[key] = {};
		$scope.players[key]['name'] = $scope.newPlayerName.toUpperCase();
		$scope.players[key]['position'] = $scope.newPlayerPosition.toUpperCase();
		$scope.players[key]['age'] = $scope.newPlayerAge.toUpperCase();
		$scope.players[key]['height'] = $scope.newPlayerHeight.toUpperCase();
		$scope.players[key]['weight'] = $scope.newPlayerWeight.toUpperCase();
		//console.log($scope.players);

		localStorage.players = JSON.stringify($scope.players);
		//console.log(localStorage.players);
		$('#myModal').modal('toggle');
		$scope.$apply();
		//console.log($scope);
	});

	$scope.goToProfile = function(index){
		localStorage.currentUser = index;
		//window.location.replace('#profilePage');
	}

}]);

genericSTS.controller('ProfilePageCtrl', ['$scope', '$http','filterFilter', function ($scope,$http,filterFilter) {
  //alert(localStorage.currentUser);
  players = JSON.parse(localStorage.players);
  $scope.thisPlayer = players[localStorage.currentUser]; 
}]);

genericSTS.controller('AttributePageCtrl', ['$scope', '$http','filterFilter', function ($scope,$http,filterFilter) {
  //alert(localStorage.currentUser);
  players = JSON.parse(localStorage.players);
  $scope.thisPlayer = players[localStorage.currentUser]; 
  $scope.attributeName = '';
  $scope.statusType = 'fa-question-circle';
  $scope.statusMsg = 'Waiting Command';

  $scope.openModal = function(attribute)
  {
  	$scope.attributeName = attribute.toUpperCase();
  	$('#myModal').modal('toggle');
  }

  $scope.updateStatus = function(type,msg)
  {
  	if(type == "ok")
  		$scope.statusType = 'fa-check-circle';
  	else if(type == "ng")
  		$scope.statusType = 'fa-times-circle';
  	else
  		$scope.statusType = 'fa-question-circle';

  	$scope.statusMsg = msg;
  }

  $("#linkBracelet").click(function(){
  	aXinitialize()
  });

  $('.chart').easyPieChart({
  	animate: 2000
  });
}]);
