
var pslgame = angular.module('pslgame');

pslgame.controller('dashboardController', function($scope , $http) {


    $scope.pslCoins = 100;
    $scope.userName = "User Name ";
    $scope.blocks = [
					 {name:"1",description:"Block 1 Description"},
					 {name:"2",description:"Block 2 Description"},
					 {name:"3",description:"Block 3 Description"},
					 {name:"4",description:"Block 4 Description"},
					 {name:"5",description:"Block 5 Description"}
					];

	$scope.userName = "Shawn Mendes";
	
	// GET LATEST TRANSACTION
	
	var url = apiUrl + "/deals/latest"

    $http.get(url).success(function (response) {
        console.log("FirstTime GetAllTransactions success response", response);
        // TODO - Bind response to UI
        $scope.transactions = [response];
    }).catch(function (response) {
        console.log("FirstTime GetAllTransactions failed response!", response);
    });
	
	// GET ALL NETWORK BLOCKS
    var url = apiUrl + "/puzzles/blocks"
    $http.get(url).success(function (response) {
		console.log("GetAllBlocks success response", response);
		$scope.numberOfBlocks = response.length;
        // TODO - Bind response to UI
    }).catch(function (response) {
        console.log("GetAllBlocks failed response!", response);
    })


});


