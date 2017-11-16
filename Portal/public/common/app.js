"use strict";
(function() {
    angular.module("investorApp", ["ngRoute", "ngAnimate","angularUtils.directives.dirPagination", "ui.bootstrap","angularMoment","ngStorage"])
        .config(['$httpProvider', function($httpProvider) { 
             //$httpProvider.defaults.cache = true; 
        }]) 
		.run(['$rootScope', '$location',  '$http', '$interval', '$timeout',
			function ($rootScope, $location,  $http, $interval, $timeout) {
				$rootScope.$on('$locationChangeStart', function (event, next, current) {
					$rootScope.path = $location.path();
					$rootScope.loggedInUser = window.sessionStorage.getItem("loggedInUserName");
					if (!$rootScope.loggedInUser) {
						$location.path('/login');
					}
				});
			}]); 
       
})();

  angular.module("investorApp").filter('eMeeDateFormat', function() {
            return function(x) {
                var date;
                var months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
                var temp = new Date(x);
                date = temp.getDate() + " " + months[temp.getMonth()] + " " + (1900+parseInt(temp.getYear()));
                return date;
            };
 });

 angular.module("investorApp").directive("datepicker", function () {
  return {
    restrict: "A",
    require: "ngModel",
    link: function (scope, elem, attrs, ngModelCtrl) {
      var updateModel = function (dateText) {
        scope.$apply(function () {
          ngModelCtrl.$setViewValue(dateText);
        });
      };
      var options = {
        dateFormat: "mm/dd/yy",
        maxDate: 0,
        onSelect: function (dateText) {
          updateModel(dateText);
        }
      };
      elem.datepicker(options);
    }
  }
});


  angular.module("investorApp").directive('ddMenu', function() {
    return {
      restrict: 'A',
      scope: {
        ddMenu: '='
      },
      link: function(scope, element) {
        // set the initial value
        var $el = $(element);
        scope.ddMenu = $el.find('li:first').text();
        
        // listen for changes
        $el.on('click', 'li', function() {
          scope.ddMenu = $(this).text();
          scope.$apply(); 
        });
      }
    };
  }); 

 