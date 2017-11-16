angular.module("investorApp").service("investorService", ["baseSvc","$http", function(baseService,$http){ 
    
    var base_URL = "http://10.244.51.108:9095/";
    var registerUserUrl = base_URL + "users/register";
    var sendCoin_URL = base_URL + "deals";
    var savePuzzle_URL = base_URL + "puzzles/save";
    var solvePuzzle_URL = base_URL + "puzzles/solve";
    
    var loginUserUrl = base_URL + "users/login";
    var getUserDetail_URL = base_URL + "users/";
    var getAllUserDetail_URL = base_URL + "users";
    var getAllTransaction_URL = base_URL + "deals";
    var getLatestPuzzle_URL = base_URL + "puzzles/latest";
    var getAllPuzzle_URL = base_URL + "puzzles";
    var getLatestTransaction_URL = base_URL + "deals/latest";
    var getAllBlocks_URL = base_URL + "puzzles/blocks";
    var getTransByBlockId_URL = base_URL + "puzzles/blocks/";
    var generateUsernameURL = base_URL + "users/generate/names";
    
     this.registerUser = function(param) {
        return $http({
            method: 'POST', 
            data:  param,
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            url: registerUserUrl  
        });
     }
     
      this.loginUser = function (param) {   
        return $http({
            method: 'POST', 		
            data:  param,
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            url: loginUserUrl
        });
    }
      
    this.sendCoin = function(param) {
        return $http({
            method: 'POST', 
            data:  param,
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            url: sendCoin_URL  
        });
     }
    
     this.savePuzzle = function(param) {
        return $http({
            method: 'POST', 
            data:  param,
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            url: savePuzzle_URL  
        });
     } 
     
   this.solvePuzzle = function(param) {
    return $http({
        method: 'POST', 
        data:  param,
        headers: { 
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        url: solvePuzzle_URL  
    });
     } 
     
     
    this.getUserDetail = function(userName) {   
        return $http({
            method: 'GET', 		
             headers: { 
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            url: getUserDetail_URL +  userName
        });
    }
    
    this.getAllUserDetail = function() {   
        return $http({
            method: 'GET', 		
             headers: { 
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            url: getAllUserDetail_URL
        });
    }
    
    this.getAllTransaction = function() {   
        return $http({
            method: 'GET', 		
             headers: { 
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            url: getAllTransaction_URL
        });
    }
     
    this.getLatestPuzzle = function() {   
        return $http({
            method: 'GET', 		
             headers: { 
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            url: getLatestPuzzle_URL
        });
    }
    
    this.getAllPuzzle = function() {   
        return $http({
            method: 'GET', 		
             headers: { 
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            url: getAllPuzzle_URL
        });
    }
    
    this.getAllBlocks = function() {   
        return $http({
            method: 'GET', 		
             headers: { 
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            url: getAllBlocks_URL
        });
    }
    
     this.getLatestTransaction = function() {   
        return $http({
            method: 'GET', 		
             headers: { 
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            url: getLatestTransaction_URL
        });
    }
    
    this.getTransByBlockId = function(bid) {   
     return $http({
        method: 'GET', 		
         headers: { 
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        url: getTransByBlockId_URL + bid
    });
    }
	this.generateUsername = function() {   
        return $http({
            method: 'GET', 		
             headers: { 
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            url: generateUsernameURL
        });
    }
    
    
}]); 