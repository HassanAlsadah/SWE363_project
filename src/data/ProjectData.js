export let ProjectsData = [
    {
      id: "1",
      name: "SWE363 Project",
      status: "in progress",
      description: "Web application development",
      tasks: [
        {
          id: "t1",
          taskName: "Design UI mockups",
          status: "completed",
          assignedTo: "Hassan",
          dueDate: "2023-05-15",
          description: "Create Figma mockups for all screens",
          attachment: "ui-mockups.fig"
        },
        {
          id: "t2",
          taskName: "Implement authentication",
          status: "in progress",
          assignedTo: "Mohammed",
          dueDate: "2023-06-10",
          description: "Set up JWT authentication flow",
          attachment: null
        }
      ],
      members: [
        {
          id: "m1",
          name: "Hassan",
          role: "UI/UX Designer",
          email: "hassan@example.com"
        },
        {
          id: "m2",
          name: "Mohammed",
          role: "Frontend Developer",
          email: "mohammed@example.com"
        },
        {
          id: "m3",
          name: "Abbas",
          role: "Backend Developer",
          email: "abbas@example.com"
        }
      ]
    },
    {
      id: "2",
      name: "SWE464 Mobile App",
      status: "planning",
      description: "Cross-platform mobile application",
      tasks: [
        {
          id: "t3",
          taskName: "Research frameworks",
          status: "pending",
          assignedTo: "A",
          dueDate: "2023-06-01",
          description: "Compare React Native vs Flutter",
          attachment: "framework-research.pdf"
        }
      ],
      members: [
        {
          id: "m4",
          name: "Sarah",
          role: "Mobile Developer",
          email: "sarah@example.com"
        },
        {
          id: "m5",
          name: "Ahmed",
          role: "QA Engineer",
          email: "ahmed@example.com"
        }
      ]
    }
  ];
  
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