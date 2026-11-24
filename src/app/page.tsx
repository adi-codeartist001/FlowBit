'use client';
import React, { useState, useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Handle,
  Position,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Plus, Database, Mail, Webhook, Timer, Code, Settings, Play, Save, Table } from 'lucide-react';

// Icon mapping object
const iconMap = {
  Database,
  Mail,
  Webhook,
  Timer,
  Code,
  Table,
};

// Custom Node Component
const CustomNode = ({ data, selected }) => {
  const IconComponent = iconMap[data.iconName];
  
  return (
    <div className={`px-4 py-2 shadow-lg rounded-lg bg-white border-2 min-w-[120px] ${
      selected ? 'border-blue-500' : 'border-gray-200'
    } hover:border-gray-300 transition-all duration-200`}>
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 !bg-gray-400 hover:!bg-blue-500 transition-colors"
        style={{ left: -6 }}
      />
      
      <div className="flex items-center space-x-2">
        <div className={`w-8 h-8 rounded-md ${data.color} flex items-center justify-center flex-shrink-0`}>
          {IconComponent && <IconComponent className="w-4 h-4 text-white" />}
        </div>
        <div className="text-sm font-medium text-gray-700 truncate">{data.label}</div>
      </div>
      
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 !bg-gray-400 hover:!bg-green-500 transition-colors"
        style={{ right: -6 }}
      />
    </div>
  );
};

