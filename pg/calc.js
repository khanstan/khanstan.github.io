
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
    "Brug of war": {"base": 35, "max_crew": 150},
    "War galleon": {"base": 22, "max_crew": 150},
    "Frigate": {"base": 44, "max_crew": 150},
    "Flag galleon": {"base": 25, "max_crew": 200},
    "Large frigate": {"base": 40, "max_crew": 225},
    "Ship of the line": {"base": 42, "max_crew": 250}
};

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

function resetform() {
	document.getElementById("calc").reset();
	document.getElementById("totalTime").innerHTML = "";
}
