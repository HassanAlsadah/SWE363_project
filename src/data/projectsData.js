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
                role: "Project Leader",
                isLeader: false,
            },
            {
                id: "m2",
                name: "Ahmed",
                role: "Developer",
                isLeader: true,
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