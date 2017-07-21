Number.prototype.between = function(a, b, inclusive) {
	var min = Math.min(a, b);
	var max = Math.max(a, b);

	return inclusive ? this >= min && this <= max : this > min && this < max;
};

$(document).ready(function() {

	$('#compare').qtip({
		content: {
			text: 'Check if you want to compare different items.',
		},
		style: {
			classes: 'qtip-bootstrap'
		},
		show: {
			ready: true // Show when ready (page load)
		},
		hide: {
			delay: 1000
		}
	});

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
				html = $("<div id='runeword' class='runeword'>")
					.append("<h1 id='runewordName'>" + x.name + "</h1><br>")
					.append("<span id='allowedItems'>" + x.allowedItems + "</span><br>")
					.append("<span id='runes'>" + x.runes.split(' + ').join('-') + "</span><br>")
					.append("<span id='modifiers'>" + x.modifiers.split('!').join('\n') + "</span>")
					.append("<span id='runeWordReqLevel'>req.lvl: " + x.runewordReqLevel + "</span>");
				html.appendTo(".mainSection")

			},
			'runes': function(x) {
				html = $("<div id='rune' class='rune'>")
					.append('<img id="runeIcon" src="' + x.runeSrcIcon + '">')
					.append("<h1 id='runeName'>" + x.runeName + "</h1>")
					.append("<span id='runeWeaponBonus'>" + "Weapons: \n" + x.runeWeaponBonus + "</span><br>")
					.append("<span id='runeArmorBonus'>Armor/Helms/Shields: \n" + x.runeArmorBonus.split('/').join('\n') + "</span><br>")
					.append("<span id='runeReqLevel'>req.lvl: " + x.runeReqLevel + "</span>");
				html.appendTo(".mainSection")
			},
			'uniques': function(x) {
				html = $("<div id='unique' class='unique'>")
					.append("<h1 id='uniqueName'>" + x.uniqueName + "</h1>")
					.append('<img id="uniqueSrcIcon" src="' + x.uniqueSrcIcon + '">')
					.append("<h1 id='baseItem'>" + x.baseItem + "</h1><br>")
					.append("<span id='uniqueRequirements'>" + x.uniqueRequirements + "</span><br>")
					.append("<span id='uniqueModifiers'>" + x.uniqueModifiers + "</span><br>")
					.append("<span id='uniqueReqLevel'>req.lvl: " + x.uniqueReqLevel + "</span><br>");
				html.appendTo(".mainSection")
			},
			'sets': function(x) {
				objects.keySet = x.setName;
				html = $("<div id='set' class='set'>")
					.append("<h1 id='setName'>" + x.setName + "</h1>")
					.append("<span id='showAll'>[display full set]</span><br><br>")
					.append("<h1 id='setItemName'>" + x.setItemName + "</h1>")
					.append('<img id="setSrcIcon" src="' + x.setSrcIcon + '"><br>')
					.append("<span id='setBaseItem'>(" + x.setBaseItem + ")</span><br><br>")
					.append("<span id='setRequirements'>" + x.setRequirements + "</span><br>")
					.append("<span id='setModifiers'>" + x.setModifiers + "</span><br><br>")
					.append("<span id='setBonuses'>" + x.setBonuses + "</span><br>");
				html.appendTo(".mainSection")

				document.getElementById("showAll").addEventListener("click", populate);

			},
			'normal': function(x) {
				html = $("<div id='normal' class='normal'>")
					.append("<h1 id='normalName'>" + x.itemName + "</h1><br>")
					.append("<span id='uniqueVersion' class='sugUnique'>" + ifUnique(x.uniqueVersion) + "</span><br>")
					.append("<span id='setVersion' class='sugSet'>" + ifSet(x.setVersion) + "</span><br>")
					.append('<img id="normalSrcIcon" src="' + x.srcIcon + '"><br>')
					.append("<span id='normalRequirements'>" + x.requirements + "</span>")
				html.appendTo(".mainSection")

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

		try {
			var successful = document.execCommand('copy');
			var msg = successful ? 'successful' : 'unsuccessful';
			console.log('Copied text: ' + msg);
		} catch (err) {
			console.log('Unable to copy. Something went wrong :(');
		}
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

	window.addEventListener('load', router());

	function ifUnique(check) {
		if (check.length > 1) {
			return 'Unique: ' + check;
		} else {
			return '';
		}
	}

	function ifSet(check) {
		if (check.length > 1) {
			return 'Set: ' + check;
		} else {
			return '';
		}
	}

	function hideVisible() {
		$('.runeword, .rune, .unique, .set, .normal').remove();
		$('.fullSet, .one').removeClass().addClass('hidden');
		$('.setItemSrcIcon').attr('src', '');
		$('.setItemName, .setBaseItem, .setItemSrcIcon, .setItemRequirements, .setItemModifiers, .setItemBonuses').empty();
	};

	var compare = document.getElementById('compare');



	$('.typeahead').on('typeahead:select', function(ev, data) {
		if (!compare.checked) {
			hideVisible();
		}

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
		console.log(result.length)

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



		full.className = "fullSet"

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