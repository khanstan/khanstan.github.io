Number.prototype.between = function(a, b, inclusive) {
	var min = Math.min(a, b);
	var max = Math.max(a, b);

	return inclusive ? this >= min && this <= max : this > min && this < max;
};

$(document).ready(function() {

	var objects = {}; //contains all prefetched json files for easier access.

	var dataSourceRunewords = new Bloodhound({
		datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name', 'runes'),
		queryTokenizer: Bloodhound.tokenizers.whitespace,
		prefetch: {
			url: "runewords.json",
			cache: false,
			transform: function(response) {
				objects.runewordsObject = response;
				return response;
			}
		}
	});

	var dataSourceRunes = new Bloodhound({
		datumTokenizer: Bloodhound.tokenizers.obj.whitespace('runeName', 'type'),
		queryTokenizer: Bloodhound.tokenizers.whitespace,
		prefetch: {
			url: "runes.json",
			cache: false,
			transform: function(response) {
				objects.runesObject = response;
				return response;
			}
		}
	});

	var dataSourceUniques = new Bloodhound({
		datumTokenizer: Bloodhound.tokenizers.obj.whitespace('uniqueName', 'baseItem'),
		queryTokenizer: Bloodhound.tokenizers.whitespace,
		prefetch: {
			url: "uniques.json",
			cache: false,
			transform: function(response) {
				objects.uniquesObject = response;
				return response;
			}
		}
	});

	var dataSourceSets = new Bloodhound({
		datumTokenizer: Bloodhound.tokenizers.obj.whitespace('setItemName', 'setBaseItem', 'setName'),
		queryTokenizer: Bloodhound.tokenizers.whitespace,
		prefetch: {
			url: "sets.json",
			cache: false,
			transform: function(response) {
				objects.setsObject = response;
				return response;
			}
		}
	});

	var dataSourceNormal = new Bloodhound({
		datumTokenizer: Bloodhound.tokenizers.obj.whitespace('itemName'),
		queryTokenizer: Bloodhound.tokenizers.whitespace,
		prefetch: {
			url: "normal.json",
			cache: false,
			transform: function(response) {
				objects.normalObject = response;
				return response;
			}
		}
	});

	/*	dataSourceRunewords.initialize();
		dataSourceRunes.initialize();
		dataSourceUniques.initialize();
		dataSourceSets.initialize();
		dataSourceNormal.initialize();*/

	var update = {
			'runewords': function(x) {
				document.getElementById("runeword").className = "runeword";
				document.getElementById("runewordName").textContent = x.name;
				document.getElementById("allowedItems").textContent = x.allowedItems;
				document.getElementById("runes").textContent = x.runes.split(' + ').join('-')
				document.getElementById("modifiers").innerHTML = x.modifiers.split('!').join('\n');
				document.getElementById("runeWordReqLevel").innerHTML = 'req.lvl: ' + x.runewordReqLevel;
			},
			'runes': function(x) {
				document.getElementById("rune").className = "rune";
				document.getElementById("runeIcon").src = x.runeSrcIcon;
				document.getElementById("runeName").textContent = x.runeName;
				document.getElementById("runeWeaponBonus").textContent = 'Weapons: \n' + x.runeWeaponBonus;
				document.getElementById("runeArmorBonus").textContent = 'Armor/Helms/Shields: \n' + x.runeArmorBonus.split('/').join('\n');
				document.getElementById("runeReqLevel").textContent = 'req.lvl: ' + x.runeReqLevel;
			},
			'uniques': function(x) {
				document.getElementById("unique").className = "unique";
				document.getElementById("uniqueName").textContent = x.uniqueName;
				document.getElementById("uniqueSrcIcon").src = x.uniqueSrcIcon;
				document.getElementById("baseItem").textContent = '(' + x.baseItem + ')';
				document.getElementById("uniqueRequirements").textContent = x.uniqueRequirements;
				document.getElementById("uniqueReqLevel").textContent = 'req.lvl: ' + x.uniqueReqLevel;
				document.getElementById("uniqueModifiers").innerHTML = x.uniqueModifiers;
			},
			'sets': function(x) {
				objects.keySet = x.setName;
				document.getElementById("set").className = "set";
				document.getElementById("setName").textContent = x.setName;
				document.getElementById("setItemName").textContent = x.setItemName;
				document.getElementById("setSrcIcon").src = x.setSrcIcon;
				document.getElementById("setBaseItem").textContent = '(' + x.setBaseItem + ')';
				document.getElementById("setRequirements").textContent = x.setRequirements;
				document.getElementById("setModifiers").innerHTML = x.setModifiers;
				document.getElementById("setBonuses").innerHTML = x.setBonuses;
			},
			'normal': function(x) {
				document.getElementById("normal").className = "normal";
				document.getElementById("normalName").textContent = x.itemName;
				document.getElementById("uniqueVersion").textContent = ifUnique(x.uniqueVersion);
				document.getElementById("setVersion").textContent = ifSet(x.setVersion);
				document.getElementById("normalSrcIcon").src = x.srcIcon;
				document.getElementById("normalRequirements").textContent = x.requirements;
			}
		}
		// Update page using hash.
	var hashUpdate = function(q) {
		if (q.between(0, 492, true)) {
			let f = objects.normalObject.filter(function(o) {
				return o.id == q;
			});
			return update.normal(f[0]);
		} else if (q.between(493, 525, true)) {
			let f = objects.runesObject.filter(function(o) {
				return o.id == q;
			});
			return update.runes(f[0]);
		} else if (q.between(526, 603, true)) {
			let f = objects.runewordsObject.filter(function(o) {
				return o.id == q;
			});
			return update.runewords(f[0]);
		} else if (q.between(604, 730, true)) {
			let f = objects.setsObject.filter(function(o) {
				return o.id == q;
			});
			return update.sets(f[0]);
		} else if (q.between(731, 1109, true)) {
			let f = objects.uniquesObject.filter(function(o) {
				return o.id == q;
			});
			return update.uniques(f[0])
		} else {
			return console.log('Something went wrong. Query must be between 0-1109:')
		}
	}

	function updateShare(f) {
		return document.getElementById("shareInput").value = window.location.href.replace(window.location.hash, '') + '#' + f;
	}

	var copyShareBtn = document.getElementById('shareBtn');

	copyShareBtn.addEventListener('click', function(event) {
		var copyInput = document.getElementById('shareInput');
		copyInput.select();
	});

	//Update on page load.
	function router() {
		$(document).ajaxStop(function() {
			q = Number(window.location.hash.substring(1));
			if (q) {
				hashUpdate(q);
				updateShare(q);
			}
		});
	}

	//Detect hash change.
	window.onhashchange = function onHashChange(evt) {
		q = Number(window.location.hash.substring(1));
		if (q) {
			hideVisible();
			hashUpdate(q);
			updateShare(q);
		}

	};
	// Page load listener
	window.addEventListener('load', router());

	function ifUnique(check) {
		if (check.length > 1) {
			return 'Unique: ' + check;
		}
	}

	function ifSet(check) {
		if (check.length > 1) {
			return 'Set: ' + check;
		}
	}

	function hideVisible() {
		$('.runeword, .rune, .unique, .set, .one, .normal').removeClass().addClass('hidden');
		$('.setItemSrcIcon').attr('src', '');
		$('.setItemName, .setBaseItem, .setItemSrcIcon, .setItemRequirements, .setItemModifiers, .setItemBonuses').empty();
	};



	$('.typeahead').on('typeahead:select', function(ev, data) {
		hideVisible();
		updateShare(data.id);
		switch (data.type) {
			case 'runeword':
				update.runewords(data);
				break;
			case 'rune':
				update.runes(data);
				break;
			case 'unique':
				update.uniques(data);
				break;
			case 'set':
				update.sets(data);
				break;
			case 'normal':
				update.normal(data);
				break;
		}

	});

	function populate() {
		hideVisible();
		var full = document.getElementById('fullSet')
		var children = $("#fullSet").children();
		var result = objects.setsObject.filter(function(o) {
			return o.setName == objects.keySet;
		});
		var bonuses = objects.setsObject.filter(function(o) {
			return o.fullSet == objects.keySet;
		});

		for (var y = 0; y < result.length + 1; y++) {
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


		for (var i = 0; i < result.length; i++) {
			setItemName[i].textContent = result[i]['setItemName'];
			setBaseItem[i].textContent = '(' + result[i]['setBaseItem'] + ')';
			setSrcIcon[i].src = result[i]['setSrcIcon'];
			setItemRequirements[i].textContent = result[i]['setRequirements'];
			setItemModifiers[i].innerHTML = result[i]['setModifiers'];
			setItemBonuses[i].innerHTML = result[i]['setBonuses'];
		}
	}

	var el = document.getElementById("showAll");
	el.addEventListener("click", populate)

	$('.typeahead').typeahead({
		highlight: true,
	}, {
		name: 'Runewords',
		displayKey: 'name',
		source: dataSourceRunewords.ttAdapter(),
		templates: {
			suggestion: function(data) {
				return '<p class="suggestion"> <span class = "sugRuneword">Runeword</span>: ' + data.name + ' ( ' + data.runes + ' )</p>';
			}
		}
	}, {
		name: 'Runes',
		displayKey: 'runeName',
		source: dataSourceRunes.ttAdapter(),
		templates: {
			suggestion: function(data) {
				return '<p class="suggestion"> <span class = "sugRune">Rune</span>: ' + data.runeName + ' Rune (req. lvl' + data.runeReqLevel + ')</p>';
			}
		}
	}, {
		name: 'Uniques',
		displayKey: 'uniqueName',
		source: dataSourceUniques.ttAdapter(),
		templates: {
			suggestion: function(data) {
				return '<p class="suggestion"> <span class = "sugUnique">Unique</span>: ' + data.uniqueName + ' (' + data.baseItem + ')</p>';
			}
		}
	}, {
		name: 'Sets',
		displayKey: 'setName',
		source: dataSourceSets.ttAdapter(),
		templates: {
			suggestion: function(data) {
				return '<p class="suggestion"> <span class = "sugSet">Set</span>: ' + data.setItemName + ' (' + data.setName + ')</p>';
			}
		}
	}, {
		name: 'Normal',
		displayKey: 'itemName',
		source: dataSourceNormal.ttAdapter(),
		templates: {
			suggestion: function(data) {
				return '<p class="suggestion"> <span class = "sugNormal">Normal</span>: ' + data.itemName + '</p>';
			}
		}
	});

});