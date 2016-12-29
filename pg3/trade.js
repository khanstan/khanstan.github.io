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



var str = getJSON('data.json') ;

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
    rows +=  "<tr class = 'myTableRow'><td class = 'myTableData'>"+ "#" + ind + ". " + '<td onclick="gg(this)" id = myTablePorts>' + key + "</td></td><td>" + '<img src="gold_coins.gif" style = "width:14px;height:14px;" alt="MDN">  ' + obj[key] + "</td></tr>";
}

jQuery(document).ready(function(){
  $(rows).appendTo( "#itemList tbody" );
});
