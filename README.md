# Project and discription

TeamSync is an innovative web-based platform designed to streamline team collaboration, task management, and project tracking. The platform
empowers team leaders to assign tasks efficiently, monitor progress, and ensure seamless communication among members. By integrating task assignment, real-
time activity tracking, and an interactive chat system, TeamSync enhances
productivity and transparency within teams.
• The platform features an intuitive dashboard that provides an overview of ongoing projects, pending tasks, and upcoming deadlines. It also includes role-based
access, allowing leaders to oversee projects while enabling members to contribute effectively. The built-in chat system facilitates direct communication and group discussions, ensuring quick decision-making and collaboration.
• With advanced notifications, automated tracking, and file-sharing capabilities,
TeamSync minimizes miscommunication and keeps teams aligned. The system is ideal for businesses, startups, and academic teams looking for a structured and efficient way to manage their projects.
• By fostering teamwork, accountability, and efficiency, TeamSync aims to be the go-
to platform for organizations seeking an all-in-one project management solution.


# Setup and installation instructions.

The completed system exists in the main branch

Before running the project, make sure to install these required dependencies:
### npm install

### npm install react-router-dom react-icons

### yarn add react-router-dom react-icons
 
In the project directory, you can run:

### npm start

🔐 Authentication
| Method | Endpoint               | Description          |
| ------ | ---------------------- | -------------------- |
| POST   | `/auth/register`       | Register new user    |
| POST   | `/auth/login`          | Login user           |
| GET    | `/auth/me`             | Get current user     |
| POST   | `/auth/logout`         | Logout user          |
| PUT    | `/auth/updatedetails`  | Update user details  |
| PUT    | `/auth/updatepassword` | Update user password |

📁 Projects
| Method | Endpoint                          | Description           |
| ------ | --------------------------------- | --------------------- |
| GET    | `/projects`                       | Get all projects      |
| POST   | `/projects`                       | Create a project      |
| GET    | `/projects/:id`                   | Get a project by ID   |
| GET    | `/projects/my-projects`           | Get user's projects   |
| PUT    | `/projects/:id`                   | Update a project      |
| DELETE | `/projects/:id`                   | Delete a project      |
| POST   | `/projects/:id/members`           | Add member to project |
| DELETE | `/projects/:id/members/:memberId` | Remove member         |


✅ Tasks
| Method | Endpoint                             | Description             |
| ------ | ------------------------------------ | ----------------------- |
| GET    | `/tasks`                             | Get all tasks           |
| GET    | `/tasks/recent`                      | Get user's recent tasks |
| GET    | `/projects/:projectId/tasks`         | Get tasks in a project  |
| POST   | `/projects/:projectId/tasks`         | Create task             |
| DELETE | `/projects/:projectId/tasks/:taskId` | Delete task             |
| PUT    | `/tasks/:taskId`                     | Update task             |
| POST   | `/tasks/:taskId/comments`            | Add comment             |
| POST   | `/tasks/:taskId/attachments`         | Upload attachment       |
| GET    | `/tasks/overdue`                     | Get overdue tasks       |


💬 Chats
| Method | Endpoint        | Description             |
| ------ | --------------- | ----------------------- |
| GET    | `/chats`        | Get all chats           |
| GET    | `/chats/recent` | Get user's recent chats |
| POST   | `/chats`        | Create chat             |
| GET    | `/chats/:id`    | Get chat by ID          |


👤 Users
| Method | Endpoint                                      | Description                      |
| ------ | --------------------------------------------- | -------------------------------- |
| GET    | `/users`                                      | Get all users                    |
| GET    | `/users?search=term&excludeProject=projectId` | Search users excluding a project |



# Usage instructions and examples.

There is a demonstration video in the main branch 


# Team member names and roles.

Hassan Alsadah (leader) | 202157890 
Mohammed Allail (co-leader)| 202152850
Ali Lutfallah | 202173550 
Abbas Alali | 202167590
Hussain Alibrahim | 202165950
Ahmed Al Zuabi | 201968070
 

