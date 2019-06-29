$(document).ready(function () {

  // Get references to page elements
  var $employeeName = $("#name-text");
  var $exampleDescription = $("#example-description");
  var $submitBtn = $("#submit");
  var $taskList = $("#task-list");
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
    deleteTask: function (id) {
      return $.ajax({
        url: "api/tasks/completed" + id,
        type: "DELETE"
      });
    }
  };

  // refreshExamples gets new examples from the db and repopulates the list
  var refreshTasks = function () {
    API.getTask().then(function (data) {
      var $tasks = data.map(function (task) {
        var $a = $("<a>")
          .text(task.name)
          .attr("href", "/example/" + task.id);

        var $li = $("<li>")
          .attr({
            class: "list-group-item",
            "data-id": task.id
          })
          .append($a);

        var $button = $("<button>")
          .addClass("btn btn-danger float-right delete")
          .text("ｘ");

        $li.append($button);

        return $li;
      });

      $taskList.empty();
      $taskList.append($tasks);
    });
  };


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
      refreshTasks();
    });

    $employeeName.val("");
    $exampleDescription.val("");
  };

  // handleDeleteBtnClick is called when an example's delete button is clicked
  // Remove the example from the db and refresh the list
  var handleDeleteBtnClick = function () {
    var idToDelete = $(this)
      .parent()
      .attr("data-id");

    API.deleteTask(idToDelete).then(function () {
      refreshTasks();
    });
  };

  // Add event listeners to the submit and delete buttons
  $submitBtn.on("click", handleFormSubmit);
  $taskList.on("click", ".delete", handleDeleteBtnClick);
  $pendingList.on("click", ".delete", handleDeleteBtnClick);
  $completedList.on("click", ".delete", handleDeleteBtnClick);

});
