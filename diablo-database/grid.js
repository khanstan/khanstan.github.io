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


var str = getJSON('uniques.json');

var obj = JSON.parse(str);


$(document).ready(function() {
    $('#example').DataTable({
    	data: obj,
        "columns": [
            {data:"id"},
            null,
            null,
            null
        ],
        columnDefs: [{
        	"targets": 1,
        	render: image
        },{
        	"targets": 2,
        	render: main
        },{
        	"targets": 3,
        	render: modifiers
        }],
        mark: true
    } )
} );

function modifiers(data, type, row) {
	let req = row['uniqueRequirements']
	let mod = row['uniqueModifiers']
    return req + '</br><span class="modifiers">' + mod + '</span>'
}

function main(data, type, row) {
	let name  = row['uniqueName']
	let base = row['baseItem']
	let _type = row['type']
	let type2 = row['type2']
	if (row['type'] == 'unique') {
		return '<span class = "unique">' + name + '</span></br>' + base + '</br>	' + type2 
	} else {
		return name + '</br>' + base + '</br>' + type2
	}
        		//if row['type'] == unique change class color...
	
}

function image(date, type, row) {
	return '<img src="' + row['uniqueSrcIcon'] + '"></img>'
}