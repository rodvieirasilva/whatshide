//do some things
setTimeout(continueExecution, 100); //wait ten seconds before continuing

String.prototype.strip = function(){
 return this
         .replace(/[áàãâä]/gi,"a")
         .replace(/[éè¨ê]/gi,"e")
         .replace(/[íìïî]/gi,"i")
         .replace(/[óòöôõ]/gi,"o")
         .replace(/[úùüû]/gi, "u")
         .replace(/[ç]/gi, "c")
         .replace(/[ñ]/gi, "n")
         .replace(/[^a-zA-Z0-9]/g," ");
}

String.prototype.containsAny = function(substrings) {
  for (var i = 0; i != substrings.length; i++) {    
	  var substring = substrings[i].toLowerCase().strip();
	  if (this.indexOf(substring) != - 1) {
		return substring;
	  }    
  }
  return null;
}


function percorrerChats(index) {
  var el = $(this);
  var str = el.html();

  if (str.toLowerCase().strip().containsAny(substrings)) {
    el.parent().parent().hide();
  }
  else {
    el.parent().parent().show();
  }

}
var substrings;

function onGetValue(item) {
  
  substrings = [];
  for(var i=0;i<item.words.length;i++)
  {
	  if(item.words[i].active)
	  {
		substrings = substrings.concat(item.words[i].value.split(" "));
	  }
  }
  
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
