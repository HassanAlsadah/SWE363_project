import React, { useState } from "react";
import styles from "./Task.css";

function Task(props) {
  // Create a state to hold task objects and update them:
  const [task, setTask] = useState({
    description: "",
    assignedTo: "",
    status: "In-Progress",
    deadline: "",
  });
  // Adding new task to our array:
  function handleChange(event) {
    // Grapping the inputs from the form:
    const { name, value } = event.target;

    // Create a new Task object:
    setTask((prevTask) => {
      return {
        ...prevTask, // Appending the previous tasks.
        [name]: value, // Appending the newly entered values.
      };
    });
  }
  // Prompting the user for tasks:
  function submitTask(event) {
    // Grapping the form:
    const submit = document.getElementById("taskForm");
    // Grapping the add task button:
    const add = document.getElementById("add");
    // Display the add button back:
    add.style.display = "inline";
    // Hide the user prompt:
    submit.style.display = "none";
    // Adding the task to our list of tasks:
    props.onAdd(task);
    // Preventing the page from loading:
    event.preventDefault();
    // Reseting the input fields:
    setTask({
      description: "",
      assignedTo: "",
      status: "In-Progress",
      deadline: "",
    });
  }
  // Handling the add Task button:
  function proptTask(event) {
    const submit = document.getElementById("taskForm");
    const add = document.getElementById("add");
    add.style.display = "none";
    submit.style.display = "block";
  }
  function Cancel(event) {
    event.preventDefault();
    const submit = document.getElementById("taskForm");
    submit.style.display = "none";
    const add = document.getElementById("add");
    add.style.display = "inline";
  }

  return (
    <div>
      <form id="taskForm">
        <label htmlFor="description">Description: </label>
        <textarea
          name="description"
          placeHolder="Enter the task description"
          rows="4"
          value={task.description}
          onChange={handleChange}
          required
        ></textarea>

        <br />
        <label htmlFor="member">Assign the Task To:</label>
        <input
          value={task.assignedTo}
          name="assignedTo"
          type="text"
          placeHolder="Assign To?"
          onChange={handleChange}
          required
        />
        <br />
        <button onClick={submitTask}>Add</button>
        <button onClick={Cancel}>Cancel</button>
      </form>
      <button className="add" id="add" onClick={proptTask}>
        Add Task
      </button>
    </div>
  );
}

export default Task;
