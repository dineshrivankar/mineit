
var pslgame = angular.module('pslgame');

pslgame.controller('indexController', function($scope , $http) {

$('#main-menu').metisMenu();
	$scope.pageTitle = "Dashboard";
	//toastr["success"]("Success Details.");
	//toastr["error"]("Error in retrieving Details.");
	

	
	
// Simple GET request example :
$http.get('#/listEvent').
  success(function(data, status, headers, config) {

  }).
  error(function(data, status, headers, config) {
  });
});


