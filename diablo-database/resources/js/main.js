$(document).ready(function () {

    var keySet;
    var setObject;

	function hideVisible() {
		$('.runeword, .rune, .unique, .set, .one').removeClass().addClass('hidden');
		$('.setItemSrcIcon').attr('src', '');
		$('.setItemName, .setBaseItem, .setItemSrcIcon, .setItemRequirements, .setItemModifiers, .setItemBonuses').empty();
	};

	var dataSourceRunewords = new Bloodhound({
		datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name', 'runes'),
		queryTokenizer: Bloodhound.tokenizers.whitespace,
		prefetch: {
			url: "runewords.json"
		}
	});

	var dataSourceRunes = new Bloodhound({
		datumTokenizer: Bloodhound.tokenizers.obj.whitespace('runeName'),
		queryTokenizer: Bloodhound.tokenizers.whitespace,
		prefetch: {
			url: "runes.json"
		}
	});    

	var dataSourceUniques = new Bloodhound({
		datumTokenizer: Bloodhound.tokenizers.obj.whitespace('uniqueName', 'baseItem'),
		queryTokenizer: Bloodhound.tokenizers.whitespace,
		prefetch: {
			url: "uniques.json"
		}
	});

	var dataSourceSets = new Bloodhound({
		datumTokenizer: Bloodhound.tokenizers.obj.whitespace('setItemName', 'setBaseItem', 'setName'),
		queryTokenizer: Bloodhound.tokenizers.whitespace,
		prefetch: {
			url: "sets.json",
			transform: function(response) {
                setObject = response;
                return response;
            }
	}
	});

	dataSourceRunewords.initialize();
	dataSourceRunes.initialize();
	dataSourceUniques.initialize();
	dataSourceSets.initialize();

	$('.typeahead').on('typeahead:select', function(ev, data) {
		hideVisible();
		switch(data.type) {
			case 'runeword':
				document.getElementById("runeword").className = "runeword";
				document.getElementById("runewordName").textContent=data.name;
				document.getElementById("allowedItems").textContent=data.allowedItems;
				document.getElementById("runes").textContent=data.runes.split(' + ').join('-')
				document.getElementById("modifiers").textContent=data.modifiers.split('!').join('\n');
				document.getElementById("runeWordReqLevel").textContent='req.lvl: ' + data.runewordReqLevel;
				break;
			case 'rune':
				document.getElementById("rune").className = "rune";
				document.getElementById("runeIcon").src = data.runeSrcIcon;
				document.getElementById("runeName").textContent=data.runeName;
				document.getElementById("runeWeaponBonus").textContent='Weapons: \n' + data.runeWeaponBonus;
				document.getElementById("runeArmorBonus").textContent='Armor/Helms/Shields: \n' + data.runeArmorBonus.split('/').join('\n');
				document.getElementById("runeReqLevel").textContent='req.lvl: ' + data.runeReqLevel;
				break;
			case 'unique':
				document.getElementById("unique").className = "unique";
				document.getElementById("uniqueName").textContent=data.uniqueName;
				document.getElementById("uniqueSrcIcon").src = data.uniqueSrcIcon;
				document.getElementById("baseItem").textContent='(' + data.baseItem + ')';
				document.getElementById("uniqueRequirements").textContent=data.uniqueRequirements;
				document.getElementById("uniqueReqLevel").textContent='req.lvl: ' + data.uniqueReqLevel;
				document.getElementById("uniqueModifiers").textContent=data.uniqueModifiers;
				break;
			case 'set':
			    keySet = data.setName; 
				document.getElementById("set").className = "set";
				document.getElementById("setName").textContent=data.setName;
				document.getElementById("setItemName").textContent=data.setItemName;
				document.getElementById("setSrcIcon").src = data.setSrcIcon;
				document.getElementById("setBaseItem").textContent='(' + data.setBaseItem + ')';
				document.getElementById("setRequirements").textContent=data.setRequirements;
				document.getElementById("setModifiers").textContent=data.setModifiers;
				document.getElementById("setBonuses").textContent=data.setBonuses;
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
    		setItemModifiers[i].textContent = result[i]['setModifiers'];
    		setItemBonuses[i].textContent = result[i]['setBonuses'];
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
				return '<p class="suggestion"> <span class = "sugRune">Rune</span>: ' + data.runeName + ' (req. lvl' + data.runeReqLevel + ')</p>';
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
	}
	);

});