/*jshint esversion:6*/
$(document).one('pageinit', function(){
  $(function(){
    $('.date').each(function(){
      $(this).datepicker();
    });
  });
  let todos;
  showTodos();
  $('#submitAdd').on('tap', addTask);
  $('#todos').on('tap', '#editLink', setCurrent);
  $('#submitEdit').on('tap', editTask);
  $('#todos').on('tap', '#deleteLink', deleteTask);

  function showTodos(){
    todos = getTodoObject();
    var sortedBy = todos;

    for(let i = 0; i < todos.length; i++){
      $('#todos').append('<li class="ui-body-inherit ui-li-static"><input type="checkbox">' + sortedBy[i].task + '<br>' + sortedBy[i].date + '<div class="controls"><a href="#edit" id="editLink" data-task="' + sortedBy[i].task + '" data-date="' + sortedBy[i].date + '">Muuda</a> | <a href="#" id="deleteLink" data-task="' + sortedBy[i].task + '" data-date="' + sortedBy[i].date + '">Kustuta</a></div></li>');
    }
  }


  function setCurrent(){
    console.log("setCurrent");
    localStorage.setItem('currentTask', $(this).data('task'));
    localStorage.setItem('currentDate', $(this).data('date'));

    $('#editTask').val(localStorage.getItem('currentTask'));
    $('#editDate').val(localStorage.getItem('currentDate'));
  }

  function deleteTask(){
    localStorage.setItem('currentTask', $(this).data('task'));
    localStorage.setItem('currentDate', $(this).data('date'));

    let currentTask = localStorage.getItem('currentTask');
    let currentDate = localStorage.getItem('currentDate');

    todos = getTodoObject();

    for(let i = 0; i < todos.length; i++){
      if(currentDate == todos[i].date && currentTask == todos[i].task){
        todos.splice(i, 1);
      }

      localStorage.setItem('todos', JSON.stringify(todos));
    }

    window.location.href = "index.html";
    return false;
  }

  function editTask(){
    console.log("editTask");
    let currentTask = localStorage.getItem('currentTask');
    let currentDate = localStorage.getItem('currentDate');

    todos = getTodoObject();

    for(let i = 0; i < todos.length; i++){
      if(currentDate == todos[i].date && currentTask == todos[i].task){
        todos.splice(i, 1);
      }

      localStorage.setItem('todos', JSON.stringify(todos));
    }


    let task = $('#editTask').val();
    let date = $('#editDate').val();

    let todo = {
      task: task,
      date: date
    };


    todos.push(todo);
    console.log(todos);
    localStorage.setItem('todos', JSON.stringify(todos));
    window.location.href = "index.html";
    return false;
  }

  function addTask(){
    let task = $('#addTask').val();
    let date = $('#addDate').val();

    let todo = {
      task: task,
      date: date
    };

    todos = getTodoObject();
    todos.push(todo);
    console.log(todos);
    localStorage.setItem('todos', JSON.stringify(todos));
    window.location.href = "index.html";
    return false;
  }

  function getTodoObject(){
    let currentTodos = localStorage.getItem('todos');

    if(currentTodos != null){
      todos = JSON.parse(currentTodos);
    } else{
      todos = [];
    }

    return todos.sort(function(a, b){
      return new Date(b.date) - new Date(a.date);
    });

  }

  document.getElementById('saveToFile').addEventListener("click", saveToFile);

  function saveToFile(){
    console.log("clicked");
    $.post("save.php", {save: todos}.done(function(){
      console.log("done");
    }).fail(function(){
      console.log("failed");
    }).always(function(){
      console.log("always");
    })
  );
  }

var sort_by = function(field, reverse, primer){
  var key = primer ?
    function(x) {return primer(x[field])} :
    function(x) {return x[field]};

    reverse = !reverse ? 1 : -1;

    return function (a, b) {
      return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
    }
};

$("#dateUp").click(function() {
  $('#todos').html("");
  sortedBy = todos.sort(date_sort_up);
  for(let i = 0; i < todos.length; i++){
    $('#todos').append('<li class="ui-body-inherit ui-li-static"><input type="checkbox">' + sortedBy[i].task + '<br>' + sortedBy[i].date + '<div class="controls"><a href="#edit" id="editLink" data-task="' + sortedBy[i].task + '" data-date="' + sortedBy[i].date + '">Muuda</a> | <a href="#" id="deleteLink" data-task="' + sortedBy[i].task + '" data-date="' + sortedBy[i].date + '">Kustuta</a></div></li>');
  }
});

$("#dateDown").click(function() {
  $('#todos').html("");
  sortedBy = todos.sort(date_sort_down);
  for(let i = 0; i < todos.length; i++){
    $('#todos').append('<li class="ui-body-inherit ui-li-static"><input type="checkbox">' + sortedBy[i].task + '<br>' + sortedBy[i].date + '<div class="controls"><a href="#edit" id="editLink" data-task="' + sortedBy[i].task + '" data-date="' + sortedBy[i].date + '">Muuda</a> | <a href="#" id="deleteLink" data-task="' + sortedBy[i].task + '" data-date="' + sortedBy[i].date + '">Kustuta</a></div></li>');
  }
});

$("#nameUp").click(function() {
  $('#todos').html("");
  sortedBy = todos.sort(sort_by('task', true, function(a){return a.toUpperCase()}));
  for(let i = 0; i < todos.length; i++){
    $('#todos').append('<li class="ui-body-inherit ui-li-static"><input type="checkbox">' + sortedBy[i].task + '<br>' + sortedBy[i].date + '<div class="controls"><a href="#edit" id="editLink" data-task="' + sortedBy[i].task + '" data-date="' + sortedBy[i].date + '">Muuda</a> | <a href="#" id="deleteLink" data-task="' + sortedBy[i].task + '" data-date="' + sortedBy[i].date + '">Kustuta</a></div></li>');
  }
});

$("#nameDown").click(function() {
  $('#todos').html("");
  sortedBy = todos.sort(sort_by('task', false, function(a){return a.toUpperCase()}));
  for(let i = 0; i < todos.length; i++){
    $('#todos').append('<li class="ui-body-inherit ui-li-static"><input type="checkbox">' + sortedBy[i].task + '<br>' + sortedBy[i].date + '<div class="controls"><a href="#edit" id="editLink" data-task="' + sortedBy[i].task + '" data-date="' + sortedBy[i].date + '">Muuda</a> | <a href="#" id="deleteLink" data-task="' + sortedBy[i].task + '" data-date="' + sortedBy[i].date + '">Kustuta</a></div></li>');
  }
});

function date_sort_up(a, b) {
  return new Date(a.date).getTime() - new Date(b.date).getTime();
}

function date_sort_down(a, b) {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}


console.log();
// nime järgi sorteerimine:
// todos.sort(sort_by('task', false, function(a){return a.toUpperCase()}))
//Kuup2eva j2rgi sorteerimine:
//todos.sort(date_sort)

});
