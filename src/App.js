import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import UserHomeScreen from './screens/UserHomeScreen';
import UserTasksScreen from './screens/UserTasksScreen';
import UserProjectsPage from './screens/UserProjectsPage';
import CreateProject from './screens/CreateProjectPage';
import ChatList from './screens/ChatListPage';
import ProjectChat from './screens/ProjectChatPage';
import TasksPage from './screens/TasksPage';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="main-content">
          <Routes>
            {/* Main Application Routes */}
            <Route path="/" element={<UserHomeScreen />} />
            <Route path="/projects" element={<UserProjectsPage />} />
            <Route path="/projects/:projectId" element={<UserProjectsPage />} />
            <Route path="/tasks" element={<UserTasksScreen />} />
            <Route path="/create-project" element={<CreateProject />} />
            
            {/* Chat Routes - Updated Structure */}
            <Route path="/chat" element={<ChatList />} />
            <Route 
              path="/chat/:chatId" 
              element={<ProjectChat />} 
            />
            
            {/* Fallback Route */}
            <Route path="*" element={<TasksPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;