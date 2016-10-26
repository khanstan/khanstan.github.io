var ports = {
    "Kanoni": {"x_cd": 47, "y_cd": 202},
    "Baramas": {"x_cd": 141, "y_cd": 173},
    "St. Martins": {"x_cd": 169, "y_cd": 63},
    "Pania": {"x_cd": 362, "y_cd": 89},
    "Regis": {"x_cd": 437, "y_cd": 147},
    "Goroum": {"x_cd": 524, "y_cd": 100},
    "Newland": {"x_cd": 239, "y_cd": 303},
    "Hannes": {"x_cd": 674, "y_cd": 87},
    "Vaasburg": {"x_cd": 443, "y_cd": 274},
    "Seaglory": {"x_cd": 341, "y_cd": 398},
    "Tortuga": {"x_cd": 259, "y_cd": 477},
    "Tzogos": {"x_cd": 234, "y_cd": 587},
    "Aiora": {"x_cd": 453, "y_cd": 577},
    "Thorakas": {"x_cd": 590, "y_cd": 393},
    "Gasp": {"x_cd": 679, "y_cd": 471},
    "Neapolis": {"x_cd": 583, "y_cd": 192},
    "Caspian": {"x_cd": 678, "y_cd": 253},
    "Prote": {"x_cd": 761, "y_cd": 168},
    "Chalkos": {"x_cd": 902, "y_cd": 116},
    "Psaral": {"x_cd": 872, "y_cd": 343},
    "Akrotiri": {"x_cd": 888, "y_cd": 587}
};

var ships = {
    "Howker": {"base": 21, "max_crew": 30},
    "Cutter": {"base": 50, "max_crew": 25},
    "Sloop": {"base": 40, "max_crew": 50},
    "Fluyt": {"base": 11, "max_crew": 40},
    "Sloop of war": {"base": 45, "max_crew": 75},
    "Galleon": {"base": 20, "max_crew": 60},
    "Large fluyt": {"base": 14, "max_crew": 60},
    "Merchantman": {"base": 22, "max_crew": 75},
    "Trade galleon": {"base": 10, "max_crew": 60},
    "Brigantine": {"base": 32, "max_crew": 100},
    "Large merchantman": {"base": 24, "max_crew": 100},
    "Brig": {"base": 30, "max_crew": 125},
    "Brig of war": {"base": 35, "max_crew": 150},
    "War galleon": {"base": 22, "max_crew": 150},
    "Frigate": {"base": 44, "max_crew": 150},
    "Flag galleon": {"base": 25, "max_crew": 200},
    "Large frigate": {"base": 40, "max_crew": 225},
    "Ship of the line": {"base": 42, "max_crew": 250}
};

function addEvent(element, evnt, funct){
  if (element.attachEvent)
   return element.attachEvent('on'+evnt, funct);
  else
   return element.addEventListener(evnt, funct, false);
}


addEvent(
    document.getElementById('link'),
    'click',
    function () { max(); }
);

addEvent(
    document.getElementById('clear'),
    'click',
    function () { resetForm(); }
);

window.addEventListener('input', function (e) {
 getTime();
}, false);


// Polyfill .includes for older browsers

if (!String.prototype.includes) {
  String.prototype.includes = function(search, start) {
    'use strict';
    if (typeof start !== 'number') {
      start = 0;
    }
    
    if (start + search.length > this.length) {
      return false;
    } else {
      return this.indexOf(search, start) !== -1;
    }
  };
}


function getShips() {
    s = document.getElementById("ship");
    s1 = s.options[s.selectedIndex].value;
    return s1;
}

function getDistance() {
    var pA = document.getElementById("portA");
    var pAv = pA.options[pA.selectedIndex].value;
    var pB = document.getElementById("portB");
    var pBv = pB.options[pB.selectedIndex].value;
    var x = Math.abs(ports[pAv]["x_cd"] - ports[pBv]["x_cd"]);
    var y = Math.abs(ports[pAv]["y_cd"] - ports[pBv]["y_cd"]);
    var total = x + y;
    var distance = Math.round(total * 10 * 50);
    return distance;
}

