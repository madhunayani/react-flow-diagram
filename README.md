# 🌐 React Flow Diagram Application

A dynamic, interactive node-edge diagram editor built with **React** and **React Flow**. This application provides an intuitive canvas interface to seamlessly create, manage, and export complex visual workflows.

---

## 🚀 Features

* **Interactive Canvas:** Smooth drag-and-drop mechanics, infinite panning, and pinch-to-zoom controls.
* **Dynamic CRUD Management:** Real-time creation, editing, and deletion of both nodes and edges.
* **Zustand State Engine:** High-performance, centralized state management preventing unnecessary re-renders.
* **JSON Serialization:** Instant Import/Export capabilities to save and reload diagram states.
* **UI Enhancements:** Integrated Minimap, adaptive background grids, and interactive control modals.
* **Fully Responsive:** Optimized layouts tailored for both desktop monitors and mobile screens.

---

## 🛠️ Tech Stack & Dependencies

* **Core:** React ^18.x / React-DOM ^18.x
* **Diagramming Engine:** React Flow ^11.x
* **State Management:** Zustand ^4.x

---

## 📋 Prerequisites & Installation

Ensure you have **Node.js (v14+)** and **npm** installed.

### 1. Clone the Repository

```bash
git clone https://github.com/madhunayani/react-flow-diagram.git
cd react-flow-diagram

```

### 2. Install Dependencies

```bash
npm install

```

### 3. Spin up Development Server

```bash
npm start

```

Your browser should automatically open to `http://localhost:3000`.

---

## 🏗️ Architecture & Project Structure

```text
react-flow-diagram/
├── public/
│   ├── index.html
│   └── sampleMetadata.json      # Sample pre-load diagram configuration
├── src/
│   ├── components/
│   │   ├── DiagramFlow.jsx      # Main React Flow canvas & view controls
│   │   ├── Sidebar.jsx          # Operation hub & selection analytics
│   │   ├── NodeModal.jsx        # Node property configuration form
│   │   └── EdgeModal.jsx        # Edge connection property form
│   ├── store/
│   │   └── diagramStore.js      # Central Zustand state engine
│   ├── styles/
│   │   └── DiagramFlow.css      # Core application layout styling
│   ├── App.js                   # Application root coordinator
│   └── index.js                 # App entry point
└── README.md

```

### State Management API (`diagramStore.js`)

The application leverages a centralized Zustand store to manage graph states cleanly without prop-drilling:

```javascript
// Graph Mutations
addNode(node) | updateNode(id, updates) | deleteNode(id)
addEdge(edge) | updateEdge(id, updates) | deleteEdge(id)

// Global Actions
loadMetadata(metadata) | clearDiagram()

```

---

## 📄 JSON Data Schema

The application saves and reads graph structures using the following standardized JSON format:

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

### Schema Specifications

#### Nodes

| Property | Type | Description | Values / Formats |
| --- | --- | --- | --- |
| `id` | `string` | Unique node identifier | Unique Text |
| `type` | `string` | React Flow placement logic | `input` | `default` | `output` |
| `position` | `object` | Coordinate positioning | `{ x: number, y: number }` |
| `data` | `object` | Core values | `{ label: string }` |
| `style` | `object` | React Inline CSS bindings | Background, borders, padding, etc. |

#### Edges

| Property | Type | Description | Values / Formats |
| --- | --- | --- | --- |
| `id` | `string` | Unique edge identifier | Unique Text |
| `source` | `string` | Origin node pointer | Matches a Node `id` |
| `target` | `string` | Termination node pointer | Matches a Node `id` |
| `type` | `string` | Visual rendering engine path | `default` | `smoothstep` | `step` | `straight` |
| `animated` | `boolean` | Visual flow line physics | `true` | `false` |
| `label` | `string` | Optional overlay text | Plain text label |

---

## 🎮 How to Use

### 🟩 Nodes

* **Add:** Click **"+ Add Node"** in the sidebar. Set your configuration (ID, Label, UI Style) in the modal and confirm.
* **Edit:** Select a node on the canvas, click **"Edit Node"**, modify properties, and hit update.
* **Delete:** Highlight the node and click **"Delete Node"** or hit your keyboard's `Delete`/`Backspace` key.

### 🟨 Edges

* **Add (Visual):** Click and drag an interactive handle from an origin node directly to a target node handle.
* **Add (Manual):** Click **"+ Add Edge"** in the sidebar, select your target nodes from the menu, and confirm.
* **Modify/Remove:** Highlight the edge to change routing styles/animations or click **"Delete Edge"** to strip it from the canvas.

### 💾 Data Operations

* **Load Sample:** Instantly populate the canvas by clicking **"📥 Load Sample"**.
* **Import:** Click **"📂 Import JSON"** to upload your own custom diagram file matching the schema.
* **Export:** Click **"💾 Export JSON"** to generate and download a state file of your active canvas layout.

---

## 🧪 Scripts

```bash
# Run unit & integration tests
npm test

# Build production-ready optimized assets
npm run build

```

---

## 🔧 Troubleshooting

> 💡 **Sample Metadata Fails to Load:** Ensure `sampleMetadata.json` remains present inside your `/public` folder directory and restart your development port.
> 💡 **Nodes Won't Connect:** Verify that you are initiating drags directly from the circular node handle ports rather than the body of the node itself.

---

## 📝 License & Contributions

This project was built for assignment purposes. Feel free to open a pull request or submit feedback suggestions via repository issues!

---

**Built with ❤️ using React and React Flow**
