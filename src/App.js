import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddTaskScreen from './screens/AddTaskScreen';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <div className="main-content">
          <Routes>
            <Route path="/projects/:projectId/add-task" element={<AddTaskScreen />} />
            {/* Add other routes here */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;