function getSpeed() {
//Base Ship Speed = Base Ship Speed + ( Base Ship Speed * 3 * Cotton Sails / 100 )
//Ship speed = Base Ship Speed * ((Current Crew / Max Crew) + 1) / 2
//Final Ship Speed = Ship Speed + (Ship Speed * Double Hammocks / 100)

    var c = document.getElementById("cotton");
    var c1 = c.options[c.selectedIndex].value;
    var h = document.getElementById("hammocks");
    var h1 = h.options[h.selectedIndex].value;
    var ccrew = document.getElementById("quantity").value;
    var sk = document.getElementById("skies");
    var sk1 = sk.options[sk.selectedIndex].value;
    var w = document.getElementById("winds");
    var w1 = w.options[w.selectedIndex].value;
    var g = document.getElementById("galleons");
    var g1 = g.options[g.selectedIndex].value;
    var basespeed = ships[getShips()]["base"] + (ships[getShips()]["base"] * 3 * c1 / 100);
    var shipspeed = basespeed * ((ccrew / ships[getShips()]["max_crew"]) + 1) / 2;
    var finalspeed = shipspeed + (shipspeed * h1 / 100);
    if (g1 > 0 && getShips().includes("alleon")) {
        finalspeed = finalspeed + (finalspeed * g1 * 1.5 / 100);
    }

    if (sk1 > 0 && w1 > 0) {
        var cw = finalspeed + (finalspeed * (w1 - sk1) * 10 / 100);
        return cw;
    } else if (sk1 > 0) {
        var control = finalspeed - (finalspeed * sk1 * 10 / 100);
        return control;
    } else if (w1 > 0) {
        var winds = finalspeed + (finalspeed * w1 * 10 / 100);
        return winds;
    } else {
        return finalspeed;
    }

}

function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);
    return ((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s); 
}



function getTime() {

    var time = getDistance() / getSpeed();

    document.getElementById("totalTime").innerHTML = "Time till arrival:  " + secondsToHms(time);

    return time;
}

function max() {
    var m = ships[getShips()]["max_crew"];
    document.getElementById("quantity").value = m;
    return getTime();
}

function resetForm() {
    document.getElementById("calc").reset();
    document.getElementById("totalTime").innerHTML = "";
}

window.addEventListener('input', function (e) {
 calc();
}, false);



var data = [[]];


  
var container = document.getElementById('trade');



var hot = new Handsontable(container, {
    data: data,
    minSpareRows: 0,
    colHeaders: ["Port", "Wood", "Iron", "Tools", "Cotton", "Food", "Rum", "Tobacco", "Gold"],
    minCols: 9,
    maxCols: 9,
    contextMenu: false,
    afterChange: function (change, source) {
        // restore table after reload of a page
        if (source === "loadData") {
            // load data from local storage
            if (localStorage['data']) {
                var data = JSON.parse(localStorage['data'])
                this.loadData(data);
                this.render();
                return 
            }

        }
        else {
            // save all data to local storge if the edit happends
            localStorage['data'] = JSON.stringify(this.getData());
            return
        }
       }
  });



