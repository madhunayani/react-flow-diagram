import React, { useState } from 'react';
import useDiagramStore from '../store/diagramStore';
import NodeModal from './NodeModal';
import EdgeModal from './EdgeModal';

const Sidebar = () => {
  const {
    nodes,
    edges,
    addNode,
    selectedNode,
    selectedEdge,
    deleteNode,
    deleteEdge,
    loadMetadata,
    clearDiagram,
    setSelectedNode,
    setSelectedEdge
  } = useDiagramStore();

  const [showNodeModal, setShowNodeModal] = useState(false);
  const [showEdgeModal, setShowEdgeModal] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const handleAddNode = () => {
    setEditMode(false);
    setShowNodeModal(true);
  };

  const handleEditNode = () => {
    if (selectedNode) {
      setEditMode(true);
      setShowNodeModal(true);
    }
  };

  const handleDeleteNode = () => {
    if (selectedNode) {
      deleteNode(selectedNode.id);
      setSelectedNode(null);
    }
  };

  const handleAddEdge = () => {
    setEditMode(false);
    setShowEdgeModal(true);
  };

  const handleEditEdge = () => {
    if (selectedEdge) {
      setEditMode(true);
      setShowEdgeModal(true);
    }
  };

  const handleDeleteEdge = () => {
    if (selectedEdge) {
      deleteEdge(selectedEdge.id);
      setSelectedEdge(null);
    }
  };

  const handleLoadSample = async () => {
    try {
      const response = await fetch('/sampleMetadata.json');
      const sampleMetadata = await response.json();
      loadMetadata(sampleMetadata);
    } catch (error) {
      console.error('Error loading sample metadata:', error);
      alert('Failed to load sample metadata');
    }
  };

  const handleExportJSON = () => {
    const data = { nodes, edges };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'diagram-metadata.json';
    link.click();
  };

  const handleImportJSON = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const metadata = JSON.parse(e.target.result);
          loadMetadata(metadata);
        } catch (error) {
          alert('Invalid JSON file');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Diagram Controls</h2>
      </div>

      <div className="sidebar-section">
        <h3>Node Operations</h3>
        <button onClick={handleAddNode} className="btn btn-primary">
          + Add Node
        </button>
        <button 
          onClick={handleEditNode} 
          className="btn btn-secondary"
          disabled={!selectedNode}
        >
          ✏️ Edit Node
        </button>
        <button 
          onClick={handleDeleteNode} 
          className="btn btn-danger"
          disabled={!selectedNode}
        >
          🗑️ Delete Node
        </button>
      </div>

      <div className="sidebar-section">
        <h3>Edge Operations</h3>
        <button onClick={handleAddEdge} className="btn btn-primary">
          + Add Edge
        </button>
        <button 
          onClick={handleEditEdge} 
          className="btn btn-secondary"
          disabled={!selectedEdge}
        >
          ✏️ Edit Edge
        </button>
        <button 
          onClick={handleDeleteEdge} 
          className="btn btn-danger"
          disabled={!selectedEdge}
        >
          🗑️ Delete Edge
        </button>
      </div>

      <div className="sidebar-section">
        <h3>Diagram Operations</h3>
        <button onClick={handleLoadSample} className="btn btn-info">
          📥 Load Sample
        </button>
        <button onClick={handleExportJSON} className="btn btn-success">
          💾 Export JSON
        </button>
        <label className="btn btn-warning file-input-label">
          📂 Import JSON
          <input 
            type="file" 
            accept=".json"
            onChange={handleImportJSON}
            style={{ display: 'none' }}
          />
        </label>
        <button onClick={clearDiagram} className="btn btn-danger">
          🗑️ Clear All
        </button>
      </div>

      {selectedNode && (
        <div className="sidebar-section selection-info">
          <h3>Selected Node</h3>
          <p><strong>ID:</strong> {selectedNode.id}</p>
          <p><strong>Type:</strong> {selectedNode.type}</p>
          <p><strong>Label:</strong> {selectedNode.data.label}</p>
        </div>
      )}

      {selectedEdge && (
        <div className="sidebar-section selection-info">
          <h3>Selected Edge</h3>
          <p><strong>ID:</strong> {selectedEdge.id}</p>
          <p><strong>From:</strong> {selectedEdge.source}</p>
          <p><strong>To:</strong> {selectedEdge.target}</p>
        </div>
      )}

      {showNodeModal && (
        <NodeModal
          isOpen={showNodeModal}
          onClose={() => {
            setShowNodeModal(false);
            setSelectedNode(null);
          }}
          editMode={editMode}
          node={editMode ? selectedNode : null}
        />
      )}

      {showEdgeModal && (
        <EdgeModal
          isOpen={showEdgeModal}
          onClose={() => {
            setShowEdgeModal(false);
            setSelectedEdge(null);
          }}
          editMode={editMode}
          edge={editMode ? selectedEdge : null}
        />
      )}
    </div>
  );
};

export default Sidebar;
