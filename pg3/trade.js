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



var rows = "";
var ordKeys = Object.keys(obj).sort(function(a,b){return obj[b]-obj[a]}); // pass inside a function if you want specific order
var key;
var sliced = ordKeys.slice(0,20)
for (var i = 0, len = sliced.length; i < len; i +=1) {
    key = sliced[i]
    ind = [i+1]
    rows +=  "<tr class = 'myTableRow'><td class = 'myTableData'>"+ "#" + ind + ". " + '<td onclick="gg(this)" id = myTablePorts>' + key + "</td></td><td>" + '<img src="gold_coins.gif" style = "width:14px;height:14px;" alt="MDN">  ' + obj[key] + "</td></tr>";
}

var unix_timestamp = obj["timestamp"]["server"];
var date = unix_timestamp*1000;
var curdate = (new Date).getTime();
var diff = curdate - date

function msToTime() {
    var milliseconds = parseInt((diff%1000)/100)
        , seconds = parseInt((diff/1000)%60)
        , minutes = parseInt((diff/(1000*60))%60)
        , hours = parseInt((diff/(1000*60*60))%24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    time = "Time since last update:<font color='red'> " + hours + "h:" + minutes + "m:" + seconds + "s</font> (this page will take around 15 minutes to update after resource prices get recalculated!)"
    document.getElementById("lastupdate").innerHTML = time;
}

jQuery(document).ready(function(){
  $(rows).appendTo( "#itemList tbody" );
  msToTime();
});
