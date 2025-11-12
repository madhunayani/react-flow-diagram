import { create } from 'zustand';

const useDiagramStore = create((set) => ({
  nodes: [],
  edges: [],
  selectedNode: null,
  selectedEdge: null,
  
  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
  
  addNode: (node) => set((state) => ({
    nodes: [...state.nodes, {
      id: node.id || `node-${Date.now()}`,
      type: node.type || 'default',
      position: node.position || { x: 250, y: 250 },
      data: { label: node.data?.label || 'New Node', ...node.data }
    }]
  })),
  
  updateNode: (id, updates) => set((state) => ({
    nodes: state.nodes.map((node) =>
      node.id === id ? { ...node, ...updates } : node
    )
  })),
  
  deleteNode: (id) => set((state) => ({
    nodes: state.nodes.filter((node) => node.id !== id),
    edges: state.edges.filter((edge) => edge.source !== id && edge.target !== id)
  })),
  
  addEdge: (edge) => set((state) => ({
    edges: [...state.edges, {
      id: edge.id || `edge-${Date.now()}`,
      source: edge.source,
      target: edge.target,
      type: edge.type || 'default',
      label: edge.label || '',
      animated: edge.animated || false
    }]
  })),
  
  updateEdge: (id, updates) => set((state) => ({
    edges: state.edges.map((edge) =>
      edge.id === id ? { ...edge, ...updates } : edge
    )
  })),
  
  deleteEdge: (id) => set((state) => ({
    edges: state.edges.filter((edge) => edge.id !== id)
  })),
  
  setSelectedNode: (node) => set({ selectedNode: node }),
  setSelectedEdge: (edge) => set({ selectedEdge: edge }),
  
  loadMetadata: (metadata) => set({
    nodes: metadata.nodes || [],
    edges: metadata.edges || []
  }),
  
  clearDiagram: () => set({ nodes: [], edges: [], selectedNode: null, selectedEdge: null })
}));

export default useDiagramStore;
