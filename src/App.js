import React from 'react';
import CreateProject from './CreateProject';
import ChatList from './ChatList';
import ProjectChat from './ProjectChat';
import { Routes, Route } from 'react-router-dom'; // ✅ Remove Router here

function App() {
  return (
    <div className="App">
      

      {/* REMOVE the direct rendering below or make conditional if needed */}
      {/*<CreateProject />*/}
      {  <ChatList /> }
      { /*<ProjectChat />*/ }
    </div>
  );
}

export default App;
