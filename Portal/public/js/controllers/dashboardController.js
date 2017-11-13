
var pslgame = angular.module('pslgame');

pslgame.controller('dashboardController', function($scope , $http) {


    $scope.pslCoins = 100;
    $scope.block = 2;
    $scope.userName = "User Name ";
    $scope.blocks = [
					 {name:"1",description:"Block 1 Description"},
					 {name:"2",description:"Block 2 Description"},
					 {name:"3",description:"Block 3 Description"},
					 {name:"4",description:"Block 4 Description"},
					 {name:"5",description:"Block 5 Description"}
					];
    $scope.latestUpdates = [{
								fromUser : "Shane Watson",
								toUser : "Mary Cooper",
								noOfCoins :  10,
								timeDate : "10 Nov 2016, 11:30am"
							},{
								fromUser : "Donald Trump",
								toUser : "Harry Crane",
								noOfCoins :  100,
								timeDate : "17 Dec 2016, 1:50am"
							}];
	
    $scope.userName = "Shawn Mendes";
    



});


