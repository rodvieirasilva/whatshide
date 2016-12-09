//do some things
setTimeout(continueExecution, 100); //wait ten seconds before continuing

var str;

function containsAny(str, substrings) {
  for (var i = 0; i != substrings.length; i++) {
    if(substrings[i].active) {
      var substring = substrings[i].value.trim();
      if (str.indexOf(substring) != - 1) {
        return substring;
      }
    }
  }
  return null;
}


function percorrerChats(index) {
  var el = $(this);
  str = el.html();

  if (containsAny(str, substrings)) {
    el.parent().parent().hide();
  }
  else {
    el.parent().parent().show();
  }

}
var substrings;

function onGetValue(item) {
  substrings = item.words;
  var itens  = document.querySelectorAll(".chat");
  $(itens).each(percorrerChats);

  setTimeout(continueExecution, 100);
}

function continueExecution() {
  chrome.storage.sync.get('words', onGetValue);
}


/*menu-item menu-shortcut
class="dropdown"
<li tabindex="-1" class="menu-item menu-shortcut" style="opacity: 1; transform: translateY(0px);">
<a class="ellipsify" title="Marcar como não lida">Marcar como não lida</a></li>

*/
