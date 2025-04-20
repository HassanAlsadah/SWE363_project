export let ProjectsData = [
    {
        id: "1",
        name: "SWE363",
        status: "pending",
        description: "This project aims to help managing projects",
        tasks: [
            {
                id: "t1",
                taskName: "Create UI",
                status: "completed",
                assignedTo: "hassan"
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
                role: "Project Leader",
                isLeader: true,

            },
            {
                id: "m2",
                name: "Ahmed",
                role: "Developer",
                isLeader: false,
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
                role: "UI Designer",
                isLeader: true,
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
                role: "UI Designer",
                isLeader: true,
            }
        ]
    },
    {
        id: "5",
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
                role: "UI Designer",
                isLeader: true,
            }
        ]
    },
    {
        id: "2",
        name: "SWE46 new project",
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
                role: "UI Designer",
                isLeader: true,
            }
        ]
    }
];

export const addNewProject = (newProject) => {
    ProjectsData = [...ProjectsData, newProject];
    return ProjectsData;
};


// Get project by ID
export const getProjectById = (projectId) => {
    return ProjectsData.find(project => project.id === projectId);
  };
  
  // Add new task to a project
  export const addTaskToProject = (projectId, newTask) => {
    const project = ProjectsData.find(p => p.id === projectId);
    if (project) {
      const newTaskWithId = {
        id: `t${Date.now()}`,
        status: "pending",
        ...newTask
      };
      project.tasks.push(newTaskWithId);
      return true;
    }
    return false;
  };
  
  // Get all members for a project
  export const getProjectMembers = (projectId) => {
    const project = getProjectById(projectId);
    return project ? project.members : [];
  };
  
  // Update task status
  export const updateTaskStatus = (projectId, taskId, newStatus) => {
    const project = getProjectById(projectId);
    if (project) {
      const task = project.tasks.find(t => t.id === taskId);
      if (task) {
        task.status = newStatus;
        return true;
      }
    }
    return false;
  };

  export const TasksData = [
    {
        id: "t1",
        name: "Create UI",
        status: "Completed",
        projectName: "SWE363",
        dueDate: "2023-06-15",
        completedDate: "2023-06-14"
    },
    {
        id: "t2",
        name: "Create UX",
        status: "Pending",
        projectName: "SWE363",
        dueDate: "2023-06-30"
    },
    {
        id: "t3",
        name: "Design database",
        status: "Completed",
        projectName: "SWE464",
        dueDate: "2023-05-20",
        completedDate: "2023-05-18"
    },
    {
        id: "t4",
        name: "Implement payment",
        status: "in progress",
        projectName: "SWE464",
        dueDate: "2023-07-10"
    }
];