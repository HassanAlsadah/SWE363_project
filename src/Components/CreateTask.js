import React, { useState } from "react";
import styles from "./CreateTask.css";

function CreateTask(props) {
  // Handling the Delete Button:
  function handleClick() {
    // Calling the delete function in the App.js:
    //     - passing the id of the element to be deleted to it.
    props.onDelete(props.id);
  }
  function details() {
    props.onClick(props.id);
  }

  return (
    <div id={props.id} className="card" onClick={details}>
      <h1>{props.taskName}</h1>
      <p>{props.status}</p>
      <button onClick={handleClick}>Delete</button>
    </div>
  );
}

export default CreateTask;