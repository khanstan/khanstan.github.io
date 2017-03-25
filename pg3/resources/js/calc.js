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
    "Howker": {"base": 21, "max_crew": 30, "cargo": 60},
    "Cutter": {"base": 50, "max_crew": 25, "cargo": 30},
    "Sloop": {"base": 40, "max_crew": 50, "cargo": 30},
    "Fluyt": {"base": 11, "max_crew": 40, "cargo": 80},
    "Sloop of war": {"base": 45, "max_crew": 75, "cargo": 40},
    "Galleon": {"base": 20, "max_crew": 60, "cargo": 100},
    "Large fluyt": {"base": 14, "max_crew": 60, "cargo": 110},
    "Merchantman": {"base": 22, "max_crew": 75, "cargo": 90},
    "Trade galleon": {"base": 10, "max_crew": 60, "cargo": 150},
    "Brigantine": {"base": 32, "max_crew": 100, "cargo": 60},
    "Large merchantman": {"base": 24, "max_crew": 100, "cargo": 120},
    "Brig": {"base": 30, "max_crew": 125, "cargo": 50},
    "Brig of war": {"base": 35, "max_crew": 150, "cargo": 60},
    "War galleon": {"base": 22, "max_crew": 150, "cargo": 80},
    "Frigate": {"base": 44, "max_crew": 150, "cargo": 60},
    "Flag galleon": {"base": 25, "max_crew": 200, "cargo": 100},
    "Large frigate": {"base": 40, "max_crew": 225, "cargo": 60},
    "Ship of the line": {"base": 42, "max_crew": 250, "cargo": 60}
};

function getID(id) {
    return document.getElementById(id);
}

var selectedOption = function (id) {
    var element = getID(id);
    return element.options[element.selectedIndex].value;
};

function sumCargo() {
    var s1 = selectedOption('ship1'),
        s2 = selectedOption('ship2'),
        s3 = selectedOption('ship3'),
        s4 = selectedOption('ship4'),
        s5 = selectedOption('ship5'),
        a = ships[s1].cargo,
        b = ships[s2].cargo,
        c = ships[s3].cargo,
        d = ships[s4].cargo,
        e = ships[s5].cargo,
        cargoValue = getID("cargo").value = a + b + c + d + e;
    return cargoValue;
}

function gg(e) {
    var g = e.innerText,
        split = g.split('-'),
        first = split[0],
        second = split[1];
    getID('portA').value = first;
    getID('portB').value = second;
    
    return workaround();
}

function addEvent(element, evnt, funct) {
    if (element.attachEvent)
        return element.attachEvent('on'+evnt, funct);
    else
        return element.addEventListener(evnt, funct, false);
}

addEvent(
    getID('link'),
    'click',
    function () { max(); }
)

addEvent(
    getID('link2'),
    'click',
    function () { sumCargo(); }
)

addEvent(
    getID('linksave'),
    'click',
    function () { save(); }
)

addEvent(
    getID('linkload'),
    'click',
    function () { load(); }
)

addEvent(
    getID('clear'),
    'click',
    function () { resetForm(); }
)

window.addEventListener('input', function (e) {
    tradeCalc();
}, false);

getID("ship").addEventListener('change', function (e) {
    max();
}, false);

// Polyfill .includes for older browsers

if (!String.prototype.includes) {
    String.prototype.includes = function (search, start) {
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

function max() {
    var m = ships[getShips()].max_crew;
    getID("quantity").value = m;
    return workaround();
}


function workaround() {
    getTime();
    sumCargo();
    tradeCalc();
}

function resetForm() {
    getID("calc").reset();
    getID("totalTime").innerHTML = "";
    getID("totalProfit").innerHTML = "";
}

function getByKey() {
    var a = getID("portA").value,
        b = getID("portB").value,
        key1 = a + "-" + b,
        key2 = b + "-" + a,
        proff = 0,
        keyz = obj[key1],
        keyz1 = obj[key2];
    
    if(typeof keyz !== "undefined") {
        return keyz;
    } else {
        return keyz1;
    }
}

function save() {
    var input0 = getID('ship'),
        input1 = getID('ship1'),
        input2 = getID('ship2'),
        input3 = getID('ship3'),
        input4 = getID('ship4'),
        input5 = getID('ship5'),
        input6 = getID('quantity');
    localStorage.ship = input0.value;
    localStorage.ship1 = input1.value;
    localStorage.ship2 = input2.value;
    localStorage.ship3 = input3.value;
    localStorage.ship4 = input4.value;
    localStorage.ship5 = input5.value;
    localStorage.quantity = input6.value;
}

function load() {
    var input0 = getID('ship'),
        input1 = getID('ship1'),
        input2 = getID('ship2'),
        input3 = getID('ship3'),
        input4 = getID('ship4'),
        input5 = getID('ship5'),
        input6 = getID('quantity');
    input0.value = localStorage['ship']
    input1.value = localStorage['ship1'];
    input2.value = localStorage['ship2'];
    input3.value = localStorage['ship3'];
    input4.value = localStorage['ship4'];
    input5.value = localStorage['ship5'];
    input6.value = localStorage['quantity']
    return workaround();
}

function getShips() {
    var s1 = selectedOption('ship');
    return s1;
}

function getDistance() {
    var pAv = selectedOption('portA'),
        pBv = selectedOption('portB'),
        x = Math.abs(ports[pAv]["x_cd"] - ports[pBv]["x_cd"]),
        y = Math.abs(ports[pAv]["y_cd"] - ports[pBv]["y_cd"]),
        total = x + y,
        distance = Math.round(total * 10 * 50);
    return distance;
}

function getSpeed() {
//Base Ship Speed = Base Ship Speed + ( Base Ship Speed * 3 * Cotton Sails / 100 )
//Ship speed = Base Ship Speed * ((Current Crew / Max Crew) + 1) / 2
//Final Ship Speed = Ship Speed + (Ship Speed * Double Hammocks / 100)

    var ccrew = getID("quantity").value;
        c1 = selectedOption('cotton'),
        h1 = selectedOption('hammocks'),
        sk1 = selectedOption('skies'),
        w1 = selectedOption('winds'),
        g1 = selectedOption('galleons'),
        basespeed = ships[getShips()]["base"] + (ships[getShips()]["base"] * 3 * c1 / 100),
        shipspeed = basespeed * ((ccrew / ships[getShips()]["max_crew"]) + 1) / 2,
        finalspeed = shipspeed + (shipspeed * h1 / 100);
    
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
    var d = Number(d),
        h = Math.floor(d / 3600),
        m = Math.floor(d % 3600 / 60),
        s = Math.floor(d % 3600 % 60);
    return ((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s); 
}


function getTime() {

    var time = getDistance() / getSpeed();

    getID("totalTime").innerHTML = "Time till arrival:  " + secondsToHms(time);

    return time;

}

function minTrip() {
    var tradetime;
    if (getTime() < 3600) {
        tradetime = 3600;}
    else {
        tradetime = getTime();
    }
    return tradetime * 2;
}

function tradeCalc() {
    var trips = 86400 / minTrip(),
        cargo = getID("cargo").value,
        pr = Math.round((trips * getByKey()) * cargo);
    
    getID("totalProfit").innerHTML = "Profit per day ~ " + pr;
}


/*$( "select" )
  .change(function () {
    sumCargo();
    tradeCalc();
  });*/

var selects = document.getElementsByTagName('select');

for(i = 0; i < selects.length; ++i) {
    selects[i].addEventListener('change', function (e) {
        sumCargo();
        tradeCalc();
        max();
}, false)};