var ports1 = {
    "Caspian": {"sells": ["cotton", hot.getDataAtCell(0,4)], "wood": hot.getDataAtCell(0,1), "iron": hot.getDataAtCell(0,2), "tools" : hot.getDataAtCell(0,3), "cotton": hot.getDataAtCell(0,4), "food": hot.getDataAtCell(0,5), "rum": hot.getDataAtCell(0,6), "tobaccos": hot.getDataAtCell(0,7), "gold": hot.getDataAtCell(0,8)},
    "Neapolis": {"sells": ["cotton", hot.getDataAtCell(1,4)], "wood": hot.getDataAtCell(1,1), "iron": hot.getDataAtCell(1,2), "tools" : hot.getDataAtCell(1,3), "cotton": hot.getDataAtCell(1,4), "food": hot.getDataAtCell(1,5), "rum": hot.getDataAtCell(1,6), "tobaccos": hot.getDataAtCell(1,7), "gold": hot.getDataAtCell(1,8)},
    "Seaglory": {"sells": ["cotton", hot.getDataAtCell(2,4)], "wood": hot.getDataAtCell(2,1), "iron": hot.getDataAtCell(2,2), "tools" : hot.getDataAtCell(2,3), "cotton": hot.getDataAtCell(2,4), "food": hot.getDataAtCell(2,5), "rum": hot.getDataAtCell(2,6), "tobaccos": hot.getDataAtCell(2,7), "gold": hot.getDataAtCell(2,8)},
    "Chalkos": {"sells": ["food", hot.getDataAtCell(3,5)], "wood": hot.getDataAtCell(3,1), "iron": hot.getDataAtCell(3,2), "tools" : hot.getDataAtCell(3,3), "cotton": hot.getDataAtCell(3,4), "food": hot.getDataAtCell(3,5), "rum": hot.getDataAtCell(3,6), "tobaccos": hot.getDataAtCell(3,7), "gold": hot.getDataAtCell(3,8)},
    "Goroum": {"sells": ["food", hot.getDataAtCell(4,5)], "wood": hot.getDataAtCell(4,1), "iron": hot.getDataAtCell(4,2), "tools" : hot.getDataAtCell(4,3), "cotton": hot.getDataAtCell(4,4), "food": hot.getDataAtCell(4,5), "rum": hot.getDataAtCell(4,6), "tobaccos": hot.getDataAtCell(4,7), "gold": hot.getDataAtCell(4,8)},
    "Newland": {"sells": ["food", hot.getDataAtCell(5,5)], "wood": hot.getDataAtCell(5,1), "iron": hot.getDataAtCell(5,2), "tools" : hot.getDataAtCell(5,3), "cotton": hot.getDataAtCell(5,4), "food": hot.getDataAtCell(5,5), "rum": hot.getDataAtCell(5,6), "tobaccos": hot.getDataAtCell(5,7), "gold": hot.getDataAtCell(5,8)},
    "Gasp": {"sells": ["iron", hot.getDataAtCell(6,2)], "wood": hot.getDataAtCell(6,1), "iron": hot.getDataAtCell(6,2), "tools" : hot.getDataAtCell(6,3), "cotton": hot.getDataAtCell(6,4), "food": hot.getDataAtCell(6,5), "rum": hot.getDataAtCell(6,6), "tobaccos": hot.getDataAtCell(6,7), "gold": hot.getDataAtCell(6,8)},
    "Regis": {"sells": ["iron", hot.getDataAtCell(7,2)], "wood": hot.getDataAtCell(7,1), "iron": hot.getDataAtCell(7,2), "tools" : hot.getDataAtCell(7,3), "cotton": hot.getDataAtCell(7,4), "food": hot.getDataAtCell(7,5), "rum": hot.getDataAtCell(7,6), "tobaccos": hot.getDataAtCell(7,7), "gold": hot.getDataAtCell(7,8)},
    "Tzogos": {"sells": ["iron", hot.getDataAtCell(8,2)], "wood": hot.getDataAtCell(8,1), "iron": hot.getDataAtCell(8,2), "tools" : hot.getDataAtCell(8,3), "cotton": hot.getDataAtCell(8,4), "food": hot.getDataAtCell(8,5), "rum": hot.getDataAtCell(8,6), "tobaccos": hot.getDataAtCell(8,7), "gold": hot.getDataAtCell(8,8)},
    "Akrotiri": {"sells": ["rum", hot.getDataAtCell(9,6)], "wood": hot.getDataAtCell(9,1), "iron": hot.getDataAtCell(9,2), "tools" : hot.getDataAtCell(9,3), "cotton": hot.getDataAtCell(9,4), "food": hot.getDataAtCell(9,5), "rum": hot.getDataAtCell(9,6), "tobaccos": hot.getDataAtCell(9,7), "gold": hot.getDataAtCell(9,8)},
    "Baramas": {"sells": ["rum", hot.getDataAtCell(10,6)], "wood": hot.getDataAtCell(10,1), "iron": hot.getDataAtCell(10,2), "tools" : hot.getDataAtCell(10,3), "cotton": hot.getDataAtCell(10,4), "food": hot.getDataAtCell(10,5), "rum": hot.getDataAtCell(10,6), "tobaccos": hot.getDataAtCell(10,7), "gold": hot.getDataAtCell(20,8)},
    "Pania": {"sells": ["rum", hot.getDataAtCell(11,6)], "wood": hot.getDataAtCell(11,1), "iron": hot.getDataAtCell(11,2), "tools" : hot.getDataAtCell(11,3), "cotton": hot.getDataAtCell(11,4), "food": hot.getDataAtCell(11,5), "rum": hot.getDataAtCell(11,6), "tobaccos": hot.getDataAtCell(11,7), "gold": hot.getDataAtCell(11,8)},
    "Hannes": {"sells": ["tobaccos", hot.getDataAtCell(12,7)], "wood": hot.getDataAtCell(12,1), "iron": hot.getDataAtCell(12,2), "tools" : hot.getDataAtCell(12,3), "cotton": hot.getDataAtCell(12,4), "food": hot.getDataAtCell(12,5), "rum": hot.getDataAtCell(12,6), "tobaccos": hot.getDataAtCell(12,7), "gold": hot.getDataAtCell(12,8)},
    "Psaral": {"sells": ["tobaccos", hot.getDataAtCell(13,7)], "wood": hot.getDataAtCell(13,1), "iron": hot.getDataAtCell(13,2), "tools" : hot.getDataAtCell(13,3), "cotton": hot.getDataAtCell(13,4), "food": hot.getDataAtCell(13,5), "rum": hot.getDataAtCell(13,6), "tobaccos": hot.getDataAtCell(13,7), "gold": hot.getDataAtCell(13,8)},
    "Thorakas": {"sells": ["tobaccos", hot.getDataAtCell(14,7)], "wood": hot.getDataAtCell(14,1), "iron": hot.getDataAtCell(14,2), "tools" : hot.getDataAtCell(14,3), "cotton": hot.getDataAtCell(14,4), "food": hot.getDataAtCell(14,5), "rum": hot.getDataAtCell(14,6), "tobaccos": hot.getDataAtCell(14,7), "gold": hot.getDataAtCell(14,8)},
    "St. Martins": {"sells": ["tools", hot.getDataAtCell(15,3)], "wood": hot.getDataAtCell(15,1), "iron": hot.getDataAtCell(15,2), "tools" : hot.getDataAtCell(15,3), "cotton": hot.getDataAtCell(15,4), "food": hot.getDataAtCell(15,5), "rum": hot.getDataAtCell(15,6), "tobaccos": hot.getDataAtCell(15,7), "gold": hot.getDataAtCell(15,8)},
    "Tortuga": {"sells": ["tools", hot.getDataAtCell(16,3)], "wood": hot.getDataAtCell(16,1), "iron": hot.getDataAtCell(16,2), "tools" : hot.getDataAtCell(16,3), "cotton": hot.getDataAtCell(16,4), "food": hot.getDataAtCell(16,5), "rum": hot.getDataAtCell(16,6), "tobaccos": hot.getDataAtCell(16,7), "gold": hot.getDataAtCell(16,8)},
    "Vaasburg": {"sells": ["tools", hot.getDataAtCell(17,3)], "wood": hot.getDataAtCell(17,1), "iron": hot.getDataAtCell(17,2), "tools" : hot.getDataAtCell(17,3), "cotton": hot.getDataAtCell(17,4), "food": hot.getDataAtCell(17,5), "rum": hot.getDataAtCell(17,6), "tobaccos": hot.getDataAtCell(17,7), "gold": hot.getDataAtCell(17,8)},
    "Aiora": {"sells": ["wood", hot.getDataAtCell(18,1)], "wood": hot.getDataAtCell(18,1), "iron": hot.getDataAtCell(18,2), "tools" : hot.getDataAtCell(18,3), "cotton": hot.getDataAtCell(18,4), "food": hot.getDataAtCell(18,5), "rum": hot.getDataAtCell(18,6), "tobaccos": hot.getDataAtCell(18,7), "gold": hot.getDataAtCell(18,8)},
    "Kanoni": {"sells": ["wood", hot.getDataAtCell(19,1)], "wood": hot.getDataAtCell(19,1), "iron": hot.getDataAtCell(19,2), "tools" : hot.getDataAtCell(19,3), "cotton": hot.getDataAtCell(19,4), "food": hot.getDataAtCell(19,5), "rum": hot.getDataAtCell(19,6), "tobaccos": hot.getDataAtCell(19,7), "gold": hot.getDataAtCell(19,8)},
    "Prote": {"sells": ["wood", hot.getDataAtCell(20,1)], "wood": hot.getDataAtCell(20,1), "iron": hot.getDataAtCell(20,2), "tools" : hot.getDataAtCell(20,3), "cotton": hot.getDataAtCell(20,4), "food": hot.getDataAtCell(20,5), "rum": hot.getDataAtCell(20,6), "tobaccos": hot.getDataAtCell(20,7), "gold": hot.getDataAtCell(20,8)}
};




function calc() {
    var pA = document.getElementById("portA");
    var pAv = pA.options[pA.selectedIndex].value;
    var pB = document.getElementById("portB");
    var pBv = pB.options[pB.selectedIndex].value;

    var portAsells = ports1[pAv]["sells"][0];
    var portBbuys = ports1[pBv][portAsells];
    var portBsells = ports1[pBv]["sells"][0];
    var portAbuys = ports1[pAv][portBsells];
    var atob = portBbuys - ports1[pAv]["sells"][1];
    var btoa = portAbuys - ports1[pBv]["sells"][1];
    var profit = atob + btoa;
    var cargo = document.getElementById("cargo").value;
    var dif = 43200 / getTime();
    if (dif < 3600) {
        dif = 12;
    }
    var profit2 = profit * (1 + 0.10);
    document.getElementById("profit").innerHTML = "Profit per " + cargo + " crates:  " + Math.floor(profit * dif * cargo);

    return Math.floor(profit * dif * cargo)
}


// TODO: If time is less than 1 round to 1.
