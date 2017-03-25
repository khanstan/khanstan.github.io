function getJSON(url) {
    var resp;
    var xmlHttp;

    resp  = '';
    xmlHttp = new XMLHttpRequest();

    if(xmlHttp != null)
    {
    xmlHttp.open( "GET", url, false );
        xmlHttp.send( null );
        resp = xmlHttp.responseText;
     }

    return resp;
}



var str = getJSON('resources/data.json');

var obj = JSON.parse(str);


var profitable_ports = {
  'Tzogos-Tortuga': obj['Tzogos-Tortuga'],
  'Regis-Vaasburg': obj['Regis-Vaasburg'],
  'Tzogos-Aiora': obj['Tzogos-Aiora'],
  'Tortuga-Aiora': obj['Tortuga-Aiora'],
  'Seaglory-Aiora': obj['Seaglory-Aiora'],
  'Seaglory-Vaasburg': obj['Seaglory-Vaasburg']
};

var rows = "";
var rows2 = "";
var ordKeys = Object.keys(obj).sort(function(a,b){return obj[b]-obj[a]}); // pass inside a function if you want specific order
var ordKeys2 = Object.keys(profitable_ports).sort(function(a,b){return obj[b]-obj[a]});
var key;
var sliced = ordKeys.slice(0,20)
// first loop - all ports.
for (var i = 0, len = sliced.length; i < len; i +=1) {
    key = sliced[i];
    ind = [i+1];
    rows +=  "<tr class = 'myTableRow'><td class = 'myTableData'>"+ "#" + ind + ". " + '<td onclick="gg(this)" id = myTablePorts>' + key + "</td></td><td>" + '<img src="resources/gold_coins.gif" style = "width:14px;height:14px;" alt="MDN">  ' + obj[key] + "</td></tr>";
}

// second loop only proffitable.
for (var i = 0, len = ordKeys2.length; i < len; i +=1) {
  let key2 = ordKeys2[i];
  let ind = [i+1];
  rows2 += "<tr class = 'myTableRow'><td class = 'myTableData'>"+ "#" + ind + ". " + '<td onclick="gg(this)" id = myTablePorts>' + key2 + "</td></td><td>" + '<img src="resources/gold_coins.gif" style = "width:14px;height:14px;" alt="MDN">  ' + obj[key2] + "</td></tr>";
}



function msToTime() {
    var unix_timestamp = obj["timestamp"]["server"];
    var date = unix_timestamp*1000;
    var curdate = (new Date).getTime();
    var diff = curdate - date
    var milliseconds = parseInt((diff%1000)/100)
        , seconds = parseInt((diff/1000)%60)
        , minutes = parseInt((diff/(1000*60))%60)
        , hours = parseInt((diff/(1000*60*60)));

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    time = "Time since last update:<font color='red'> " + hours + "h:" + minutes + "m:" + seconds + "s</font> (this page will take around 15 minutes to update after resource prices get recalculated!)";
    document.getElementById("lastupdate").innerHTML = time;
    return console.log()
}

// handling switch between the 2 tables.
var tableA = document.getElementById("itemList");
var tableB = document.getElementById("itemList2");

var btn = document.getElementById("switch");

btn.onclick = function () {
    if (tableA.style.display == "none") {
      tableA.style.display = "table";
      tableB.style.display = "none";
      this.innerText = '[Display most used routes.]'
    } else {
      tableA.style.display = "none";
      tableB.style.display = "table";
      this.innerText = '[Display all routes]'
    }
};
// end switch

(function() {
    var tbody1 = document.getElementById('itemList').getElementsByTagName('tbody')[0];
    var tbody2 = document.getElementById('itemList2').getElementsByTagName('tbody')[0];

    tbody1.innerHTML += rows;
    tbody2.innerHTML += rows2;
    msToTime();
    
})();

/*jQuery(document).ready(function(){
  $(rows).appendTo( "#itemList tbody" );
  $(rows2).appendTo( "#itemList2 tbody" );
  msToTime();
});*/
