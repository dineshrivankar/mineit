
var pslgame = angular.module('pslgame');

pslgame.controller('sendCoinsController', function($scope , $http) {


    $scope.pslCoins = 100;
    
    $scope.users =[];
    
    $scope.user1 = {
        name: "Sara Dias",
        id:1
    };
    $scope.user2 = {
        name: "Henry Rome",
        id:2
    };
    $scope.user3 = {
        name: "Zen Xwell",
        id:3
    };    
    $scope.user4 = {
        name: "Robert Robo",
        id:4
    };

    $scope.users.push($scope.user1);
    $scope.users.push($scope.user2);
    $scope.users.push($scope.user3);
    $scope.users.push($scope.user4);
    $scope.userName = "Shawn Mendes"

});


