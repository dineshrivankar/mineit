
var pslgame = angular.module('pslgame');

pslgame.controller('transactionController', function ($scope, $http) {

    // GET ALL NETWORK TRANSACTIONS
    var url = apiUrl + "/deals"

    // GET FIRST TIME
    $http.get(url).success(function (response) {
        console.log("FirstTime GetAllTransactions success response", response);
        // TODO - Bind response to UI
        $scope.transactions = response;
    }).catch(function (response) {
        console.log("FirstTime GetAllTransactions failed response!", response);
    });

    // REPEAT
    setInterval(function () {
        $http.get(url).success(function (response) {
            console.log("Repeat GetAllTransactions success response", response);
            // TODO - Bind response to UI
            $scope.transactions = response;
        }).catch(function (response) {
            console.log("Repeat GetAllTransactions failed response!", response);
        });
    }, 2000);



    $scope.pslCoins = 100;

    $scope.latestUpdates = [];

    $scope.latestUpdatesObj1 = {
        fromUser: "Shane Watson",
        toUser: "Mary Cooper",
        noOfCoins: 10,
        timeDate: "10 Nov 2016, 11:30am"
    };
    $scope.latestUpdatesObj2 = {
        fromUser: "Donald Trump",
        toUser: "Harry Crane",
        noOfCoins: 100,
        timeDate: "17 Dec 2016, 1:50am"
    };
    $scope.latestUpdates.push($scope.latestUpdatesObj1);
    $scope.latestUpdates.push($scope.latestUpdatesObj2);
    $scope.userName = "Shawn Mendes"

});


