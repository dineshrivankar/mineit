 
angular.module("investorApp") 
.controller("investorsCtrl", ["$scope","$rootScope", "investorService",'$location','$window',"moment","$route","$interval","$routeParams","$modal", function ($scope,$rootScope, investorService, $location,$window,moment,$route,$interval,$routeParams,$modal) {   
   
    //Socket Connection
    var socket = io.connect();
    $scope.currentSeconds = '';
	
	//Header
    $scope.loggedInUser= "";
    $rootScope.isHeaderShow = false;
    $rootScope.isFooterShow = false;
    //Login Screen code starts here-----------------
    
    //SignIn 
    $scope.isSignInError = false;
    $scope.errorSignInMessage = "";
    $scope.frmSignIn={}; 
    $scope.frmSignIn.signInEmail ="";
    $scope.frmSignIn.signInPassword = "";
    $scope.isSignInLoaded = false;
    
    //SignUp
    $scope.isSignUpErrorMessage = false;
    $scope.errorSignUpMessage = "";
    $scope.frmSignUp={}; 
    $scope.frmSignUp.signUpEmail ="";
    $scope.frmSignUp.signUpPassword = "";
    $scope.isSignUpLoaded = false; 
    
    //Send Coins
    $scope.isSendCoinError = false;
    $scope.errorSendCoinMsg = "";
    $scope.frmSendCoin={}; 
    $scope.frmSendCoin.toUserName ="";
    $scope.frmSendCoin.coin = 0;
    $scope.availableCoins = 0;
	
	//Save Puzzle
    $scope.isSavePuzzleError = false;
    $scope.errorSavePuzzleMsg = "";
    
    // Tab selection
    $scope.selectedTab = "";     
    $scope.latestTransDtl = "";
     
    
    $scope.signUp = function(frmSignUp){
		
         investorService.generateUsername()
                 .success(function(response){  
                   $scope.frmSignIn.signInEmail = response;                    
                }).error(function(error){ 
                  $scope.errorSignUpMessage = error;  
                  $scope.isSignUpErrorMessage = true;
                  $scope.isSignUpLoaded = false;
             }); 
		/*if($scope.frmSignIn.signInEmail.trim() == ""){
            $scope.errorSignInMessage = "Please enter username!";  
            $scope.isSignInError = true;
        }else if($scope.frmSignIn.signInEmail.length < 5){
            $scope.errorSignInMessage = "Username must be greater than 5 characters";  
            $scope.isSignInError = true;
        }else if(!ValidateSpace($scope.frmSignIn.signInEmail)){
            $scope.errorSignUpMessage = "Space is not allowed in Username";  
            $scope.isSignUpErrorMessage = true;
        }
        
        else{
            $scope.isSignUpLoaded = true;
           var param = {
                          "username": $scope.frmSignIn.signInEmail
                        }
            var myData = $scope.methodSerialize(param); 
            
           investorService.registerUser(myData)
                 .success(function(response){  
                    $location.path('/dashboard', true);
                    $scope.isSignUpLoaded = false; 
                    $window.sessionStorage.setItem("loggedInUserName",$scope.frmSignUp.signUpEmail)
                    $rootScope.isHeaderShow = true;
                    $rootScope.isFooterShow = true;
                    $scope.loggedInUser = $scope.frmSignUp.signUpEmail;
                    $scope.getDashBoardDetails();
                    $('body').css({"padding":"70px 0 40px 0"});
                    clearAll();
                }).error(function(error){ 
                  $scope.errorSignUpMessage = error;  
                  $scope.isSignUpErrorMessage = true;
                  $scope.isSignUpLoaded = false;
             });
        }         */
   }; 
    
    $scope.login = function(frmSignIn){ 
        $scope.frmSignIn.signInEmail = $scope.frmSignIn.signInEmail.toLowerCase();
		if($scope.frmSignIn.signInEmail.trim() == ""){
            $scope.errorSignInMessage = "Please enter username!";  
            $scope.isSignInError = true;
        }else if($scope.frmSignIn.signInEmail.length < 3 || $scope.frmSignIn.signInEmail.length > 20){
            $scope.errorSignInMessage = "Username must be greater than 3 and less then 20 characters";  
            $scope.isSignInError = true;
        }
        else{ 
            $scope.isSignInLoaded = true;
            var param = {
                          "username": $scope.frmSignIn.signInEmail
                        }
            var myData = $scope.methodSerialize(param); 
            
           investorService.registerUser(myData)
                 .success(function(response){  
                    $location.path('/dashboard', true);
                    $scope.isSignInLoaded = false; 
                    $window.sessionStorage.setItem("loggedInUserName",$scope.frmSignIn.signInEmail)
                    $rootScope.isHeaderShow = true;
                    $rootScope.isFooterShow = true;
                    $scope.loggedInUser = $scope.frmSignIn.signInEmail;
                    $scope.getDashBoardDetails();
                    $('body').css({"padding":"70px 0 40px 0"});
                    clearAll();
                }).error(function(error){ 
                    $scope.errorSignInMessage = error;  
                    $scope.isSignInError = true;
                    $scope.isSignInLoaded = false;
             }); 
        }        
   };

    $scope.logOut = function(){
        $rootScope.isHeaderShow = false;
        $rootScope.isFooterShow = false;
        $('body').css({ "padding":"0" });
        $window.sessionStorage.setItem("loggedInUserName","");
        clearAll()
		$window.location.reload('/login');
    };
    
    $scope.methodSerialize = function (obj) {
                 var str = [];
                 for (var p in obj)
                     if (obj.hasOwnProperty(p)) {
                         str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                     }
                 return str.join("&");
             }
     
    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }    
    
    function ValidateSpace(email) {
         var re = /^\S+$/;
        return re.test(email);
        
    }
    
     function clearAll(){
        $scope.isSignInError = false;
        $scope.errorSignInMessage = "";
        $scope.frmSignIn={}; 
        $scope.frmSignIn.signInEmail ="";
        $scope.frmSignIn.signInPassword = "";

        //SignUp
        $scope.isSignUpErrorMessage = false;
        $scope.errorSignUpMessage = "";
        $scope.frmSignUp={};  
        $scope.frmSignUp.signUpEmail ="";
        $scope.frmSignUp.signUpPassword = "";
        $scope.latestTransDtl = "";
    }
    
    //Login Screen code ends here-----------------
    
    //DashBoard Screen code starts here-----------------
    
      $scope.getDashBoardDetails = function(){  
         $scope.loggedInUser = window.sessionStorage.getItem("loggedInUserName");
           investorService.getUserDetail($scope.loggedInUser)
                 .success(function(response){ 
                    $rootScope.dashBoardDtl = response; 
                    $scope.availableCoins = response.balance;
                }).error(function(error){ 
                  console.log("Error in loading dashboard!")
             });  
    }; 
    
     $scope.getLatestTransactions = function(){  
         $scope.latestTransDtl = "";
           investorService.getLatestTransaction()
                 .success(function(response){ 
                   if(response){
                     $scope.latestTransDtl = response; 
                   }                   
                }).error(function(error){ 
                  console.log("Error in loading dashboard!")
             }); 
             
   }; 
    
    $scope.gotoDashBoard = function(){
         $location.path('/dashboard', true); 
    }
     
    $scope.gotoAllTransactions = function(){
         $location.path('/transaction', true);
    }
    
     $scope.gotoBlocks = function(){
         $location.path('/block', true);
    }
     
    $scope.gotoSendCoin = function(){
         $location.path('/sendCoin', true);
    }
    
    //DashBoard Screen code starts here-----------------
    
    //Send Coins Screen Code starts here -----------------
    
     $scope.sendCoin = function(frmSendCoin){ 
          if(($scope.frmSendCoin.toUserName.trim()).length <= 0){
            $scope.isSendCoinError = true;
            $scope.errorSendCoinMsg ="Please enter username!";
            return;
         }
         if($scope.availableCoins < $scope.frmSendCoin.coin){
            $scope.isSendCoinError = true;
            $scope.errorSendCoinMsg ="Insufficient balance!";
            return;
         }else if($scope.frmSendCoin.coin <= 0){
            $scope.isSendCoinError = true;
            $scope.errorSendCoinMsg ="Amount must be greater than 0";
            return;
         }
         var frmUser = $window.sessionStorage.getItem("loggedInUserName");
          
           var param = {
                          "fromUser": frmUser,
                          "toUser": $scope.frmSendCoin.toUserName,
                          "amount": $scope.frmSendCoin.coin
                        }
            var myData = $scope.methodSerialize(param); 
            
           investorService.sendCoin(myData)
                 .success(function(response){   
                     $scope.isSendCoinError = true;
                     $scope.errorSendCoinMsg = "Transfer Successful!";
                     $scope.availableCoins  = $scope.availableCoins - $scope.frmSendCoin.coin;
                     $rootScope.$broadcast("availableCoins", $scope.availableCoins);
                     $scope.frmSendCoin={}; 
                     $scope.frmSendCoin.toUserName ="";
                     $scope.frmSendCoin.coin = 0;
                     //scope.getDashBoardDetails();
                
                }).error(function(error){ 
                   $scope.isSendCoinError = true;
                   $scope.errorSendCoinMsg = error;
             }); 
        }     
    
    //Send Coins Screen Code ends here -----------------
    
     	//Transaction  Screen code starts here-----------------    
       
      $scope.maxVisibleConnectionCount = 5;
      $scope.getTransaction = function(){
           $scope.isSignUpLoaded = true; 
                investorService.getAllTransaction()
                 .success(function(response){ 				 
				    $location.path('/transaction', true);
                    $scope.transactionDtl = response;
                    $scope.isSignUpLoaded = false;                
                    $scope.isHeaderShow = true;
                    $scope.isFooterShow = true;
                }).error(function(error){ 
                  console.log("Error in loading transaction!")
             });  
      }; 
    
      $scope.getTransactionById = function(bid){
           $scope.isSignUpLoaded = true;	 
                investorService.getTransByBlockId(bid)
                 .success(function(response){ 				 
				    //$location.path('/transaction', true);
                    $scope.transactionDtl = response;
                    $scope.isSignUpLoaded = false;                
                    $scope.isHeaderShow = true;
                    $scope.isFooterShow = true;
                }).error(function(error){ 
                  console.log("Error in loading transaction!")
             }); 
     }; 
    
    /****************************************************/
    /*****************   GET ALL BLOCK  *****************/
    $scope.getAllBlockDetails = function(){
        investorService.getAllBlocks()
         .success(function(response){ 
            $scope.blockDetails = response; 
            console.log("blcok details ", $scope.blockDetails )
        }).error(function(error){ 
          console.log("Error in loading dashboard!")
        }); 
    }; 
    
    $scope.gotoTransactionId = function(id){
      $location.path('/transaction/'+id, true);
    }
    
     $rootScope.$on( "$routeChangeStart", function(event, next, current) { 
        if(next.originalPath=="/dashboard"){
            $scope.getDashBoardDetails();
            $scope.getLatestTransactions();            
            $scope.selectedTab = "dashboard";
        }else if(next.originalPath=="/transaction/:bid"){
			$scope.getTransactionById(next.params.bid);
            $scope.selectedTab = "transaction";
        }else if(next.originalPath=="/transaction"){			
			$scope.getTransaction();
            $scope.selectedTab = "transaction";
        }else if(next.originalPath=="/block"){			
			$scope.getAllBlockDetails();
            $scope.selectedTab = "block";
        }else if(next.originalPath=="/sendCoin"){
			$scope.getDashBoardDetails();
            $scope.selectedTab = "sendCoin";
            $scope.isSendCoinError =false;
        }else{
            $rootScope.isHeaderShow = false;
            $rootScope.isFooterShow = false;
           // $('body').css({ "padding":"0" }); 
        } 
         
     });
    
    
    $scope.getAllUserDetail = function(){                   
       investorService.getAllUserDetail().success(function(response){ 
                $scope.allUserDetail = response;                                                                          
            }).error(function(error){ 
              console.log("Error in loading user details!");
         });
   };
                                
    $scope.suggetionList= function(){
      $scope.results=[];
        for (var i=0; i < $scope.allUserDetail.length; i++) {
            if ($scope.allUserDetail[i].userName.toLowerCase().startsWith($scope.frmSendCoin.toUserName.toLowerCase())) {
                $scope.results.push($scope.allUserDetail[i].userName);
                if($scope.results.length>4)return false;
            }
        }
    }

    angular.element(document).ready(function(){
        $scope.getAllUserDetail();
        var homeUrl =$location.path()// window.location.href.split()
        if(homeUrl.indexOf('dashboard') <= -1 && homeUrl.indexOf('block') <= -1 && homeUrl.indexOf('transaction') <= -1 && homeUrl.indexOf('sendCoin') <= -1 ){
            $rootScope.isHeaderShow = false;
            $rootScope.isFooterShow = false;
            $('body').css({ "padding":"0" }); 
        }else {
            $rootScope.isHeaderShow = true;
            $rootScope.isFooterShow = true; 
        }
    })

	
	$interval(function () {
		if ($rootScope.loggedInUser) {
			socket.emit('getTime');	
			if($scope.currentSeconds == 0){
				//Create Question and options 
				$scope.option = [];
				$scope.operators = [];
				$scope.numOperand = 3;
				var i = 0;
				for(i = 0; i < $scope.numOperand; i++) 	$scope.option[i] = Math.floor(Math.random()*900) + 100;
				$scope.question = $scope.option[0] + "+" + $scope.option[1];// + "+" + $scope.option[2];
				$scope.answer = eval($scope.option[0] + $scope.option[1]);// + $scope.option[2]);
			
				var param = {"question": $scope.question,"answer": $scope.answer};
				var myData = $scope.methodSerialize(param); 
				investorService.savePuzzle(myData)
					 .success(function(response){  
						$scope.questionID = response.pid;
						$scope.$emit('puzzleTime', $scope.questionID);
					}).error(function(error){ 
					   $scope.isSavePuzzleError = true;
					   $scope.errorSavePuzzleMsg = error;
					});				
				}      		
			}
	}, 1000);	

	socket.on('getTime', function(obj) {
		$scope.currentSeconds = obj;
		$scope.$apply();
	});
	  
	$scope.$on('puzzleTime', function(event, data){
		$scope.answer = '';		
		investorService.getLatestPuzzle()
			.success(function(response){ 
				if(response){
					$scope.question = response.question;
					$scope.options = $scope.question.split("+");
					$scope.questionID = response._id;
					var modalInstance = $modal.open({
						templateUrl: 'Templates/puzzle.html',
						controller: 'puzzleController',
						scope: $scope,		
					});	
				   }                   
				}).error(function(error){ 
				  console.log("Error in loading dashboard!")
			 }); 	
	});
	

}]); 
 