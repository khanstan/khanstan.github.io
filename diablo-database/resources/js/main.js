$(document).ready(function () {

    function hideVisible() {
        $('.runeword, .rune, .unique').removeClass().addClass('hidden');
    }

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

    dataSourceRunewords.initialize();
    dataSourceRunes.initialize();
    dataSourceUniques.initialize();

    $('.typeahead').on('typeahead:select', function(ev, data) {
        hideVisible();
        switch(data.type) {
            case 'runeword':
                document.getElementById("runeword").className = "runeword";
                document.getElementById("runewordName").textContent=data.name;
                document.getElementById("allowedItems").textContent=data.allowedItems;
                document.getElementById("runes").textContent=data.runes
                document.getElementById("modifiers").textContent=data.modifiers.split('!').join('\n');
                document.getElementById("runeWordReqLevel").textContent='req.lvl: ' + data.runewordReqLevel
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
        }

    });

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
    }
    );

});