import React from 'react';
import { ReactFlowProvider } from 'reactflow';
import DiagramFlow from './components/DiagramFlow';
import Sidebar from './components/Sidebar';
import './styles/DiagramFlow.css';

function App() {
  return (
    <ReactFlowProvider>
      <div className="app-container">
        <Sidebar />
        <DiagramFlow />
      </div>
    </ReactFlowProvider>
  );
}

export default App;
