document.addEventListener('click', textMining, true);

$("body").select(function(){console.log("selected"); textMining();});

function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}

var ignoreWords = ["","have","her","there","the","be","to","of","and","a","in","that","it","for","on","with","as","at","this","but","his","by","from","they","or","an","will","would","so","even","is","be","am","are"];

function textMining(){
  var text = getSelectionText().toLowerCase();
  var wordCounts = { };
  var words = text.split(/\s*[\s\.,-\/#!?$%\^&\*;:{}=\-_`~()–]\s*/);

  for(var i = 0; i < words.length; i++){
    word = words[i];
    if ($.inArray(word, ignoreWords) > -1){
		continue;
	}
	if (wordCounts["_" + word]){
		wordCounts["_" + word] = wordCounts["_" + word] + 1;
	}
	else {
		wordCounts["_" + word] = 1;
	}
  }
  
  //deal with easy plurals
  for (var word in wordCounts){
	  if(wordCounts[word+"s"]){
		  wordCounts[word] = wordCounts[word]+wordCounts[word+"s"];
		  delete wordCounts[word+"s"];
	  }
  }
  
  console.log(wordCounts);
  var tuples = [];

  for (var key in wordCounts) tuples.push([key, wordCounts[key]]);

  tuples.sort(function(a, b) {
    a = a[1];
    b = b[1];

    return a > b ? -1 : (a < b ? 1 : 0);
  });
  
  var count = 0;
  var str = "";
  for (var i = 0; i<tuples.length; i++){
	  count ++;
	  if (count > 20 || tuples[i][1] < 2){
		  break;
	  }
	  str += "\""+tuples[i][0].slice(1,tuples[i][0].length)+"\", ";
  }
  alert(str);
}
