# 📚 React Flow Diagram - Complete Project Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Purpose & Use Cases](#purpose--use-cases)
3. [Technology Stack](#technology-stack)
4. [Architecture Overview](#architecture-overview)
5. [File Structure & Explanations](#file-structure--explanations)
6. [Component Breakdown](#component-breakdown)
7. [State Management Details](#state-management-details)
8. [Data Flow & Workflow](#data-flow--workflow)
9. [Key Features Explained](#key-features-explained)
10. [Setup & Installation](#setup--installation)
11. [Usage Guide](#usage-guide)
12. [JSON Data Schema](#json-data-schema)
13. [API Reference](#api-reference)
14. [Development Workflow](#development-workflow)
15. [Troubleshooting](#troubleshooting)

---

## Project Overview

**React Flow Diagram** is a modern, interactive web application built with React that enables users to create, edit, and manage complex node-edge diagrams (flowcharts, workflow diagrams, network topology diagrams, etc.) directly in the browser.

The application provides a canvas-based interface similar to tools like Figma, Lucidchart, or Draw.io, but with a focus on simplicity and ease of use for creating visual workflows and connection diagrams.

### Key Highlights
- **Interactive Canvas:** Intuitive drag-and-drop interface for creating and managing diagram elements
- **Real-time State Management:** Powered by Zustand for performant, centralized state handling
- **JSON-based Persistence:** Import and export diagrams as JSON files for easy sharing and version control
- **Fully Responsive Design:** Works seamlessly on desktop, tablet, and mobile devices
- **No Backend Required:** Completely client-side application - all processing happens in the browser

---

## Purpose & Use Cases

### Primary Use Cases
1. **Flowchart Creation:** Design process flows, decision trees, and system workflows
2. **Network Topology Diagrams:** Visualize network architectures and infrastructure layouts
3. **Organizational Charts:** Map hierarchical structures and reporting relationships
4. **Data Flow Diagrams:** Document data movement and transformation in systems
5. **Wireframing & Prototyping:** Quickly sketch UI layouts and user experience flows
6. **Business Process Modeling:** Create BPMN-style diagrams without specialized software

### Target Audience
- Product Managers and Business Analysts
- Software Architects and Engineers
- UI/UX Designers
- Educational Institutions (teaching workflow concepts)
- Business Process Analysts

---

## Technology Stack

### Core Framework
- **React 19.2.0:** Modern UI library with hooks support and optimized rendering
- **React DOM 19.2.0:** React rendering engine for web browsers

### Diagramming Engine
- **React Flow 11.11.4:** Purpose-built library for interactive node-edge diagrams
  - Provides drag-and-drop functionality
  - Built-in node and edge rendering
  - Handle system for connections
  - Minimap and control features
  - Performance optimized for large diagrams

### State Management
- **Zustand 5.0.8:** Lightweight, fast state management library
  - No boilerplate or providers needed (compared to Redux)
  - Direct mutation updates with batching
  - Minimal API surface (fast learning curve)
  - Better performance with selective re-renders

### Build & Development Tools
- **React Scripts 5.0.1:** Create React App development environment
  - Webpack bundling
  - Development server with hot reloading
  - Optimized production builds

### Testing
- **@testing-library/react:** React component testing utilities
- **@testing-library/jest-dom:** DOM matchers for Jest
- **@testing-library/user-event:** User interaction simulation

---

## Architecture Overview

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    React Application                     │
├─────────────────────────────────────────────────────────┤
│  ┌──────────────┐                   ┌──────────────┐   │
│  │   App.js     │                   │  Sidebar.jsx │   │
│  │  (Root)      │───────────────────│ (Controls)   │   │
│  └──────────────┘                   └──────────────┘   │
│         │                                               │
│         │ Uses                         Manages          │
│         ▼                              ▼                │
│  ┌──────────────────┐      ┌────────────────────────┐  │
│  │ DiagramFlow.jsx  │      │  Zustand Store         │  │
│  │  (Canvas)        │◄────►│  (diagramStore.js)     │  │
│  └──────────────────┘      │                        │  │
│         │                  │ • Nodes []             │  │
│         │                  │ • Edges []             │  │
│         │                  │ • Selected Node/Edge   │  │
│         │                  └────────────────────────┘  │
│         │                                               │
│         ├─► Renders ────────────────────────────────┐  │
│         │                                           │  │
│         ▼                                           ▼  │
│  ┌──────────────┐                    ┌──────────────┐ │
│  │ React Flow   │                    │  Modals      │ │
│  │ Nodes/Edges  │                    │  (Edit UI)   │ │
│  └──────────────┘                    └──────────────┘ │
│                                                        │
└─────────────────────────────────────────────────────────┘
         │
         ▼
    Browser DOM
    (Renders interactive diagram)
```

### Data Flow Pattern

```
User Action
    ↓
Component Event Handler
    ↓
Zustand Store Action (addNode, updateEdge, etc.)
    ↓
Store Mutation (state updated)
    ↓
React Re-render (subscribed components re-render)
    ↓
UI Updates (canvas reflects new state)
```

---

## File Structure & Explanations

```
react-flow-diagram/
│
├── package.json              # Project metadata & dependencies
├── README.md                 # Quick start guide
├── PROJECT_DOCUMENTATION.md  # This comprehensive guide
│
├── public/                   # Static assets served by the app
│   ├── index.html           # HTML entry point
│   ├── manifest.json        # PWA manifest (optional)
│   ├── robots.txt           # SEO robots rules
│   └── sampleMetadata.json  # Pre-built diagram example for demo
│
└── src/                      # Application source code
    ├── index.js             # React app entry point (renders App to DOM)
    ├── App.js               # Root component (connects all pieces)
    ├── App.css              # Global application styles
    ├── App.test.js          # Tests for App component
    ├── index.css            # Global CSS variables & resets
    ├── reportWebVitals.js   # Performance metrics reporting
    ├── setupTests.js        # Jest test configuration
    │
    ├── components/          # Reusable React components
    │   ├── DiagramFlow.jsx   # Main canvas component (React Flow wrapper)
    │   ├── Sidebar.jsx       # Control panel & action buttons
    │   ├── NodeModal.jsx     # Modal form for creating/editing nodes
    │   └── EdgeModal.jsx     # Modal form for creating/editing edges
    │
    ├── store/               # State management
    │   └── diagramStore.js   # Zustand store (single source of truth)
    │
    └── styles/              # Component-specific styles
        └── DiagramFlow.css   # DiagramFlow layout & styling
```

### File Purposes in Detail

#### `package.json`
- Declares project name, version, and dependencies
- Defines npm scripts (start, build, test)
- Specifies Node.js version compatibility

#### `public/index.html`
- Standard HTML5 template
- Contains single `<div id="root">` for React mounting
- Links to favicon and app icons

#### `public/sampleMetadata.json`
- Pre-configured diagram with sample nodes and edges
- Used by "Load Sample" button in the UI
- Helps users understand the expected JSON format

#### `src/index.js`
```javascript
// Mounts the React app to the DOM
ReactDOM.render(<App />, document.getElementById('root'));
```

#### `src/App.js`
- Root component that orchestrates the entire application
- Imports and renders main components (DiagramFlow, Sidebar)
- Provides context if needed

#### `src/store/diagramStore.js`
- Central state store using Zustand
- Contains all diagram data (nodes, edges, selections)
- Exports actions to modify the state
- Used by all components that need diagram data

#### Component Files
- **DiagramFlow.jsx:** Wraps React Flow library, renders nodes/edges
- **Sidebar.jsx:** Buttons for node/edge operations, import/export
- **NodeModal.jsx:** Form UI for node configuration
- **EdgeModal.jsx:** Form UI for edge configuration

---

## Component Breakdown

### 1. **App.js** (Root Component)

**Responsibility:** Orchestrate the entire application

**Structure:**
```javascript
function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <DiagramFlow />
    </div>
  );
}
```

**Key Points:**
- Simple layout with sidebar on left, canvas on right
- Provides overall container styling
- No state management at this level (delegated to Zustand)

---

### 2. **DiagramFlow.jsx** (Canvas Component)

**Responsibility:** Display and manage the interactive diagram canvas

**Features:**
- Wraps React Flow library's `ReactFlow` component
- Renders all nodes and edges from store
- Handles drag-and-drop node interactions
- Provides minimap navigation
- Manages pan/zoom controls

**Key Dependencies:**
- React Flow library (for rendering nodes/edges)
- Zustand store (for reading/updating diagram data)

**User Interactions Handled:**
- Dragging nodes to reposition
- Clicking handles to create connections
- Double-clicking nodes to edit
- Mouse wheel to zoom
- Spacebar+drag to pan

---

### 3. **Sidebar.jsx** (Control Panel)

**Responsibility:** Provide action buttons and user controls

**Features:**
- "Add Node" button → Opens NodeModal
- "Add Edge" button → Opens EdgeModal
- "Edit Node" button → Opens NodeModal with selected node data
- "Edit Edge" button → Opens EdgeModal with selected edge data
- "Delete Node/Edge" buttons → Removes from store
- "Load Sample" button → Loads sampleMetadata.json
- "Import JSON" file input → Loads custom diagram
- "Export JSON" button → Downloads current state as JSON

**State Observing:**
- Watches `selectedNode` and `selectedEdge` from store
- Enables/disables buttons based on current selection

---

### 4. **NodeModal.jsx** (Node Configuration Form)

**Responsibility:** Provide UI for creating and editing nodes

**Form Fields:**
- Node ID (auto-generated if empty)
- Node Type (input, default, output)
- Node Label (display text)
- Position (X, Y coordinates)
- Styling options (background color, border, etc.)

**Actions:**
- "Create" button → Calls `addNode()` in store
- "Update" button → Calls `updateNode()` in store
- "Cancel" button → Closes modal without changes

---

### 5. **EdgeModal.jsx** (Edge Configuration Form)

**Responsibility:** Provide UI for creating and editing edges

**Form Fields:**
- Edge ID (auto-generated if empty)
- Source Node (dropdown or manual entry)
- Target Node (dropdown or manual entry)
- Edge Type (default, smoothstep, step, straight)
- Label (optional text on edge)
- Animated (checkbox for animated flowing effect)

**Actions:**
- "Create" button → Calls `addEdge()` in store
- "Update" button → Calls `updateEdge()` in store
- "Cancel" button → Closes modal

---

## State Management Details

### Zustand Store (`diagramStore.js`)

The store is the single source of truth for all diagram data and operations.

#### State Properties

```javascript
{
  nodes: [
    // Array of node objects currently on the canvas
    { id, type, position, data, style }
  ],
  
  edges: [
    // Array of edge objects connecting nodes
    { id, source, target, type, animated, label }
  ],
  
  selectedNode: null,    // Currently selected node ID or null
  selectedEdge: null,    // Currently selected edge ID or null
}
```

#### Core Actions

**Node Operations:**
- `addNode(node)` - Create new node with auto-generated ID
- `updateNode(id, updates)` - Modify existing node properties
- `deleteNode(id)` - Remove node (also removes connected edges)
- `setNodes(nodes)` - Replace all nodes (used for bulk operations)

**Edge Operations:**
- `addEdge(edge)` - Create new edge with auto-generated ID
- `updateEdge(id, updates)` - Modify edge properties
- `deleteEdge(id)` - Remove edge
- `setEdges(edges)` - Replace all edges

**Selection Management:**
- `selectNode(id)` - Mark node as selected
- `selectEdge(id)` - Mark edge as selected
- `clearSelection()` - Deselect all

**Bulk Operations:**
- `loadMetadata(metadata)` - Load entire diagram from JSON
- `clearDiagram()` - Delete all nodes and edges
- `getState()` - Retrieve current state

#### Store Usage Pattern

```javascript
// In a component
import { useDiagramStore } from '../store/diagramStore';

function MyComponent() {
  // Subscribe to specific parts of state
  const nodes = useDiagramStore((state) => state.nodes);
  const addNode = useDiagramStore((state) => state.addNode);
  
  // Use in component
  const handleAdd = () => {
    addNode({ data: { label: 'New Node' } });
  };
  
  return <button onClick={handleAdd}>Add Node</button>;
}
```

---

## Data Flow & Workflow

### Complete User Journey: Creating a Node

```
1. User clicks "Add Node" button in Sidebar
   ↓
2. NodeModal opens (modal visibility state managed locally in component)
   ↓
3. User fills form (ID, Label, Position, Style)
   ↓
4. User clicks "Create" button
   ↓
5. NodeModal calls: store.addNode({ id, type, position, data, style })
   ↓
6. Zustand store updates state.nodes array with new node
   ↓
7. All subscribed components re-render with new state
   ↓
8. DiagramFlow component receives updated nodes array
   ↓
9. React Flow renders new node on canvas
   ↓
10. NodeModal closes
```

### Creating an Edge (Manual Method)

```
1. User clicks "Add Edge" button in Sidebar
   ↓
2. EdgeModal opens
   ↓
3. User selects source and target nodes from dropdown
   ↓
4. User configures edge type, animation, label
   ↓
5. User clicks "Create" button
   ↓
6. EdgeModal calls: store.addEdge({ source, target, type, animated, label })
   ↓
7. Zustand store validates source and target exist
   ↓
8. New edge object added to state.edges array
   ↓
9. All components re-render with updated edges
   ↓
10. React Flow renders new edge connecting the nodes
```

### Exporting Diagram

```
1. User clicks "Export JSON" button in Sidebar
   ↓
2. Component retrieves current state: { nodes, edges }
   ↓
3. JavaScript converts state to JSON string
   ↓
4. Browser creates downloadable blob from JSON
   ↓
5. Browser triggers file download (.json file)
   ↓
6. User saves file locally
```

---

## Key Features Explained

### 1. **Interactive Canvas**
- Built on React Flow library
- Supports smooth dragging with performance optimization
- Handles touch events for mobile devices
- Provides visual feedback during interactions
- Automatic collision detection for overlapping nodes

### 2. **Node Management**
- Three built-in node types: input, default, output
- Customizable styling (colors, borders, sizes)
- Auto-positioned when created
- Can be manually repositioned
- Connected edges automatically update when nodes move

### 3. **Edge Management**
- Multiple edge types for different visual styles
- Optional animation for visual flow indication
- Labels for documentation
- Automatic edge removal when source/target node deleted
- Validation prevents self-loops (optional)

### 4. **Selection System**
- Click nodes/edges to select them
- Selected items highlighted visually
- Only one node and one edge can be selected at a time
- Selected items can be edited or deleted

### 5. **Import/Export**
- Export current diagram as JSON file
- Import previously exported JSON files
- Load sample diagram for testing
- JSON includes all node and edge properties
- Fully reproducible diagrams across sessions

### 6. **Responsive Design**
- Sidebar adjusts for small screens
- Touch-friendly controls
- Pinch-to-zoom on mobile
- Mobile-optimized UI layout
- Works in landscape and portrait modes

### 7. **Minimap & Controls**
- Minimap shows overview of entire diagram
- Click minimap to navigate
- Zoom controls in corner
- Pan with middle mouse button or spacebar+drag
- Keyboard shortcuts for common operations

---

## Setup & Installation

### Prerequisites
- **Node.js:** Version 14 or higher (check with `node --version`)
- **npm:** Version 6 or higher (comes with Node.js)
- **Git:** For cloning the repository (optional)

### Step 1: Clone or Download Project

```bash
# Option A: Clone with Git
git clone https://github.com/madhunayani/react-flow-diagram.git
cd react-flow-diagram

# Option B: Download ZIP and extract
# Then navigate to the extracted folder
```

### Step 2: Install Dependencies

```bash
npm install
```

This installs all packages listed in `package.json`:
- React and React DOM
- React Flow
- Zustand
- Development tools (React Scripts, testing libraries)

### Step 3: Start Development Server

```bash
npm start
```

**Expected output:**
- Webpack compiles the application
- Browser automatically opens to `http://localhost:3000`
- Application loads with empty canvas
- Hot reload enabled (changes save instantly)

### Step 4: Verify Installation

1. Click "Load Sample" in the sidebar
2. Verify sample diagram appears with nodes and edges
3. Try dragging nodes around the canvas
4. Try adding a new node

---

## Usage Guide

### Creating Nodes

#### Method 1: Via Sidebar Button
1. Click "➕ Add Node" button in sidebar
2. Fill in the form:
   - **Node ID:** Leave empty for auto-generation
   - **Type:** Choose from input, default, or output
   - **Label:** Enter display text
   - **Position:** Set X, Y coordinates
   - **Style:** Choose colors and sizing
3. Click "Create"
4. New node appears on canvas

#### Method 2: Drag from Control Panel (Advanced)
- Some diagramming tools support this - not implemented in current version

### Creating Edges

#### Method 1: Visual Connection
1. Hover over a node - circular handles appear
2. Click and drag from source node handle
3. Drag to target node's handle
4. Release to create connection
5. Edge automatically added to store

#### Method 2: Via Sidebar Button
1. Click "➕ Add Edge" button in sidebar
2. Select source and target nodes from dropdowns
3. Configure edge type and animation
4. Click "Create"

### Editing Elements

#### Edit Node
1. Click node on canvas (it becomes selected)
2. Click "✏️ Edit Node" in sidebar
3. Modify properties in modal
4. Click "Update"

#### Edit Edge
1. Click edge on canvas (it becomes selected)
2. Click "✏️ Edit Edge" in sidebar
3. Modify properties in modal
4. Click "Update"

### Deleting Elements

#### Delete Node
1. Select node on canvas
2. Click "🗑️ Delete Node" in sidebar
   OR
3. Press Delete or Backspace key

**Note:** Deleting a node removes all connected edges

#### Delete Edge
1. Select edge on canvas
2. Click "🗑️ Delete Edge" in sidebar
   OR
3. Press Delete or Backspace key

### Importing & Exporting

#### Export Diagram
1. Click "💾 Export JSON" button
2. Browser downloads file named `diagram.json`
3. File can be shared or stored

#### Import Diagram
1. Click "📂 Import JSON" button
2. Select a previously exported JSON file
3. Diagram loads onto canvas (replaces current)

#### Load Sample
1. Click "📥 Load Sample" button
2. Sample diagram appears on canvas
3. Useful for testing or learning

### Navigating Canvas

| Action | Method |
|--------|--------|
| **Pan (Move View)** | Right-click drag OR Spacebar + drag |
| **Zoom In** | Mouse wheel up OR Pinch (mobile) |
| **Zoom Out** | Mouse wheel down OR Pinch (mobile) |
| **Reset View** | Fit to screen button (if available) |
| **Navigate Minimap** | Click in minimap to jump |

---

## JSON Data Schema

### Complete Diagram Structure

```json
{
  "nodes": [
    {
      "id": "node-1",
      "type": "input",
      "position": { "x": 100, "y": 100 },
      "data": { "label": "Start Node" },
      "style": {
        "backgroundColor": "#d0e1ff",
        "color": "#0041d0",
        "border": "2px solid #0041d0",
        "padding": 10,
        "borderRadius": 8
      }
    }
  ],
  "edges": [
    {
      "id": "edge-1",
      "source": "node-1",
      "target": "node-2",
      "type": "smoothstep",
      "animated": true,
      "label": "Transition"
    }
  ]
}
```

### Node Schema Details

| Property | Type | Required | Description | Example |
|----------|------|----------|-------------|---------|
| `id` | string | Yes | Unique identifier | `"node-1"` |
| `type` | string | No | Node appearance type | `"input"`, `"default"`, `"output"` |
| `position` | object | Yes | Canvas coordinates | `{ "x": 100, "y": 200 }` |
| `position.x` | number | Yes | Horizontal position (px) | `100` |
| `position.y` | number | Yes | Vertical position (px) | `200` |
| `data` | object | Yes | Node content | `{ "label": "Process" }` |
| `data.label` | string | Yes | Display text | `"Start Node"` |
| `style` | object | No | CSS styling | `{ "backgroundColor": "#fff" }` |
| `style.backgroundColor` | string | No | Background color | `"#d0e1ff"` |
| `style.color` | string | No | Text color | `"#0041d0"` |
| `style.border` | string | No | Border styling | `"2px solid #0041d0"` |
| `style.padding` | number | No | Inner spacing | `10` |
| `style.borderRadius` | number | No | Corner rounding | `8` |

### Edge Schema Details

| Property | Type | Required | Description | Example |
|----------|------|----------|-------------|---------|
| `id` | string | Yes | Unique identifier | `"edge-1"` |
| `source` | string | Yes | Source node ID | `"node-1"` |
| `target` | string | Yes | Target node ID | `"node-2"` |
| `type` | string | No | Connection style | `"default"`, `"smoothstep"`, `"step"`, `"straight"` |
| `animated` | boolean | No | Animated flow effect | `true` or `false` |
| `label` | string | No | Display text on edge | `"Transition"` |

### Valid Node Types

- **`input`** - Node with handles only on right side (good for starting points)
- **`default`** - Node with handles on all sides (versatile)
- **`output`** - Node with handles only on left side (good for endpoints)

### Valid Edge Types

- **`default`** - Straight line with sharp corners
- **`smoothstep`** - Smooth curve with rounded edges (most common)
- **`step`** - Orthogonal path with right angles
- **`straight`** - Direct diagonal line

---

## API Reference

### Zustand Store API

#### Node Operations

```javascript
// Add a new node
store.addNode({
  id: 'my-node',           // Optional
  type: 'default',         // Optional
  position: { x: 100, y: 100 },
  data: { label: 'Node Label' },
  style: { backgroundColor: '#fff' }
});

// Update existing node
store.updateNode('my-node', {
  data: { label: 'Updated Label' },
  style: { backgroundColor: '#ff0000' }
});

// Delete node and connected edges
store.deleteNode('my-node');

// Replace all nodes
store.setNodes([...nodesArray]);
```

#### Edge Operations

```javascript
// Add new edge
store.addEdge({
  id: 'edge-1',           // Optional
  source: 'node-1',       // Required
  target: 'node-2',       // Required
  type: 'smoothstep',     // Optional
  animated: true,         // Optional
  label: 'Connection'     // Optional
});

// Update edge
store.updateEdge('edge-1', {
  animated: false,
  label: 'Updated'
});

// Delete edge
store.deleteEdge('edge-1');

// Replace all edges
store.setEdges([...edgesArray]);
```

#### Selection Operations

```javascript
// Select node
store.selectNode('node-1');

// Select edge
store.selectEdge('edge-1');

// Clear selection
store.clearSelection();

// Get current selected node
const selectedNodeId = store.getState().selectedNode;
```

#### Bulk Operations

```javascript
// Load entire diagram from JSON
store.loadMetadata({
  nodes: [...],
  edges: [...]
});

// Clear all elements
store.clearDiagram();

// Get entire state
const state = store.getState();
const { nodes, edges, selectedNode, selectedEdge } = state;
```

### React Component Integration

```javascript
// Import store in any component
import { useDiagramStore } from '../store/diagramStore';

// Subscribe to specific state slices
function MyComponent() {
  const nodes = useDiagramStore(state => state.nodes);
  const addNode = useDiagramStore(state => state.addNode);
  
  // Component code...
}

// Subscribe to entire state (not recommended - triggers re-render on any change)
function MyComponent() {
  const state = useDiagramStore();
  // Every change re-renders component
}
```

---

## Development Workflow

### Adding a New Feature: Step-by-Step Example

#### Scenario: Add a "Duplicate Node" Feature

**Step 1: Update Store** (`diagramStore.js`)
```javascript
duplicateNode: (id) => set((state) => {
  const nodeToClone = state.nodes.find(n => n.id === id);
  if (!nodeToClone) return;
  
  const clonedNode = {
    ...nodeToClone,
    id: `${nodeToClone.id}-copy-${Date.now()}`,
    position: { 
      x: nodeToClone.position.x + 50,
      y: nodeToClone.position.y + 50
    }
  };
  
  return { nodes: [...state.nodes, clonedNode] };
})
```

**Step 2: Add UI Button** (`Sidebar.jsx`)
```javascript
<button 
  onClick={() => store.duplicateNode(selectedNode)}
  disabled={!selectedNode}
>
  🔀 Duplicate Node
</button>
```

**Step 3: Test Feature**
```bash
npm test
# Or manually test by clicking button
```

**Step 4: Verify Import/Export**
- Export diagram
- Verify cloned node appears in JSON
- Import back to verify functionality

### Running Tests

```bash
# Run all tests in watch mode
npm test

# Run specific test file
npm test DiagramFlow.test.js

# Generate coverage report
npm test -- --coverage
```

### Building for Production

```bash
# Create optimized production build
npm run build

# Output goes to build/ folder
# Ready to deploy to hosting service
```

### Common Development Patterns

#### Creating a New Component

```javascript
// NewFeature.jsx
import React, { useState } from 'react';
import { useDiagramStore } from '../store/diagramStore';

export default function NewFeature() {
  const nodes = useDiagramStore(state => state.nodes);
  const addNode = useDiagramStore(state => state.addNode);
  
  return (
    <div>
      {/* Component JSX */}
    </div>
  );
}
```

#### Handling Form Submission

```javascript
const handleSubmit = (e) => {
  e.preventDefault();
  
  // Validate data
  if (!formData.id || !formData.label) {
    alert('ID and Label required');
    return;
  }
  
  // Call store action
  store.addNode(formData);
  
  // Reset form
  setFormData({});
  closeModal();
};
```

---

## Troubleshooting

### Common Issues & Solutions

#### Issue: "npm install" fails
**Cause:** Node.js or npm version too old

**Solution:**
```bash
# Update Node.js to latest LTS
# Visit https://nodejs.org/

# Verify installation
node --version  # Should be v14+
npm --version   # Should be v6+
```

#### Issue: Port 3000 already in use
**Cause:** Another application using the port

**Solution:**
```bash
# Kill process using port 3000
# Windows PowerShell
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or specify different port
PORT=3001 npm start
```

#### Issue: Sample metadata fails to load
**Cause:** `sampleMetadata.json` missing or corrupted

**Solution:**
1. Verify file exists: `public/sampleMetadata.json`
2. Check JSON syntax (use JSON validator)
3. Restart development server: `npm start`
4. Clear browser cache (Ctrl+Shift+Delete)

#### Issue: Nodes won't connect with drag-and-drop
**Cause:** Not dragging from node handles

**Solution:**
- Hover over node to reveal circular handles
- Click and drag starting from the handle (not node body)
- Release over target node's handle

#### Issue: Exported JSON file is empty or corrupted
**Cause:** JavaScript error during export

**Solution:**
1. Open browser DevTools (F12)
2. Check Console for JavaScript errors
3. Verify diagram has nodes/edges before export
4. Try simple diagram first to isolate issue

#### Issue: Imported diagram doesn't load
**Cause:** Invalid JSON format or wrong file selected

**Solution:**
1. Verify JSON file format matches schema (see JSON Data Schema section)
2. Validate JSON at https://jsonlint.com/
3. Try loading sample first to verify import works
4. Check browser console (F12) for error messages

#### Issue: Performance slow with many nodes
**Cause:** React re-rendering too frequently

**Solution:**
1. Verify Zustand store properly structured (avoid unnecessary re-renders)
2. Use React DevTools Profiler to identify bottleneck
3. Consider splitting into multiple diagrams
4. Limit node count to <500 for best performance

#### Issue: Styling doesn't apply to custom nodes
**Cause:** CSS specificity or React Flow default styles

**Solution:**
1. Use `!important` in inline styles (temporary fix)
2. Create CSS module with higher specificity
3. Check React Flow documentation for style prop names
4. Use React Flow's built-in theme system

### Getting Help

1. **Check existing errors:**
   - Open browser DevTools (F12)
   - Check Console tab for errors
   - Check Network tab for failed requests

2. **Review documentation:**
   - This documentation file
   - [React Flow Documentation](https://reactflow.dev)
   - [Zustand Documentation](https://github.com/pmndrs/zustand)

3. **Debug with React DevTools:**
   - Install React DevTools browser extension
   - Inspect component tree
   - Check component props and state

4. **Test in isolation:**
   - Test individual components in storybook (if available)
   - Test store actions in Node REPL
   - Verify JSON format separately

---

## Quick Reference Cheatsheet

### Keyboard Shortcuts
- **Delete/Backspace** - Delete selected node or edge
- **Spacebar + Drag** - Pan the canvas
- **Mouse Wheel** - Zoom in/out
- **Escape** - Deselect all

### Button Reference
| Button | Action | Shortcut |
|--------|--------|----------|
| ➕ Add Node | Create new node | - |
| ✏️ Edit Node | Edit selected node | - |
| 🗑️ Delete Node | Delete selected node | Delete key |
| ➕ Add Edge | Create connection | - |
| ✏️ Edit Edge | Edit selected edge | - |
| 🗑️ Delete Edge | Delete selected edge | Delete key |
| 📥 Load Sample | Load demo diagram | - |
| 📂 Import JSON | Load from file | - |
| 💾 Export JSON | Download as file | - |

### File Size Limits
- Maximum nodes: ~500 (performance degrades)
- Maximum edges: ~1000
- Typical file size: 10-100 KB for medium diagram

---

## Conclusion

The React Flow Diagram application is a powerful yet user-friendly tool for creating visual diagrams directly in the browser. Its architecture prioritizes simplicity, performance, and extensibility.

### Key Takeaways
1. **Zustand Store** is the single source of truth for all data
2. **React Flow** handles the complex rendering and interaction logic
3. **Modular Components** make it easy to add new features
4. **JSON-based** persistence enables easy sharing and version control
5. **Responsive Design** works across all device types

### Future Enhancement Ideas
- Collaborative editing (multiple users)
- Diagram templates and themes
- Advanced node types (images, text, custom)
- Layout algorithms (auto-arrange nodes)
- Undo/redo functionality
- Keyboard shortcuts for common operations
- Node grouping and collapsing
- Export to multiple formats (PNG, SVG, PDF)
- Plugin system for custom node types

---

**Project Version:** 1.0.0
**Last Updated:** 2024
**Maintainer:** React Flow Diagram Team

For more information, visit the [GitHub repository](https://github.com/madhunayani/react-flow-diagram)
