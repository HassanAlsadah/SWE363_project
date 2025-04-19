import React, { useState } from "react";
import "../styles/TasksPage.css";

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

    // Task component implementation
    function Task(props) {
        const [task, setTask] = useState({
            description: "",
            assignedTo: "",
            status: "In-Progress",
            deadline: "",
        });
        
        function handleChange(event) {
            const { name, value } = event.target;
            setTask((prevTask) => ({
                ...prevTask,
                [name]: value,
            }));
        }
        
        function submitTask(event) {
            const submit = document.getElementById("taskForm");
            const add = document.getElementById("add");
            add.style.display = "inline";
            submit.style.display = "none";
            props.onAdd(task);
            event.preventDefault();
            setTask({
                description: "",
                assignedTo: "",
                status: "In-Progress",
                deadline: "",
            });
        }
        
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

    // CreateTask component implementation
    function CreateTask(props) {
        function handleClick(e) {
            e.stopPropagation();
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

    // TaskDetails component implementation
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

    // Main TasksPage component logic
    const [tasks, setTasks] = useState([]);
    const [id, setId] = useState();

    function addTask(newTask) {
        setTasks((prevTasks) => [...prevTasks, newTask]);
    }

    function deleteTask(id) {
        setTasks((prevTasks) => prevTasks.filter((task, index) => index !== id));
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
    }

    function selectProject() {
        const description = document.getElementById("description");
        ProjectsData.forEach(element => {
            if (element.id == 2) {
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
                    <p id="description"></p>
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
                            {tasks.map((task, index) => (
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
                            ))}
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