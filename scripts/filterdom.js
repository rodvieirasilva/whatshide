// Copyright (c) 2016 Lelis Alves, Rodrigo Vieira. All rights reserved.
// Use of this source code is governed by a Apache license that can be
// found in the LICENSE file.


setTimeout(initExecution, 1000); //Init execution of the process all chats

/**
 * Strip special caracter of string
 *  @memberof String
 */
String.prototype.strip = function () {
    return this
        .replace(/[áàãâä]/gi, "a")
        .replace(/[éè¨ê]/gi, "e")
        .replace(/[íìïî]/gi, "i")
        .replace(/[óòöôõ]/gi, "o")
        .replace(/[úùüû]/gi, "u")
        .replace(/[ç]/gi, "c")
        .replace(/[ñ]/gi, "n")
        .replace(/[^a-zA-Z0-9]/g, " ");
}

/**
 * Veirfy if a specific string contains any substring in subtrings param
 *  @param {Array.<string>} subtrings Substrings Array to check if contains in string
 *  @memberof String
 */
String.prototype.containsAny = function (substrings) {

    for (var i = 0; i != substrings.length; i++) {
        var substring = substrings[i].toLowerCase().strip().split(" ");
        var containsSub = true;
        for (var j = 0; j < substring.length; j++) {
            if (this.indexOf(substring[j]) == -1) {
                containsSub = false;
                break;
            }
        }
        if (containsSub) {
            return containsSub;
        }
    }
    return false;
}

/**
 * Process a chat of the WhatsApp Web
 *  @param {number} index Index of the current chat
 */
function processChat(index) {
    var el = $(this);
    var str = el.html();

    if (str.toLowerCase().strip().containsAny(substrings)) {
        el.hide();
    } else {
        el.show();
    }
}

var whatsappAllChatSelector = undefined;

function getChatSelector(callback) {
    if (whatsappAllChatSelector) {
        return callback(whatsappAllChatSelector);
    }
    $.get("https://api.jsonsilo.com/public/16e3e062-84a0-4a49-8c1d-ba42b07da8c0").always(
        function (data) {
            var selector = ".lhggkp7q";
            if (data && data.whatsapp_all_chat_selector) {
                selector = data.whatsapp_all_chat_selector;
            }
            whatsappAllChatSelector = selector;
            callback(whatsappAllChatSelector);
        }
    );
}

/**
 * Var with the substrings of the storage
 */
var substrings;

var currentTimeout = undefined;
/**
 * On get value of the current Storage
 *  @param {Array.<Object>} item Arrays of Words in the storage
 */
function onGetValue(item) {

    substrings = [];
    if (item && item.words && Object.prototype.toString.call(item.words) === '[object Array]') {
        for (var i = 0; i < item.words.length; i++) {
            if (item.words[i].active) {
                substrings = substrings.concat(item.words[i].value);
            }
        }
    }
    getChatSelector(
        function (selector) {
            clearTimeout(currentTimeout);
            var itens = document.querySelectorAll(selector);
            //Process all chats
            $(itens).each(processChat);
            //Continue the execution
            currentTimeout = setTimeout(initExecution, 1000);
        }
    )

}

/**
 * init Execution
 */
function initExecution() {
    chrome.storage.sync.get('words', onGetValue);
}
