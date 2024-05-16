function getJSON(url) {
    const xmlHttp = new XMLHttpRequest();

    xmlHttp.open( "GET", url, false );
    xmlHttp.send( null );

    return xmlHttp.responseText;
}

const str = getJSON('uniques.json');

const obj = JSON.parse(str);


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
	const req = row['uniqueRequirements']
	const mod = row['uniqueModifiers']
    return req + '</br><span class="modifiers">' + mod + '</span>'
}

function main(data, type, row) {
	const name  = row['uniqueName']
	const base = row['baseItem']
	const _type = row['type']
	const type2 = row['type2']
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
