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



var str1 = getJSON('resources/old.json');
var str2 = getJSON('resources/new.json');
var str3 = getJSON('resources/map.json');
var obj1 = jQuery.parseJSON(str1);
var obj2 = jQuery.parseJSON(str2);
var obj3 = jQuery.parseJSON(str3);

var rows = "";

var map = obj3['url']

for (var i = 0, len = Object.keys(obj1).length; i < len; i +=1) {
    ind = [i+1];
    key = Object.keys(obj1)[i];
    yesterday = Number(obj1[key]['pop']);
    today = Number(obj2[key]['pop']);

    difference = function() {
      var result;
      var style;
      result = today - yesterday;
      if (result < 0) {
        style = ' class = negative>' + result.toLocaleString();
      } else if (result > 0){
        style = ' class = positive> +' + result.toLocaleString();
      } else {
        style = '>' + result;
      }
      return style;
    }

    rows += '<tr><td>' + key + '</td><td>' + yesterday.toLocaleString() + '</td><td>' + today.toLocaleString() + '</td><td' + difference() + '</td></tr>';
}


jQuery(document).ready(function(){
  $(rows).appendTo( "#dataTable" );
});
