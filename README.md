Here's the complete README.md file in a single code block that you can copy with one click:

```markdown
# React Flow Diagram Application

A dynamic, interactive diagram flow application built with React and React Flow that allows users to create, edit, and manage node-edge diagrams through an intuitive interface.

## 🚀 Features

- **Dynamic Node & Edge Management**: Add, edit, and delete nodes and edges in real-time
- **Interactive Canvas**: Drag-and-drop nodes, zoom, pan, and connect elements visually
- **JSON Import/Export**: Load and save diagram configurations as JSON files
- **Sample Data**: Pre-loaded sample diagram for quick testing
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **State Management**: Efficient state handling using Zustand
- **Visual Controls**: Minimap, background grid, and control panel

## 📋 Prerequisites

Before running this application, ensure you have:

- Node.js (v14 or higher)
- npm or yarn package manager

## 🛠️ Installation

1. Clone the repository:
```
git clone <your-repo-url>
cd react-flow-diagram
```

2. Install dependencies:
```
npm install
```

3. Start the development server:
```
npm start
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

## 📦 Dependencies

- **react**: ^18.x
- **react-dom**: ^18.x
- **reactflow**: ^11.x
- **zustand**: ^4.x

## 🏗️ Architecture

### Project Structure

```
react-flow-diagram/
├── public/
│   ├── index.html
│   └── sampleMetadata.json          # Sample diagram data
├── src/
│   ├── components/
│   │   ├── DiagramFlow.jsx          # Main React Flow canvas
│   │   ├── Sidebar.jsx              # Control panel sidebar
│   │   ├── NodeModal.jsx            # Node creation/editing modal
│   │   └── EdgeModal.jsx            # Edge creation/editing modal
│   ├── store/
│   │   └── diagramStore.js          # Zustand state management
│   ├── styles/
│   │   └── DiagramFlow.css          # Application styles
│   ├── App.js                       # Root component
│   └── index.js                     # Entry point
└── README.md
```

### Component Breakdown

#### 1. **DiagramFlow.jsx**
Main canvas component that renders the React Flow diagram with:
- Background grid
- Zoom/pan controls
- Minimap
- Node and edge rendering
- Drag-and-drop functionality

#### 2. **Sidebar.jsx**
Control panel providing:
- Node operations (Add, Edit, Delete)
- Edge operations (Add, Edit, Delete)
- Diagram operations (Load Sample, Import/Export JSON, Clear)
- Selection information display

#### 3. **NodeModal.jsx**
Modal form for creating and editing nodes with fields:
- Node ID
- Label
- Type (Input, Default, Output)
- Position (X, Y coordinates)
- Styling (Background color, Text color)

#### 4. **EdgeModal.jsx**
Modal form for creating and editing edges with fields:
- Edge ID
- Source node
- Target node
- Label
- Type (Default, Smooth Step, Step, Straight)
- Animation toggle

#### 5. **diagramStore.js**
Zustand store managing:
- Nodes and edges state
- CRUD operations
- Selection state
- Metadata loading

## 📄 JSON Metadata Schema

### Sample Structure

```
{
  "nodes": [
    {
      "id": "node-1",
      "type": "input",
      "position": { "x": 100, "y": 100 },
      "data": { "label": "Start" },
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
      "label": "Initialize"
    }
  ]
}
```

### Node Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | string | Unique identifier for the node |
| `type` | string | Node type: `input`, `default`, or `output` |
| `position` | object | `{ x: number, y: number }` coordinates |
| `data` | object | Node data containing `label` and custom fields |
| `style` | object | CSS styling properties |

### Edge Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | string | Unique identifier for the edge |
| `source` | string | Source node ID |
| `target` | string | Target node ID |
| `type` | string | Edge type: `default`, `smoothstep`, `step`, `straight` |
| `animated` | boolean | Enable/disable edge animation |
| `label` | string | Optional edge label |

## 🎮 Usage Guide

### Adding a Node

1. Click **"+ Add Node"** button in the sidebar
2. Fill in the node details:
   - **Node ID**: Unique identifier (auto-generated)
   - **Label**: Display text for the node
   - **Type**: Select from Input, Default, or Output
   - **Position**: Set X and Y coordinates
   - **Colors**: Choose background and text colors
3. Click **"Create"**

### Adding an Edge

1. **Method 1 - Drag & Drop:**
   - Click and drag from a node's handle
   - Drop on another node's handle
   
2. **Method 2 - Manual:**
   - Click **"+ Add Edge"** button
   - Select source and target nodes
   - Optionally add label and customize type
   - Click **"Create"**

### Editing Nodes/Edges

1. Click on a node or edge to select it
2. Click **"Edit Node"** or **"Edit Edge"** button
3. Modify the desired properties
4. Click **"Update"**

### Deleting Elements

1. Select the node or edge
2. Click **"Delete Node"** or **"Delete Edge"** button
   - OR press **Delete/Backspace** key

### Loading Sample Data

1. Click **"📥 Load Sample"** button
2. Pre-configured sample diagram will load

### Importing Diagrams

1. Click **"📂 Import JSON"** button
2. Select a valid JSON file with the correct schema
3. Diagram will be loaded instantly

### Exporting Diagrams

1. Click **"💾 Export JSON"** button
2. JSON file will be downloaded to your system
3. Use this file to reload the diagram later

## 🎨 Responsive Design

The application adapts to different screen sizes:

- **Desktop (>768px)**: Full sidebar + diagram canvas side-by-side
- **Mobile (<768px)**: Stacked layout with sidebar on top

## 🧪 Testing

Run tests with:

```
npm test
```

Build for production:

```
npm run build
```

## 🔧 State Management

The application uses **Zustand** for state management, providing:

- Simple, hook-based API
- Minimal boilerplate
- Better performance than Context API
- Easy debugging and testing

### Store Methods

```
// Add operations
addNode(node)
addEdge(edge)

// Update operations
updateNode(id, updates)
updateEdge(id, updates)

// Delete operations
deleteNode(id)
deleteEdge(id)

// Utility operations
loadMetadata(metadata)
clearDiagram()
```

## 🐛 Troubleshooting

### Issue: "Failed to load sample metadata"

**Solution:** Ensure `sampleMetadata.json` exists in the `public/` folder and restart the dev server.

### Issue: Nodes not connecting

**Solution:** Make sure you're dragging from the circular handle on the edge of nodes.

### Issue: Modal not opening

**Solution:** Check browser console for errors. Ensure all dependencies are installed correctly.

## 📚 Resources

- [React Flow Documentation](https://reactflow.dev/)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [React Documentation](https://react.dev/)

## 👨‍💻 Development

This project was created as part of a technical assignment demonstrating:

- React component architecture
- State management with Zustand
- React Flow integration
- Form handling and validation
- Responsive CSS design
- JSON data manipulation
- File import/export functionality

## 📝 License

This project is created for assignment purposes.

## 🤝 Contributing

This is an assignment project, but suggestions are welcome!

---

**Built with ❤️ using React and React Flow**