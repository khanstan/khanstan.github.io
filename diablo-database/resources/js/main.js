$(document).ready(function () {
	var query = window.location.hash.substring(1);
	

	if(query) {
		console.log(query);
		$(".typeahead").val(query);
		setTimeout(() => $(".typeahead").focus(), 0);
	};

    var keySet;
    var setObject;

    function ifUnique(check) {
    	if (check.length > 1) {
    		return 'Unique: ' +check;
    	}
    }

    function ifSet(check) {
    	if (check.length > 1) {
    		return 'Set: ' +check;
    	}
    }

	function hideVisible() {
		$('.runeword, .rune, .unique, .set, .one, .normal').removeClass().addClass('hidden');
		$('.setItemSrcIcon').attr('src', '');
		$('.setItemName, .setBaseItem, .setItemSrcIcon, .setItemRequirements, .setItemModifiers, .setItemBonuses').empty();
	};

	var dataSourceRunewords = new Bloodhound({
		datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name', 'runes'),
		queryTokenizer: Bloodhound.tokenizers.whitespace,
		prefetch: {
			url: "runewords.json",
			cache: false
		}
	});

	var dataSourceRunes = new Bloodhound({
		datumTokenizer: Bloodhound.tokenizers.obj.whitespace('runeName', 'type'),
		queryTokenizer: Bloodhound.tokenizers.whitespace,
		prefetch: {
			url: "runes.json",
			cache: false
		}
	});    

	var dataSourceUniques = new Bloodhound({
		datumTokenizer: Bloodhound.tokenizers.obj.whitespace('uniqueName', 'baseItem'),
		queryTokenizer: Bloodhound.tokenizers.whitespace,
		prefetch: {
			url: "uniques.json",
			cache: false
		}
	});

	var dataSourceSets = new Bloodhound({
		datumTokenizer: Bloodhound.tokenizers.obj.whitespace('setItemName', 'setBaseItem', 'setName'),
		queryTokenizer: Bloodhound.tokenizers.whitespace,
		prefetch: {
			url: "sets.json",
			cache: false,
			transform: function(response) {
                setObject = response;
                return response;
            }
	}
	});

	var dataSourceNormal = new Bloodhound({
		datumTokenizer: Bloodhound.tokenizers.obj.whitespace('itemName'),
		queryTokenizer: Bloodhound.tokenizers.whitespace,
		prefetch: {
			url: "normal.json",
			cache: false
		}
	});

	dataSourceRunewords.initialize();
	dataSourceRunes.initialize();
	dataSourceUniques.initialize();
	dataSourceSets.initialize();
	dataSourceNormal.initialize();

	$('.typeahead').on('typeahead:select', function(ev, data) {
		hideVisible();
		switch(data.type) {
			case 'runeword':
				document.getElementById("runeword").className = "runeword";
				document.getElementById("runewordName").textContent = data.name;
				document.getElementById("allowedItems").textContent = data.allowedItems;
				document.getElementById("runes").textContent = data.runes.split(' + ').join('-')
				document.getElementById("modifiers").innerHTML = data.modifiers.split('!').join('\n');
				document.getElementById("runeWordReqLevel").innerHTML = 'req.lvl: ' + data.runewordReqLevel;
				break;
			case 'rune':
				document.getElementById("rune").className = "rune";
				document.getElementById("runeIcon").src = data.runeSrcIcon;
				document.getElementById("runeName").textContent = data.runeName;
				document.getElementById("runeWeaponBonus").textContent = 'Weapons: \n' + data.runeWeaponBonus;
				document.getElementById("runeArmorBonus").textContent = 'Armor/Helms/Shields: \n' + data.runeArmorBonus.split('/').join('\n');
				document.getElementById("runeReqLevel").textContent = 'req.lvl: ' + data.runeReqLevel;
				break;
			case 'unique':
				document.getElementById("unique").className = "unique";
				document.getElementById("uniqueName").textContent = data.uniqueName;
				document.getElementById("uniqueSrcIcon").src = data.uniqueSrcIcon;
				document.getElementById("baseItem").textContent = '(' + data.baseItem + ')';
				document.getElementById("uniqueRequirements").textContent = data.uniqueRequirements;
				document.getElementById("uniqueReqLevel").textContent = 'req.lvl: ' + data.uniqueReqLevel;
				document.getElementById("uniqueModifiers").innerHTML = data.uniqueModifiers;
				break;
			case 'set':
			    keySet = data.setName; 
				document.getElementById("set").className = "set";
				document.getElementById("setName").textContent = data.setName;
				document.getElementById("setItemName").textContent = data.setItemName;
				document.getElementById("setSrcIcon").src = data.setSrcIcon;
				document.getElementById("setBaseItem").textContent = '(' + data.setBaseItem + ')';
				document.getElementById("setRequirements").textContent = data.setRequirements;
				document.getElementById("setModifiers").innerHTML = data.setModifiers;
				document.getElementById("setBonuses").innerHTML = data.setBonuses;
				break;
			case 'normal':
				document.getElementById("normal").className = "normal";
				document.getElementById("normalName").textContent = data.itemName;
				document.getElementById("uniqueVersion").textContent = ifUnique(data.uniqueVersion);
				document.getElementById("setVersion").textContent = ifSet(data.setVersion);
				document.getElementById("normalSrcIcon").src = data.srcIcon;
				document.getElementById("normalRequirements").textContent = data.requirements;
				break;
		}

	});
    function populate() {
    	hideVisible();
    	var full = document.getElementById('fullSet')
    	var children = $("#fullSet").children();
    	var result  = setObject.filter(function(o){return o.setName == keySet;} );
    	var bonuses = setObject.filter(function(o){return o.fullSet == keySet;} );

    	for(var y = 0; y < result.length + 1; y++) {
    		children[y].className = 'one';
    	};

    	var twoPieces = document.getElementById('twoPieces');
    	var threePieces = document.getElementById('threePieces');
    	var fourPieces = document.getElementById('fourPieces');
    	var fivePieces = document.getElementById('fivePieces');
    	var allPieces = document.getElementById('allPieces');
    	var setItemName = document.querySelectorAll('.one > .setItemName');
    	var setBaseItem = document.querySelectorAll('.one > .setBaseItem');
    	var setSrcIcon = document.querySelectorAll('.one > .setItemSrcIcon');
    	var setItemRequirements = document.querySelectorAll('.one > .setItemRequirements');
    	var setItemModifiers = document.querySelectorAll('.one > .setItemModifiers');
    	var setItemBonuses = document.querySelectorAll('.one > .setItemBonuses');
    	var fullSetBonuses = document.getElementById('fullSetBonuses');



    	full.className = "set"

    	fullSetName.textContent = result[0]['setName'];
    	twoPieces.textContent = bonuses[0]['twoPieces'];
    	threePieces.textContent = bonuses[0]['threePieces'];
    	fourPieces.textContent = bonuses[0]['fourPieces'];
    	fivePieces.textContent = bonuses[0]['fivePieces'];
    	allPieces.textContent = bonuses[0]['fullBonuses'];


    	for(var i = 0; i < result.length; i++) {
    		setItemName[i].textContent = result[i]['setItemName'];
    		setBaseItem[i].textContent = '('+ result[i]['setBaseItem'] + ')';
    		setSrcIcon[i].src = result[i]['setSrcIcon'];
    		setItemRequirements[i].textContent = result[i]['setRequirements'];
    		setItemModifiers[i].innerHTML = result[i]['setModifiers'];
    		setItemBonuses[i].innerHTML = result[i]['setBonuses'];
    	}
    }

	let el = document.getElementById("showAll");
	el.addEventListener("click", populate)

	$('.typeahead').typeahead({
		highlight: true,
	}, {
		name: 'Runewords',
		displayKey: 'name',
		source: dataSourceRunewords.ttAdapter(),
		templates: {
			suggestion: function (data) {
				return '<p class="suggestion"> <span class = "sugRuneword">Runeword</span>: ' + data.name + ' ( ' + data.runes+ ' )</p>';}
		}}, {
		name: 'Runes',
		displayKey: 'runeName',
		source: dataSourceRunes.ttAdapter(),
		templates: {
			suggestion: function (data) {
				return '<p class="suggestion"> <span class = "sugRune">Rune</span>: ' + data.runeName + ' Rune (req. lvl' + data.runeReqLevel + ')</p>';
			}
		}
	}, {
		name: 'Uniques',
		displayKey: 'uniqueName',
		source: dataSourceUniques.ttAdapter(),
		templates: {
			suggestion: function (data) {
				return '<p class="suggestion"> <span class = "sugUnique">Unique</span>: ' + data.uniqueName + ' (' + data.baseItem + ')</p>';
			}
		}
	}, {
		name: 'Sets',
		displayKey: 'setName',
		source: dataSourceSets.ttAdapter(),
		templates: {
			suggestion: function (data) {
				return '<p class="suggestion"> <span class = "sugSet">Set</span>: ' + data.setItemName + ' (' + data.setName + ')</p>';
			}
		}
	}, {
		name: 'Normal',
		displayKey: 'itemName',
		source: dataSourceNormal.ttAdapter(),
		templates: {
			suggestion: function (data) {
				return '<p class="suggestion"> <span class = "sugNormal">Normal</span>: ' + data.itemName + '</p>';
			}
		}
	}
	);

});