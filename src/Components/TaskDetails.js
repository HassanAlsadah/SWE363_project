import React from "react";
import style from "./TaskDetails.css";

function TaskDetails(props) {
  function handleDisplay() {
    props.display(props.id);
  }
  return (
    <div className="main">
      <div>
        <h1>{props.taskName}</h1>
      </div>
      <div className="detail">
        <h1>Task Description</h1>
        <p>{props.description}</p>
      </div>
      <div className="detail">
        <h1>Assigned Member</h1>
        <p>{props.assignedTo}</p>
      </div>
      <div className="detail">
        <h1>Task Status</h1>
        <p>{props.status}</p>
      </div>
      <div className="detail">
        <h1>Task Deadline</h1>
        <p>{props.deadline}</p>
      </div>
    </div>
  );
}

export default TaskDetails;
