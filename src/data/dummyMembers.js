export const members = [
    { 
      id: 1, 
      name: "Hassan", 
      email: "hassan@gmail.com", 
      phone: "0559771818", 
      availableTime: [
        { day: "M", start: "10 PM", end: "12 PM" },
        { day: "W", start: "4 PM", end: "9 PM" }
      ],
      assignedTasks: ["Design User Interface", "API Development"] 
    },
    { 
      id: 2, 
      name: "Mohammed", 
      email: "mohammed@gmail.com", 
      phone: "0554433221", 
      availableTime: [
        { day: "T", start: "1 PM", end: "5 PM" },
        { day: "F", start: "10 AM", end: "2 PM" }
      ],
      assignedTasks: ["Implement Authentication"] 
    },
    { 
      id: 3, 
      name: "Hussain", 
      email: "hussain@gmail.com", 
      phone: "0551122334", 
      availableTime: [
        { day: "W", start: "9 AM", end: "3 PM" },
        { day: "Th", start: "1 PM", end: "6 PM" }
      ],
      assignedTasks: ["Database Setup", "Testing"] 
    }
  ];
  
  // src/data/dummyTasks.js
  export const tasks = [
    { 
      id: 1, 
      title: "Design User Interface", 
      assignedTo: "Hassan", 
      status: "Completed", 
      deadline: "2025-04-10" 
    },
    { 
      id: 2, 
      title: "Implement Authentication", 
      assignedTo: "Mohammed", 
      status: "In Progress", 
      deadline: "2025-04-15" 
    },
    { 
      id: 3, 
      title: "Database Setup", 
      assignedTo: "Hussain", 
      status: "Not Started", 
      deadline: "2025-04-20" 
    },
    { 
      id: 4, 
      title: "API Development", 
      assignedTo: "Hassan", 
      status: "In Progress", 
      deadline: "2025-04-25" 
    },
    { 
      id: 5, 
      title: "Testing", 
      assignedTo: "Hussain", 
      status: "Not Started", 
      deadline: "2025-05-01" 
    }
  ];