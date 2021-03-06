$(document).ready(function () {

  // Get references to page elements
  var $employeeName = $("#UserId");
  var $exampleDescription = $("#example-description");
  var $submitBtn = $("#submit");
  var $newTaskList = $("#task-list");
  var $pendingList = $("#pendingTask-list");
  var $completedList = $("#completedTask-list");


  // The API object contains methods for each kind of request we'll make
  var API = {

    newTask: function (handleFormSubmit) {
      return $.ajax({
        url: "api/tasks",
        type: "POST",
        data: handleFormSubmit
      })
    },
   
    getTask: function () {
      return $.ajax({
        url: "api/tasks",
        type: "GET"
      });
    },

    deleteTask: function (id) {
      return $.ajax({
        url: "api/tasks/delete/" + id,
        type: "DELETE"
      });
    },
    updateTask: function (id) {
      return $.ajax({
        url: "api/tasks/" + id,
        type: "PUT"
       
      });
    },
    assignTask: function (id) {
      return $.ajax({
        url: "api/tasks/assign/" + id,
        type: "PUT"
      });
    }
  };


  var handleFormSubmit = function (event) {

    event.preventDefault();
    console.log($employeeName.val());

    var task = {
      name: $employeeName.find('option:selected').text().trim(),
      description: $exampleDescription.val().trim(),
      completed: false,
      UserId: $employeeName.find('option:selected').val().trim(),
    };

    console.log(task)

    if (!(task.name && task.description)) {
      alert("You must enter a name and description!");
      return;
    }

    API.newTask(task).then(function () {
      location.reload();
    })
  };


var handleDeleteBtnClick = function () {
    var idToDelete = $(this)
      .parent()
      .attr("data-id");
    API.deleteTask(idToDelete).then(function () {
      console.log("id to delete" + idToDelete)
      location.reload();
    });
  };

  var completeBtnClick = function () {
    
    var idToMove = $(this)
      .parent()
      .attr("data-id");
    API.updateTask(idToMove).then(function () {
      console.log("id to move" + idToMove)
      location.reload();

    });
  }



  $submitBtn.on("click", handleFormSubmit);
  $pendingList.on("click", ".move", completeBtnClick); 
  $newTaskList.on("click", ".move", completeBtnClick); 
});

