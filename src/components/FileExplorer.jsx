import { useState, useEffect } from 'react';
import { 
  ChevronRightIcon, 
  ChevronDownIcon, 
  DocumentTextIcon, 
  FolderIcon, 
  CodeIcon
} from '@heroicons/react/24/outline';

const FileExplorer = ({ repoData, selectedCommit, onFileSelect }) => {
  const [fileTree, setFileTree] = useState(null);
  const [expandedDirs, setExpandedDirs] = useState(new Set());
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFileTree = async () => {
      if (!repoData || !selectedCommit) return;
      
      setLoading(true);
      try {
        const response = await fetch(`/api/repos/${repoData.owner}/${repoData.name}/tree/${selectedCommit.sha}`);
        const treeData = await response.json();
        setFileTree(treeData);
      } catch (error) {
        console.error('Error fetching file tree:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFileTree();
  }, [repoData, selectedCommit]);

  const toggleDirectory = (path) => {
    setExpandedDirs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(path)) {
        newSet.delete(path);
      } else {
        newSet.add(path);
      }
      return newSet;
    });
  };

  const handleFileClick = (file) => {
    setSelectedFile(file);
    onFileSelect(file);
  };

  const renderFileIcon = (type) => {
    switch (type) {
      case 'file': return <DocumentTextIcon className="w-4 h-4 text-blue-400" />;
      case 'directory': return <FolderIcon className="w-4 h-4 text-yellow-400" />;
      default: return <CodeIcon className="w-4 h-4 text-gray-400" />;
    }
  };

  const renderTree = (node, depth = 0) => {
    if (node.type === 'file') {
      return (
        <div
          key={node.path}
          className={`flex items-center py-1 px-2 hover:bg-gray-700 cursor-pointer rounded ${
            selectedFile?.path === node.path ? 'bg-gray-700' : ''
          }`}
          style={{ paddingLeft: `${depth * 1.5 + 1}rem` }}
          onClick={() => handleFileClick(node)}
        >
          {renderFileIcon(node.type)}
          <span className="ml-2 text-sm text-gray-300">{node.name}</span>
        </div>
      );
    }

    if (node.type === 'directory') {
      const isExpanded = expandedDirs.has(node.path);
      return (
        <div key={node.path} style={{ paddingLeft: `${depth * 1.5}rem` }}>
          <div
            className="flex items-center py-1 px-2 hover:bg-gray-700 cursor-pointer rounded"
            onClick={() => toggleDirectory(node.path)}
          >
            {isExpanded ? (
              <ChevronDownIcon className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronRightIcon className="w-4 h-4 text-gray-400" />
            )}
            {renderFileIcon(node.type)}
            <span className="ml-2 text-sm text-gray-300">{node.name}</span>
          </div>
          {isExpanded && node.children && (
            <div className="ml-2">
              {node.children.map((child) => renderTree(child, depth + 1))}
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  if (loading) {
    return (
      <div className="bg-gray-800 rounded-lg shadow-lg p-4 h-64 flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading file structure...</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-4 h-full overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4 text-gray-200 border-b border-gray-700 pb-2">
        Files at {selectedCommit?.sha.slice(0, 7)}
      </h2>
      <div className="file-tree">
        {fileTree ? renderTree(fileTree) : (
          <div className="text-gray-500 text-sm">No files to display</div>
        )}
      </div>
    </div>
  );
};

export default FileExplorer;