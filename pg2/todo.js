    function get_todos() {
        var todos = new Array;
        var todos_str = localStorage.getItem('todo');
        if (todos_str !== null) {
            todos = JSON.parse(todos_str); 
        }
        return todos;
    }
     
    function add() {
        var p1 = document.getElementById('portA').value;
        var p2 = document.getElementById('portB').value;
        var profit = calc();
        var todos = get_todos();
        todos.push(p1 + '+' + p2 + '=' + profit);
        localStorage.setItem('todo', JSON.stringify(todos));
     
        show();
     
        return false;
    }
     
    function remove() {
        var id = this.getAttribute('id');
        var todos = get_todos();
        todos.splice(id, 1);
        localStorage.setItem('todo', JSON.stringify(todos));
     
        show();
     
        return false;
    }
     
    function show() {
        var todos = get_todos();
     
    var html = '<ul class="theList">';
    for(var i=0; i<todos.length; i++) {
        html += '<li>' + todos[i] + '<button class="remove" id="' + i  + '">x</button></li>';
    };
    html += '</ul>';
     
        document.getElementById('todos').innerHTML = html;
     
        var buttons = document.getElementsByClassName('remove');
        for (var i=0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', remove);
        };
    }
     

    window.addEventListener('input', function (e) {
    add();
    }, false);