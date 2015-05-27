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
		$scope.players[key]['acceleration'] = 0;
		$scope.players[key]['agility'] = 0;
		$scope.players[key]['pace'] = 0;
		$scope.players[key]['stamina'] = 0;
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
  $scope.attribute = '';
  $scope.step1 = false;
  $scope.step2 = true;
  $scope.step3 = true;


  $scope.openModal = function(attribute)
  {
  	$scope.attribute = attribute.toLowerCase();
  	$scope.attributeName = attribute.toUpperCase();
  	$scope.statusType = 'fa-question-circle';
  	$scope.statusMsg = 'Waiting Command';
  	$scope.step1 = false;
  	$scope.step2 = true;
  	$scope.step3 = true;
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
  	$scope.$apply();
  }
  $("#linkBracelet").click(function(){gegar();});
  $("#linkBracelet").click(function(){
  	setTimeout(function(){ $scope.updateStatus('',"Initializing"); }, 500);
  	setTimeout(function(){ $scope.updateStatus('ok',"Initialized"); }, 1500);
  	setTimeout(function(){ $scope.updateStatus('',"Connecting"); }, 2500);
  	setTimeout(function(){ $scope.updateStatus('ok',"Connected"); }, 5000);
  	setTimeout(function(){ $scope.step1 = true;$scope.step2 = false;$scope.$apply(); }, 5000);

  });

  $("#startSession").click(function(){
  	setTimeout(function(){ $scope.updateStatus('ok',"Session Started"); }, 500);
  	setTimeout(function(){ $scope.step2 = true;$scope.step3 = false;$scope.$apply(); }, 500);
  });

  $("#stopSession").click(function(){
  	setTimeout(function(){ $scope.updateStatus('',"Session Stoped"); }, 500);
  	setTimeout(function(){ $scope.updateStatus('ok',"Initialized"); }, 1500);
  	setTimeout(function(){ $scope.updateStatus('',"Connecting"); }, 2500);
  	setTimeout(function(){ $scope.updateStatus('ok',"Connected"); }, 5000);
  	setTimeout(function(){ $scope.updateStatus('',"Reading data"); }, 6000);
  	setTimeout(function(){ $scope.updateStatus('ok',"Data Syncronized"); }, 8000);
  	setTimeout(function(){  
	  	$('#myModal').modal('toggle');
	  	$scope.thisPlayer[$scope.attribute] = Math.round(Math.random() * 10)*100/10;
	  	$scope.$apply();
	  	players[localStorage.currentUser] = $scope.thisPlayer;
	  	localStorage.players = JSON.stringify(players);
	  	$('#'+$scope.attribute).data('easyPieChart').update($scope.thisPlayer[$scope.attribute]);
  	}, 9000);
  });
  setTimeout(function(){
  	$('.chart').easyPieChart({ animate: 1000 });
  }, 500);
}]);

