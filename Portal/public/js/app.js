// define our application and pull in ngRoute and ngAnimate
angular.module('Authentication', []);

var pslgame = angular.module('pslgame', ['ngRoute','ui.bootstrap','ngCookies','Authentication','angular-loading-bar','ngAnimate'])
.run(['$rootScope', '$location', '$cookieStore', '$http','$interval', '$modal', function ($rootScope, $location, $cookieStore, $http, $interval, $modal) {
		var socket = io.connect();
		$rootScope.apiUrl = "http://10.244.51.108:9095/";
        //Set Page name for Nav 
		$rootScope.active = $location.path().replace('/','');		
		// keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }
 
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                $location.path('/login');
			} 
        });
		
		var modalInstance = $modal.open({
						templateUrl: 'partials/puzzle.html',
						controller: 'puzzleController',
						scope: $rootScope,		
					});	
		
		//Puzzle Time 
		$interval(function () {
			socket.emit('getTime',"");	
			if($rootScope.currentSeconds == 0){
				//Create Question and options 
				$rootScope.option = [];
				$rootScope.operators = [];
				$rootScope.numOperand = 3;
				var i = 0;
				for(i = 0; i < $rootScope.numOperand; i++) 	$rootScope.option[i] = Math.floor(Math.random()*900) + 100;
				$rootScope.question = $rootScope.option[0] + " + " + $rootScope.option[1] + " + " + $rootScope.option[2];
				$rootScope.answer = eval($rootScope.option[0] + $rootScope.option[1] + $rootScope.option[2]);
				console.log($rootScope.answer);
				$http.post($rootScope.apiUrl + "puzzle",{question:$rootScope.question,answer:$rootScope.answer})
					.success(function (data, status, headers, config) {
						if(status=200){
							$rootScope.questionID = data.puzzleId;
							//$rootScope.$broadcast('puzzleTime', $rootScope.questionID);
						}                            
					});
			}      
		}, 1000);	
	
	  socket.on('getTime', function(obj) {
		$rootScope.currentSeconds = obj;
		$rootScope.$apply();
	  });
  
	$rootScope.$on('puzzleTime', function(event, data){
        $rootScope.answer = '';
		$http.get($rootScope.apiUrl + "puzzle")
            .success(function (data, status, headers, config) {
			    if(status=200){
					$rootScope.question = data.question;
					$rootScope.questionID = data._id;
					var modalInstance = $modal.open({
						templateUrl: 'partials/puzzle.html',
						controller: 'puzzleController',
						scope: $rootScope,		
					});	
				}                            
            });			
    });
		
		
		
		
    }]);


pslgame.config(function($routeProvider) {

	$routeProvider

	// Login Page
	.when('/login', {
		    templateUrl: 'partials/login.html',
			controller: 'indexController',
        })
	// Logout Page
	.when('/logout', {
			redirectTo : '/login'
        })
	// Dashboard Page
	.when('/dashboard', {
			templateUrl : 'partials/dashboard.html',
			controller : 'dashboardController'
	}) 
	// Send Coins Page
	.when('/sendCoins', {
			templateUrl : 'partials/sendCoins.html',
			controller : 'sendCoinsController'
 	})
	// Transaction Page
	.when('/transaction', {
			templateUrl : 'partials/transaction.html',
			controller : 'transactionController'
	})	
    .when('/sendCoins', {
			templateUrl : 'partials/sendCoins.html',
			controller : 'sendCoinsController'
	})
	// Default Page after login
	.otherwise({
			redirectTo : '/dashboard'
	});
	
});
