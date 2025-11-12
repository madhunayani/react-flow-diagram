import React, { useState, useEffect } from 'react';
import useDiagramStore from '../store/diagramStore';

const EdgeModal = ({ isOpen, onClose, editMode, edge }) => {
  const { nodes, addEdge, updateEdge } = useDiagramStore();
  
  const [formData, setFormData] = useState({
    id: '',
    source: '',
    target: '',
    label: '',
    type: 'smoothstep',
    animated: false
  });

  useEffect(() => {
    if (editMode && edge) {
      setFormData({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        label: edge.label || '',
        type: edge.type || 'smoothstep',
        animated: edge.animated || false
      });
    } else {
      setFormData({
        id: `edge-${Date.now()}`,
        source: '',
        target: '',
        label: '',
        type: 'smoothstep',
        animated: false
      });
    }
  }, [editMode, edge]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.source === formData.target) {
      alert('Source and target nodes must be different');
      return;
    }

    const edgeData = {
      id: formData.id,
      source: formData.source,
      target: formData.target,
      label: formData.label,
      type: formData.type,
      animated: formData.animated
    };

    if (editMode) {
      updateEdge(formData.id, edgeData);
    } else {
      addEdge(edgeData);
    }
    
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{editMode ? 'Edit Edge' : 'Add New Edge'}</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Edge ID:</label>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              disabled={editMode}
              required
            />
          </div>

          <div className="form-group">
            <label>Source Node:</label>
            <select 
              name="source" 
              value={formData.source} 
              onChange={handleChange}
              disabled={editMode}
              required
            >
              <option value="">Select source node</option>
              {nodes.map(node => (
                <option key={node.id} value={node.id}>
                  {node.id} - {node.data.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Target Node:</label>
            <select 
              name="target" 
              value={formData.target} 
              onChange={handleChange}
              disabled={editMode}
              required
            >
              <option value="">Select target node</option>
              {nodes.map(node => (
                <option key={node.id} value={node.id}>
                  {node.id} - {node.data.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Label (optional):</label>
            <input
              type="text"
              name="label"
              value={formData.label}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Edge Type:</label>
            <select name="type" value={formData.type} onChange={handleChange}>
              <option value="default">Default</option>
              <option value="smoothstep">Smooth Step</option>
              <option value="step">Step</option>
              <option value="straight">Straight</option>
            </select>
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="animated"
                checked={formData.animated}
                onChange={handleChange}
              />
              Animated
            </label>
          </div>

          <div className="modal-actions">
            <button type="submit" className="btn btn-primary">
              {editMode ? 'Update' : 'Create'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EdgeModal;
