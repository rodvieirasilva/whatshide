// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
* Get the current URL.
*
* @param {function(string)} callback - called when the URL of the current tab
*   is found.
*/

(function(){

  angular.module('blockWhatsApp', [])
  .controller('PopupController',  ['$scope',function($scope) {
    var popupController = this;
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

    popupController.addWord = function() {
      popupController.words.push({value:popupController.wordValue, active:true});
      popupController.wordValue = '';

      popupController.saveChanges();

    };

    popupController.saveChanges = function()
    {
      chrome.storage.sync.set({'words': popupController.words }, function() {

        $scope.$apply();

      });


    }

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


// document.addEventListener('DOMContentLoaded', function() {

// //chrome.storage.sync.get('value',
// //	function (item){
// //		$("#txtIngorar").val(item.value.toString());
// //	});

// //$( "#btnSalvar" ).click(saveIgnore);


// });

// function saveIgnore() {
// // Save it using the Chrome extension storage API.
// chrome.storage.sync.set({'value': $("#txtIngorar").val().split(',') }, function() {});
// }
