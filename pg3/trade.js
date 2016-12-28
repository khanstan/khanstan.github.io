
function getJSON(url) {
    var resp ;
    var xmlHttp ;

    resp  = '' ;
    xmlHttp = new XMLHttpRequest();

    if(xmlHttp != null)
    {
    xmlHttp.open( "GET", url, false );
        xmlHttp.send( null );
        resp = xmlHttp.responseText;
     }

    return resp ;
}



var str = getJSON('https://api.myjson.com/bins/1aerrh') ;

var obj = jQuery.parseJSON(str);

var keysSorted = Object.keys(obj).sort(function(a,b){return obj[b]-obj[a]})


var table = document.createElement('table');
var rows = "";
var ordKeys = Object.keys(obj).sort(function(a,b){return obj[b]-obj[a]}); // pass inside a function if you want specific order
var key;
var sliced = ordKeys.slice(0,10)
for (var i = 0, len = sliced.length; i < len; i +=1) {
    key = sliced[i]
    ind = [i+1]
    rows +=  "<tr class = 'myTableRow'><td>"+ "#" + ind + ". " + key +"</td><td>" + obj[key] + " gold" + "</td></tr>";
}

jQuery(document).ready(function(){
  $(rows).appendTo( "#itemList tbody" );
});
