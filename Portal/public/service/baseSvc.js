 angular.module("investorApp")
    .factory("baseSvc", ["$http", "$q", function($http, $q) { 

        var getRequest = function(query) {
            var deferred = $q.defer();
            $http({
                    url: query,
                    method: "GET",
                    withCredentials: true, 
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    }
                })
                .success(function(result) {
                    deferred.resolve(result);
                })
                .error(function(result, status) {
                    deferred.reject(status);
                });
            return deferred.promise;
        };

         var postRequest = function(data, url) {

               var deferred = $q.defer();
               $http({
                    url: url,
                    method: "POST",
                    withCredentials: true, 
                    headers: {
                        "accept": "application/json; charset=utf-8",
                        "content-Type": "application/x-www-form-urlencoded"
                    },
                    data: data // JSON.stringify(data)
                })
                .success(function(result) {
                    deferred.resolve(result);
                })
                .error(function(result, status) {
                    deferred.reject(status);
                });
            return deferred.promise; 
        };

        return {
            getRequest : getRequest,
            postRequest : postRequest
        };
}]);
 