import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import UserHomeScreen from './screens/UserHomeScreen';
import UserTasksScreen from './screens/UserTasksScreen';
import UserProjectsPage from './screens/UserProjectsPage';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<UserHomeScreen />} />
            <Route path="/projects" element={<UserProjectsPage/>} />
            <Route path="/tasks" element={<UserTasksScreen />} />
            <Route path="/projects/:projectId" element={<UserProjectsPage />} />



            {/* Add other routes here */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;