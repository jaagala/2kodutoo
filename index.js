/*jshint esversion:6*/
class Todo{
  constructor(title, description, date){
    this.title = title;
    this.description = description;
    this.date = date;
    this.done = false;
  }
}

let todos = [];

$('#addButton').on('click', () => addEntry());
$('#saveButton').on('click', ()=> saveToFile());
$('#loadButton').on('click', ()=>render());

function render(){
  $('#todos').html("");
  $.get('database.txt', function(data){
    let content = JSON.parse(data).content;

    content.forEach(function(todo, todoIndex){
      $('#todos').append('<ul><li>'+ todoIndex +'</li><li>'+ todo.title +'</li><li>'+ todo.description +'</li><li>'+ todo.date +'</li></ul>');
    });

  });
}

function saveToFile(){

  $.post("server2.php", {save: todos}).done(function(){
    console.log("done");
  }).fail(function(){
    console.log("fail");
  }).always(function(){
    console.log("always");
  });
}

function addEntry(){
  const titleValue = $('#title').val();
  const descriptionValue = $('#description').val();
  const dateValue = $('#date').val();

  todos.push(new Todo(titleValue, descriptionValue, dateValue));

  console.log(todos);
}
