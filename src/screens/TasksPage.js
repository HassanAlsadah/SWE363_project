import React, { useState } from "react";
import styles from "./TasksPage.css";
import Task from "../Components/Task.js";
import CreateTask from "../Components/CreateTask.js";
import TaskDetails from "../Components/TaskDetails.js";

function TasksPage() {
    const ProjectsData = [
        {
            id: "1",
            name: "SWE363",
            status: "pending",
            description: "This project aims to help managing projects",
            tasks: [
                {
                    id: "t1",
                    taskName: "Create UI",
                    status: "completed"
                },
                {
                    id: "t2",
                    taskName: "Create UX",
                    status: "pending"
                }
            ],
            members: [
                {
                    id: "m1",
                    name: "Hassan",
                    role: "Project Leader"
                },
                {
                    id: "m2",
                    name: "Ahmed",
                    role: "Developer"
                }
            ]
        },
        {
            id: "2",
            name: "SWE464",
            status: "in progress",
            description: "E-commerce platform development",
            tasks: [
                {
                    id: "t3",
                    taskName: "Design database",
                    status: "completed"
                },
                {
                    id: "t4",
                    taskName: "Implement payment",
                    status: "in progress"
                },
                {
                    id: "t44",
                    taskName: "Design database",
                    status: "completed"
                },
                {
                    id: "t43",
                    taskName: "Implement payment",
                    status: "in progress"
                },
                {
                    id: "t332",
                    taskName: "Design database",
                    status: "completed"
                },
                {
                    id: "t423",
                    taskName: "Implement payment",
                    status: "in progress"
                },
                {
                    id: "t342",
                    taskName: "Design database",
                    status: "completed"
                },
                {
                    id: "t24",
                    taskName: "Implement payment",
                    status: "in progress"
                }
            ],
            members: [
                {
                    id: "m3",
                    name: "Sarah",
                    role: "UI Designer"
                }
            ]
        },
        {
            id: "3",
            name: "SWE46rrr4",
            status: "in progress",
            description: "E-commerce platform development",
            tasks: [
                {
                    id: "t5",
                    taskName: "Design database",
                    status: "completed"
                },
                {
                    id: "t6",
                    taskName: "Implement payment",
                    status: "in progress"
                }
            ],
            members: [
                {
                    id: "m4",
                    name: "Sareah",
                    role: "UI Designer"
                }
            ]
        }
    ];
  // Create the array to store the tasks:
  const [tasks, setTasks] = useState([]);
  const [id, setId] = useState();

  // Create the function for adding new tasks:
  function addTask(newTask) {
    // Adding the new task to the array:
    setTasks((prevTasks) => {
      return [...prevTasks, newTask];
    });
  }
  // Deleting a task from the tasks array:
  function deleteTask(id) {
    // Deleting the task from the array:
    setTasks((prevTasks) => {
      return prevTasks.filter((task, index) => {
        return index !== id;
      });
    });
  }
  function DisplayDetils(id) {
    setId(id);
  }

  function editDescription() {
    const description = document.getElementById("description");
    const edit = document.getElementById("editDescription");
    const done = document.getElementById("done");

    const text = description.innerText;

    description.style.display = "none";
    edit.style.display = "block";
    done.style.display = "inline";
    edit.innerText = text;
  }
  function Done() {

    const description = document.getElementById("description");
    const edit = document.getElementById("editDescription");
    const done = document.getElementById("done");
    
    
    description.innerText = edit.value;

    description.style.display = "block";
    edit.style.display = "none";
    done.style.display = "none";
// Updating the task description: 
    // ProjectsData.forEach(element => {
    //     if (element.id == 2){      // Change!
    //         const updat

            
    //     }
    // });
    
  }

  function selectProject(){
    const description = document.getElementById("description");
    ProjectsData.forEach(element => {
        if (element.id == 2){      // Change!
            setTasks(element.tasks);
            description.innerText = element.description;

        }
    });

  }
  return (
    <div className="container">
      <div className="description">
        <div className="descriptionOrganizer">
          <button className="edit" onClick={editDescription}>
            Edit
          </button>
          <h1>Project Description</h1>
          <p id="description">
           
          </p>
          <textarea
            className="editDescription"
            name="edit"
            id="editDescription"
          ></textarea>
          <button id="done" className="editDescription" onClick={Done}>
            Done
          </button>
        </div>
      </div>
      <div className="buttonsArea">
        <button className="button" onClick={selectProject}>Tasks</button>
        <button className="button">Members</button>
      </div>
      <div className="tasksArea">
        <h1>Tasks</h1>
        <div className="displayTasks">
          <div className="listTasks">
            <div>
              {tasks.map((task, index) => {
                return (
                  <CreateTask
                    onClick={DisplayDetils}
                    key={index}
                    id={index}
                    taskId={task.id}
                    description={task.description}
                    assignedTo={task.assignedTo}
                    status={task.status}
                    taskName={task.taskName}
                    onDelete={deleteTask}
                  />
                );
              })}
              <Task onAdd={addTask} />
            </div>
          </div>
          <div className="taskDetails">
            {tasks.map((task, index) => {
              const taskDiv = document.getElementById(`${index}`);

              if (index === id) {
                taskDiv.style.backgroundColor = "red";
                return (
                  <TaskDetails
                  key={index}
                  id={index}
                  taskId={task.id}
                  description={task.description}
                  assignedTo={task.assignedTo}
                  status={task.status}
                  taskName={task.taskName}
                  />
                );
              } else {
                if (taskDiv != null) {
                  taskDiv.style.backgroundColor = "";
                }
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TasksPage;
