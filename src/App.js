import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddTaskScreen from './screens/AddTaskScreen';
import TaskInformationScreen from './screens/TaskInformationScreen';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <div className="main-content">
          <Routes>
          <Route path="/projects/:projectId/add-task" element={<AddTaskScreen />} />


            
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;