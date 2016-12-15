// Copyright (c) 2016 Lelis Alves, Rodrigo Vieira. All rights reserved.
// Use of this source code is governed by a Apache license that can be
// found in the LICENSE file.

(function() {

    var app = angular.module('blockWhatsApp', []);

    /**
     * Directive for set focus in angular
     */
    app.directive('focusOn', function($timeout) {
        return {
            restrict: 'A',
            link: function($scope, $element, $attr) {
                $scope.$watch($attr.focusOn, function(_focusVal) {
                    $timeout(function() {
                        _focusVal ? $element[0].focus() :
                            $element[0].blur();
                    });
                });
            }
        }
    });

    /**
     * Initialize Controller of Popup
     */
    app.controller('PopupController', ['$scope', function($scope) {
        var popupController = this;

        //Scopes strings
        $scope.desc = chrome.i18n.getMessage("scopeDesc");
        $scope.btn_clear = chrome.i18n.getMessage("scopeBtnClear");
        $scope.btn_clearall = chrome.i18n.getMessage("scopeBtnClearAll");
        $scope.btn_changepw = chrome.i18n.getMessage("scopeBtnChangepw");
        $scope.place_newword = chrome.i18n.getMessage("scopePlaceNewWord");
        $scope.place_newpw = chrome.i18n.getMessage("scopePlaceNewpw");
        $scope.err_wrong = chrome.i18n.getMessage("scopeErrWrong");

        //vars to Control state of the screen
        popupController.stateBtnPassaword = 1; //"Save";
        popupController.showError = false;

        //Add default WordExample
        popupController.words = [{
            value: chrome.i18n.getMessage("wordExample"),
            active: true
        }];

        chrome.storage.sync.get('words',
            function(item) {
                if (Object.prototype.toString.call(item.words) === '[object Array]') {
                    popupController.words = [];
                    angular.forEach(item.words, function(word) {
                        popupController.words.push(word);
                    });
                    $scope.$apply();
                }
            });

        chrome.storage.sync.get('password',
            function(passwordObj) {
                password = passwordObj.password;
                popupController.showContent = true;
                if (password && password.length > 0) {
                    popupController.passwordOriginalValue = password;
                    popupController.showContent = false;
                    popupController.stateBtnPassaword = 2;
                }
                $scope.$apply();
            });

        /**
         * Add Word in the list of hide words chats
         * @memberof popupController
         */
        popupController.addWord = function() {
            popupController.wordValue = popupController.wordValue.trim();
            if (popupController.wordValue.length > 1) {


                for (var i = 0; i < popupController.words.length; i++) {
                    if (popupController.words[i].value.toLowerCase() == popupController.wordValue.toLowerCase()) {
                        return;
                    }
                }

                popupController.words.push({
                    value: popupController.wordValue,
                    active: true
                });
                popupController.wordValue = '';
                popupController.saveChanges();
            }
        };
        /**
         * Save changes of the words into storage
         * @memberof popupController
         */
        popupController.saveChanges = function() {
            chrome.storage.sync.set({
                'words': popupController.words
            }, function() { /*do nothing*/ });
        }

        /**
         * Change the current state of creen for to mode Add Password
         * @memberof popupController
         */
        popupController.addPasswordMode = function() {

            popupController.showContent = false;
            popupController.showError = false;
            popupController.stateBtnPassaword = 1; //"Save";
        }

        /**
         * Add the password int the storage or realize login
         * @memberof popupController
         */
        popupController.passwordEntered = function() {
            if (popupController.stateBtnPassaword == 2) //"Login"
            {
                if (popupController.passwordOriginalValue == popupController.passwordValue) {
                    popupController.showContent = true;
                    popupController.showError = false;
                    popupController.passwordValue = '';
                } else {
                    popupController.showError = true;
                }
            } else {
                chrome.storage.sync.set({
                    'password': popupController.passwordValue
                }, function() {
                    popupController.showContent = true;
                    $scope.$apply();
                });
            }


        }

        /**
         * Clear a single word from index
         * @param {number} index Index to remove
         *  @memberof popupController
         */
        popupController.clearSingle = function(index) {

            popupController.words.splice(index, 1);

            popupController.saveChanges();
        };
        /**
         * Clear uncheckeds Words
         * @memberof popupController
         */
        popupController.clearUncheckeds = function() {
            var olds = popupController.words;
            popupController.words = [];
            angular.forEach(olds, function(old) {
                if (old.active) {
                    popupController.words.push(old);
                }
            });
            popupController.saveChanges();
        };

        /**
         * Clear All Words
         * @memberof popupController
         */
        popupController.clearAll = function() {
            popupController.words = [];
            popupController.saveChanges();
        };

    }]);

})();


/*

*/
