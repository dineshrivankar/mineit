// define our application and pull in ngRoute and ngAnimate
angular.module('Authentication', []);

var pslgame = angular.module('pslgame', ['ngRoute','ui.bootstrap','ngCookies','Authentication','angular-loading-bar','ngAnimate'])
.run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
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
                //$location.path('/login');
			} 
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
	// Transaction Page
	.when('/transaction', {
			templateUrl : 'partials/transaction.html',
			controller : 'transactionController'
	})
	// Default Page after login
	.otherwise({
			redirectTo : '/dashboard'
	});
	
});
