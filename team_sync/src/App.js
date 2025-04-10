import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
function App() {
  return (
  <>
  <Router>
    <Navbar/>
    <Routes>
      <Route path='/' />
    </Routes>
  </Router>


  </>
    
  
 
    
  );
}

export default App;
