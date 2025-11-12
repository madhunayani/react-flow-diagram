import React, { useCallback, useRef } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Panel
} from 'reactflow';
import 'reactflow/dist/style.css';
import useDiagramStore from '../store/diagramStore';
import '../styles/DiagramFlow.css';

const DiagramFlow = () => {
  const reactFlowWrapper = useRef(null);
  const {
    nodes,
    edges,
    setNodes,
    setEdges,
    updateNode,
    deleteNode,
    deleteEdge,
    setSelectedNode,
    setSelectedEdge
  } = useDiagramStore();

  const onNodesChange = useCallback(
    (changes) => setNodes(applyNodeChanges(changes, nodes)),
    [nodes, setNodes]
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges(applyEdgeChanges(changes, edges)),
    [edges, setEdges]
  );

  const onConnect = useCallback(
    (connection) => {
      const newEdge = {
        ...connection,
        id: `edge-${Date.now()}`,
        type: 'smoothstep',
        animated: true
      };
      setEdges(addEdge(newEdge, edges));
    },
    [edges, setEdges]
  );

  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
  }, [setSelectedNode]);

  const onEdgeClick = useCallback((event, edge) => {
    setSelectedEdge(edge);
  }, [setSelectedEdge]);

  const onNodeDragStop = useCallback((event, node) => {
    updateNode(node.id, { position: node.position });
  }, [updateNode]);

  const onNodeDelete = useCallback((nodesToDelete) => {
    nodesToDelete.forEach(node => deleteNode(node.id));
  }, [deleteNode]);

  const onEdgeDelete = useCallback((edgesToDelete) => {
    edgesToDelete.forEach(edge => deleteEdge(edge.id));
  }, [deleteEdge]);

  return (
    <div className="diagram-flow-container" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onEdgeClick={onEdgeClick}
        onNodeDragStop={onNodeDragStop}
        onNodesDelete={onNodeDelete}
        onEdgesDelete={onEdgeDelete}
        fitView
        attributionPosition="bottom-left"
      >
        <Background variant="dots" gap={12} size={1} />
        <Controls />
        <MiniMap 
          nodeStrokeColor={(n) => {
            if (n.type === 'input') return '#0041d0';
            if (n.type === 'output') return '#ff0072';
            return '#1a192b';
          }}
          nodeColor={(n) => {
            if (n.type === 'input') return '#d0e1ff';
            if (n.type === 'output') return '#ffd0e8';
            return '#fff';
          }}
        />
        <Panel position="top-left">
          <div className="panel-info">
            <strong>Nodes:</strong> {nodes.length} | <strong>Edges:</strong> {edges.length}
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default DiagramFlow;
