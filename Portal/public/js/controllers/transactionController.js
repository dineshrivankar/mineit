
var pslgame = angular.module('pslgame');

pslgame.controller('transactionController', function($scope , $http) {


    $scope.pslCoins = 100;
    
    $scope.latestUpdates =[];
    
    $scope.latestUpdatesObj1 = {
        fromUser : "Shane Watson",
        toUser : "Mary Cooper",
        noOfCoins :  10,
        timeDate : "10 Nov 2016, 11:30am"
    };
    $scope.latestUpdatesObj2 = {
        fromUser : "Donald Trump",
        toUser : "Harry Crane",
        noOfCoins :  100,
        timeDate : "17 Dec 2016, 1:50am"
    };
    $scope.latestUpdates.push($scope.latestUpdatesObj1);
    $scope.latestUpdates.push($scope.latestUpdatesObj2);
    $scope.userName = "Shawn Mendes"

});


