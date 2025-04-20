import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/navbar';
import UserHomeScreen from './screens/UserHomeScreen';
import UserTasksScreen from './screens/UserTasksScreen';
import UserProjectsPage from './screens/UserProjectsPage';
import CreateProject from './screens/CreateProjectPage';
import ChatList from './screens/ChatListPage';
import ProjectChat from './screens/ProjectChatPage';
import TasksPage from './screens/TasksPage';
import AddTaskScreen from './screens/AddTaskScreen';
import TaskInfoScreen from './screens/TaskInfoScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpPage from './screens/SignUpPage';
import SettingPage from './screens/SettingsPage';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  return currentUser ? children : <Navigate to="/login" replace />;
};

// Public Route Component (for auth pages when already logged in)
const PublicRoute = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  return currentUser ? <Navigate to="/" replace /> : children;
};

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="main-content">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={
              <PublicRoute>
                <LoginScreen />
              </PublicRoute>
            } />
            <Route path="/signup" element={
              <PublicRoute>
                <SignUpPage />
              </PublicRoute>
            } />
            
            {/* Protected Routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <UserHomeScreen />
              </ProtectedRoute>
            } />
            <Route path="/projects" element={
              <ProtectedRoute>
                <UserProjectsPage />
              </ProtectedRoute>
            } />
            <Route path="/projects/:projectId" element={
              <ProtectedRoute>
                <UserProjectsPage />
              </ProtectedRoute>
            } />
            <Route path="/projects/:projectId/tasks" element={
              <ProtectedRoute>
                <TasksPage />
              </ProtectedRoute>
            } />
            <Route path="/projects/:projectId/add-task" element={
              <ProtectedRoute>
                <AddTaskScreen />
              </ProtectedRoute>
            } />
            <Route path="/projects/:projectId/tasks/:taskId" element={
              <ProtectedRoute>
                <TaskInfoScreen />
              </ProtectedRoute>
            } />
            <Route path="/tasks" element={
              <ProtectedRoute>
                <UserTasksScreen />
              </ProtectedRoute>
            } />
            <Route path="/create-project" element={
              <ProtectedRoute>
                <CreateProject />
              </ProtectedRoute>
            } />
            <Route path="/chat" element={
              <ProtectedRoute>
                <ChatList />
              </ProtectedRoute>
            } />
            <Route path="/chat/:chatId" element={
              <ProtectedRoute>
                <ProjectChat />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <SettingPage />
              </ProtectedRoute>
            } />

            {/* Redirect to login as default */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;