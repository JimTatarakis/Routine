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
    newTask: function (newTask) {
      return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "POST",
        url: "api/tasks",
        data: JSON.stringify(newTask)
      });
    },
    getTask: function () {
      return $.ajax({
        url: "api/tasks",
        type: "GET"
      });
    },
    getPendingTask: function () {
      return $.ajax({
        url: "api/tasks/notcompleted",
        type: "GET"
      });
    },
    getCompleted: function () {
      return $.ajax({
        url: "api/tasks/completed",
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
      return $.ajax({
        url: "api/tasks" + id,
        type: "PUT"
      });
    }
  };

  // refreshExamples gets new examples from the db and repopulates the list
  var pendingTasks = function () {
    API.getTask().then(function (data) {
      var $tasks = data.map(function (task) {
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
          .addClass("btn btn-default btn-sm float-right move pendingBtn")
          .text("✔");


        $li.append($button);

        return $li;
      });


      $pendingList.empty();
      $pendingList.append($tasks);
    });
  };


  pendingTasks();

  var dailyTasks = function () {
    API.getTask().then(function (data) {
      var $tasks = data.map(function (task) {
        var $p = $("<p>")
          .text(task.name)
          .attr("href", "/tasks/" + task.id);

        var $li = $("<li>")
          .attr({
            class: "list-group-item",
            "data-id": task.id
          })
          .append($p);


        return $li;
      });


      $newTaskList.empty();
      $newTaskList.append($tasks);
    });
  };

  dailyTasks();

  // refreshExamples gets new examples from the db and repopulates the list
  var completedTasks = function () {
    API.getTask().then(function (data) {
      if (data.completed === true) {
        var $tasks = data.map(function (task) {
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
      pendingTasks();
    });

    $employeeName.val("");
    $exampleDescription.val("");
  };


  //----------------------------------------------ADD VIEW ALL SECTION---------------------------------------
  $(".viewAll").on("click", function(){
 console.log("this works")


  });
 

//----------------------------------------------404 ERROR WITH ROUTES- NOT ABLE TO UPDATE/DELETE--------------------------
  var handleDeleteBtnClick = function () {
    var idToDelete = $(this)
      .parent()
      .attr("data-id");
    API.deleteTask(idToDelete).then(function () {
      pendingTasks();
    });
  };

  var completeBtnClick = function () {
    var idToMove = $(this)
      .parent()
      .attr("data-id");
    API.updateTask(idToMove).then(function () {
      pendingTasks();
    });
  }


  // Add event listeners to the submit and delete buttons
  $submitBtn.on("click", handleFormSubmit);
  $pendingList.on("click", ".move", completeBtnClick);
  // $newTaskList.on("click", ".delete", handleDeleteBtnClick);
  // $pendingList.on("click", ".delete", handleDeleteBtnClick);
  $completedList.on("click", ".delete", handleDeleteBtnClick);
});

