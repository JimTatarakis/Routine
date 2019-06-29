$(document).ready(function () {

  // Get references to page elements
  var $employeeName = $("#name-text");
  var $exampleDescription = $("#example-description");
  var $submitBtn = $("#submit");
  var $newTaskList = $("#task-list");
  var $pendingList = $("#pendingTask-list");
  var $completedList = $("#completedTask-list");


  // The API object contains methods for each kind of request we'll make
  var API = {
   
    getTask: function () {
      return $.ajax({
        url: "api/tasks",
        type: "GET"
      });
    },

    deleteTask: function (id) {
      return $.ajax({
        url: "api/tasks/completed" + id,
        type: "DELETE"
      });
    },
    updateTask: function (id) {
      console.log("updating")
      // let id = data.id
      return $.ajax({
        url: "api/tasks/" + id,
        type: "PUT"
       
      });
    }
  };

 

  // refreshExamples gets new examples from the db and repopulates the list
  var completedTasks = function () {
    API.getTask().then(function (data) {
      if (data.completed === true) {
        var $tasks = data.map(function (task) {
          // console.log(this)
          var $a = $("<a>")
            .text(task.name)
            .attr("href", "/tasks/" + task.id);

          var $li = $("<li>")
            .attr({
              class: "list-group-item",
              "data-id": task.id
            })
            .append($a);

          var $button = $("<button>")
            .addClass("btn btn-danger btn-sm float-right delete")
            .text("✔");


          $li.append($button);

          return $li;
        });


        $completedList.empty();
        $completedList.append($tasks);
      } else {
        console.log("no incomplete tasks")
      }
    });
  };
  completedTasks()

  // handleFormSubmit is called whenever we submit a new example
  // Save the new example to the db and refresh the list
  var handleFormSubmit = function (event) {
    console.log(this)
    event.preventDefault();

    var task = {
      name: $employeeName.val().trim(),
      completed: $exampleDescription.val().trim()
    };

    if (!(task.name && task.completed)) {
      alert("You must enter a name and description!");
      return;
    }

    API.newTask(task).then(function () {
      // pendingTasks();
      location.reload();

    })
    $employeeName.val("");
    $exampleDescription.val("");
  };



 

//----------------------------------------------404 ERROR WITH ROUTES- NOT ABLE TO UPDATE/DELETE--------------------------
  var handleDeleteBtnClick = function () {
    var idToDelete = $(this)
      .parent()
      .attr("data-id");
    API.deleteTask(idToDelete).then(function () {
      console.log("id to move" + idToMove)
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
  $completedList.on("click", ".delete", handleDeleteBtnClick);
});