// Table Node Component
const TableNode = ({ data, selected, id }) => {
  const [tableData, setTableData] = useState(data.tableData || {
    title: data.title || 'Data Table',
    rows: data.rows || [
      { col1: 'Name', col2: 'Value', col3: 'Type' },
      { col1: 'Item 1', col2: '100', col3: 'Number' },
      { col1: 'Item 2', col2: 'Text', col3: 'String' }
    ]
  });

  const updateCell = (rowIndex, colKey, value) => {
    const newRows = [...tableData.rows];
    newRows[rowIndex] = { ...newRows[rowIndex], [colKey]: value };
    setTableData({ ...tableData, rows: newRows });
  };

  const updateTitle = (value) => {
    setTableData({ ...tableData, title: value });
  };

  return (
    <div className={`shadow-lg rounded-lg bg-white border-2 min-w-[300px] ${
      selected ? 'border-blue-500' : 'border-gray-200'
    } hover:border-gray-300 transition-all duration-200`}>
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 !bg-gray-400 hover:!bg-blue-500 transition-colors"
        style={{ left: -6, top: '50%' }}
      />
      
      {/* Table Header */}
      <div className={`px-4 py-2 ${data.color} rounded-t-md`}>
        <div className="flex items-center space-x-2">
          <Table className="w-4 h-4 text-white" />
          <input
            type="text"
            value={tableData.title}
            onChange={(e) => updateTitle(e.target.value)}
            className="bg-transparent text-white placeholder-white/70 border-none outline-none text-sm font-medium flex-1"
            placeholder="Table Title"
          />
        </div>
      </div>

      {/* Table Content */}
      <div className="p-3">
        <div className="overflow-hidden border border-gray-200 rounded-md">
          <table className="w-full text-xs">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-2 py-1 text-left font-medium text-gray-700 border-r border-gray-200">
                  <input
                    type="text"
                    value={tableData.rows[0]?.col1 || ''}
                    onChange={(e) => updateCell(0, 'col1', e.target.value)}
                    className="w-full bg-transparent border-none outline-none"
                    placeholder="Column 1"
                  />
                </th>
                <th className="px-2 py-1 text-left font-medium text-gray-700 border-r border-gray-200">
                  <input
                    type="text"
                    value={tableData.rows[0]?.col2 || ''}
                    onChange={(e) => updateCell(0, 'col2', e.target.value)}
                    className="w-full bg-transparent border-none outline-none"
                    placeholder="Column 2"
                  />
                </th>
                <th className="px-2 py-1 text-left font-medium text-gray-700">
                  <input
                    type="text"
                    value={tableData.rows[0]?.col3 || ''}
                    onChange={(e) => updateCell(0, 'col3', e.target.value)}
                    className="w-full bg-transparent border-none outline-none"
                    placeholder="Column 3"
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.rows.slice(1).map((row, index) => (
                <tr key={index + 1} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="px-2 py-1 border-r border-gray-200">
                    <input
                      type="text"
                      value={row.col1 || ''}
                      onChange={(e) => updateCell(index + 1, 'col1', e.target.value)}
                      className="w-full bg-transparent border-none outline-none text-gray-700"
                      placeholder="Data"
                    />
                  </td>
                  <td className="px-2 py-1 border-r border-gray-200">
                    <input
                      type="text"
                      value={row.col2 || ''}
                      onChange={(e) => updateCell(index + 1, 'col2', e.target.value)}
                      className="w-full bg-transparent border-none outline-none text-gray-700"
                      placeholder="Data"
                    />
                  </td>
                  <td className="px-2 py-1">
                    <input
                      type="text"
                      value={row.col3 || ''}
                      onChange={(e) => updateCell(index + 1, 'col3', e.target.value)}
                      className="w-full bg-transparent border-none outline-none text-gray-700"
                      placeholder="Data"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 !bg-gray-400 hover:!bg-green-500 transition-colors"
        style={{ right: -6, top: '50%' }}
      />
    </div>
  );
};

// Node types for ReactFlow
const nodeTypes = {
  customNode: CustomNode,
  tableNode: TableNode,
};

const WorkflowBuilder = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodeId, setNodeId] = useState(1);

  // Node templates for sidebar
  const nodeTemplates = [
    { 
      id: 'database', 
      type: 'database', 
      nodeType: 'customNode',
      iconName: 'Database',
      label: 'Database', 
      color: 'bg-blue-500' 
    },
    { 
      id: 'email', 
      type: 'email', 
      nodeType: 'customNode',
      iconName: 'Mail',
      label: 'Email', 
      color: 'bg-green-500' 
    },
    { 
      id: 'webhook', 
      type: 'webhook', 
      nodeType: 'customNode',
      iconName: 'Webhook',
      label: 'Webhook', 
      color: 'bg-purple-500' 
    },
    { 
      id: 'timer', 
      type: 'timer', 
      nodeType: 'customNode',
      iconName: 'Timer',
      label: 'Timer', 
      color: 'bg-orange-500' 
    },
    { 
      id: 'code', 
      type: 'code', 
      nodeType: 'customNode',
      iconName: 'Code',
      label: 'Code', 
      color: 'bg-gray-700' 
    },
    { 
      id: 'table', 
      type: 'table', 
      nodeType: 'tableNode',
      iconName: 'Table',
      label: 'Data Table', 
      color: 'bg-indigo-500' 
    },
  ];

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({
      ...params, 
      animated: true, 
      style: { stroke: '#6b7280', strokeWidth: 2 },
      type: 'smoothstep'
    }, eds)),
    [setEdges],
  );

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = event.target.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');
      const nodeDataString = event.dataTransfer.getData('application/nodedata');

      if (typeof type === 'undefined' || !type || !nodeDataString) {
        return;
      }

      let nodeData;
      try {
        nodeData = JSON.parse(nodeDataString);
      } catch (e) {
        console.error('Failed to parse node data:', e);
        return;
      }

      const position = {
        x: event.clientX - reactFlowBounds.left - 60,
        y: event.clientY - reactFlowBounds.top - 30,
      };

      const newNode = {
        id: `node_${nodeId}`,
        type: nodeData.nodeType,
        position,
        data: { 
          label: nodeData.label,
          iconName: nodeData.iconName,
          color: nodeData.color,
          nodeType: nodeData.type,
          title: nodeData.type === 'table' ? 'Data Table' : undefined,
        },
      };

      setNodes((nds) => nds.concat(newNode));
      setNodeId((id) => id + 1);
    },
    [nodeId, setNodes],
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDragStart = (event, nodeTemplate) => {
    event.dataTransfer.setData('application/reactflow', nodeTemplate.nodeType);
    event.dataTransfer.setData('application/nodedata', JSON.stringify(nodeTemplate));
    event.dataTransfer.effectAllowed = 'move';
  };

  const clearWorkflow = () => {
    setNodes([]);
    setEdges([]);
    setNodeId(1);
  };

  const executeWorkflow = () => {
    if (nodes.length === 0) {
      alert('Please add some nodes to execute the workflow!');
      return;
    }
    alert(`Executing workflow with ${nodes.length} nodes and ${edges.length} connections!`);
  };

  const saveWorkflow = () => {
    const workflow = {
      nodes: nodes,
      edges: edges,
      timestamp: new Date().toISOString(),
    };
    console.log('Saving workflow:', workflow);
    alert('Workflow saved! Check console for details.');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 shadow-sm flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Nodes
          </h2>
        </div>
        
        <div className="flex-1 p-4 space-y-3 overflow-y-auto">
          {nodeTemplates.map((nodeTemplate) => {
            const IconComponent = iconMap[nodeTemplate.iconName];
            
            return (
              <div
                key={nodeTemplate.id}
                onDragStart={(event) => onDragStart(event, nodeTemplate)}
                draggable
                className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 cursor-move transition-all duration-150 shadow-sm hover:shadow-md group"
              >
                <div className={`w-8 h-8 rounded-md ${nodeTemplate.color} flex items-center justify-center group-hover:scale-105 transition-transform`}>
                  <IconComponent className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">{nodeTemplate.label}</span>
              </div>
            );
          })}
        </div>
        
        <div className="p-4 space-y-2 border-t border-gray-200">
          <button 
            onClick={executeWorkflow}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={nodes.length === 0}
          >
            <Play className="w-4 h-4" />
            Execute
          </button>
          <button 
            onClick={saveWorkflow}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors"
          >
            <Save className="w-4 h-4" />
            Save
          </button>
          <button 
            onClick={clearWorkflow}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-medium transition-colors"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-800">Workflow Builder</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Nodes: {nodes.length}
                </span>
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Connections: {edges.length}
                </span>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings className="w-4 h-4" />
                Settings
              </button>
            </div>
          </div>
        </div>

        {/* ReactFlow Canvas */}
        <div className="flex-1 relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            fitView
            className="bg-gray-50"
            defaultViewport={{ x: 0, y: 0, zoom: 1 }}
            minZoom={0.2}
            maxZoom={2}
            attributionPosition="bottom-left"
          >
            <Background 
              color="#e5e7eb" 
              gap={20} 
              size={1}
              variant="dots"
            />
            <MiniMap 
              className="!bg-white !border !border-gray-200 !rounded-lg !shadow-sm"
              nodeColor={() => '#6b7280'}
              maskColor="rgba(0, 0, 0, 0.1)"
              position="bottom-right"
            />
            <Controls 
              className="!bg-white !border !border-gray-200 !rounded-lg !shadow-sm"
              position="top-right"
            />
          </ReactFlow>

          {/* Empty State */}
          {nodes.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
              <div className="text-center text-gray-400 bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg">
                <Plus className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium mb-2">Start Building Your Workflow</p>
                <p className="text-sm">Drag and drop nodes from the sidebar to get started</p>
                <div className="mt-4 text-xs text-gray-500">
                  💡 Tip: Connect nodes by dragging from the right handle to the left handle
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkflowBuilder;