import React, { useState, useEffect } from 'react';
import useDiagramStore from '../store/diagramStore';

const NodeModal = ({ isOpen, onClose, editMode, node }) => {
  const { addNode, updateNode } = useDiagramStore();
  
  const [formData, setFormData] = useState({
    id: '',
    label: '',
    type: 'default',
    positionX: 250,
    positionY: 250,
    backgroundColor: '#ffffff',
    textColor: '#000000'
  });

  useEffect(() => {
    if (editMode && node) {
      setFormData({
        id: node.id,
        label: node.data.label || '',
        type: node.type || 'default',
        positionX: node.position.x,
        positionY: node.position.y,
        backgroundColor: node.style?.backgroundColor || '#ffffff',
        textColor: node.style?.color || '#000000'
      });
    } else {
      setFormData({
        id: `node-${Date.now()}`,
        label: '',
        type: 'default',
        positionX: 250,
        positionY: 250,
        backgroundColor: '#ffffff',
        textColor: '#000000'
      });
    }
  }, [editMode, node]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const nodeData = {
      id: formData.id,
      type: formData.type,
      position: { x: parseFloat(formData.positionX), y: parseFloat(formData.positionY) },
      data: { label: formData.label },
      style: {
        backgroundColor: formData.backgroundColor,
        color: formData.textColor,
        border: '1px solid #777',
        padding: 10,
        borderRadius: 5
      }
    };

    if (editMode) {
      updateNode(formData.id, nodeData);
    } else {
      addNode(nodeData);
    }
    
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{editMode ? 'Edit Node' : 'Add New Node'}</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Node ID:</label>
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
            <label>Label:</label>
            <input
              type="text"
              name="label"
              value={formData.label}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Node Type:</label>
            <select name="type" value={formData.type} onChange={handleChange}>
              <option value="default">Default</option>
              <option value="input">Input</option>
              <option value="output">Output</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Position X:</label>
              <input
                type="number"
                name="positionX"
                value={formData.positionX}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Position Y:</label>
              <input
                type="number"
                name="positionY"
                value={formData.positionY}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Background Color:</label>
              <input
                type="color"
                name="backgroundColor"
                value={formData.backgroundColor}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Text Color:</label>
              <input
                type="color"
                name="textColor"
                value={formData.textColor}
                onChange={handleChange}
              />
            </div>
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

export default NodeModal;
