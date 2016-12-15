// Copyright (c) 2016 Lelis Alves, Rodrigo Vieira. All rights reserved.
// Use of this source code is governed by a Apache license that can be
// found in the LICENSE file.

/**
* Get the current URL.
*
* @param {function(string)} callback - called when the URL of the current tab
*   is found.
*/

(function(){

  var app = angular.module('blockWhatsApp', []);
  
  app.controller('PopupController',  ['$scope', function($scope) {
	var popupController = this;
	
	$scope.desc 			= chrome.i18n.getMessage("scopeDesc");
	$scope.btn_clear 		= chrome.i18n.getMessage("scopeBtnClear");
	$scope.btn_clearall 	= chrome.i18n.getMessage("scopeBtnClearAll");
	$scope.btn_changepw 	= chrome.i18n.getMessage("scopeBtnChangepw");
	$scope.place_newword	= chrome.i18n.getMessage("scopePlaceNewWord");
	$scope.place_newpw		= chrome.i18n.getMessage("scopePlaceNewpw");
	$scope.err_wrong		= chrome.i18n.getMessage("scopeErrWrong");
	  
	popupController.stateBtnPassaword = 1;//"Save";
	popupController.showError = false;  

	popupController.words = [{value: 'familia', active: true}];

	chrome.storage.sync.get('words',
		function (item){

		  if( Object.prototype.toString.call( item.words ) === '[object Array]' ) {
			popupController.words = [];
			angular.forEach(item.words, function(word) {
			  popupController.words.push(word);

			});
			$scope.$apply();
		  }
		});
		
	chrome.storage.sync.get('password',
		function (passwordObj){			
			password = passwordObj.password;
			popupController.showContent = true;
			popupController.showPassword = false;
			if( password && password.length > 0) {
				popupController.passwordOriginalValue = password;
				popupController.showPassword = true;
				popupController.showContent = false;
				popupController.stateBtnPassaword = 2;//"Login";
				
				//$scope.$emit('ui:focus', '#password');
			}
			else
			{
				//$scope.$emit('ui:focus', '#word');
			}
			$scope.$apply();
		});

	popupController.addWord = function() {
		popupController.wordValue = popupController.wordValue.trim();
		if(popupController.wordValue.length > 1)
		{			
			popupController.words.push({value:popupController.wordValue, active:true});
			popupController.wordValue = '';
			popupController.saveChanges();
		}

	};

	popupController.saveChanges = function()
	{
	  chrome.storage.sync.set({'words': popupController.words }, function() {

	  });
	}
	popupController.addPassword = function()
	{
	 
	  popupController.showContent = false;
	  popupController.showPassword = true;
	  popupController.showError = false; 	 
	  popupController.stateBtnPassaword = 1;//"Save";
	}

	popupController.addPasswordValue = function()
	{
		if(popupController.stateBtnPassaword == 2)//"Login"
		{
			if(popupController.passwordOriginalValue == popupController.passwordValue)
			{
				popupController.showContent = true;
				popupController.showPassword = false;
				popupController.showError = false;  
				popupController.passwordValue = '';				
				//$scope.$emit('ui:focus', '#word');
			}
			else
			{
				popupController.showError = true;  
				//$scope.$emit('ui:focus', '#password');
			}
		}
		else{
			chrome.storage.sync.set({'password': popupController.passwordValue }, function() {
				popupController.showContent = true;
				popupController.showPassword = false;
				//$scope.$emit('ui:focus', '#word');
				$scope.$apply();				
			});
		}
	  
	  
    }

	popupController.clearSingle = function(index) {

	  popupController.words.splice(index,1);

      popupController.saveChanges();
    };

	popupController.clearUncheckeds = function() {
	  var olds = popupController.words;
	  popupController.words = [];
	  angular.forEach(olds, function(old) {
		if (old.active)
		{
		  popupController.words.push(old);
		}
	  });
	  popupController.saveChanges();
	};

	popupController.clearAll = function() {
	  popupController.words = [];
	  popupController.saveChanges();
	};

  }]);

})();


/*

*/