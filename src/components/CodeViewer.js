import React, { useState, useEffect } from 'react';
import { DocumentTextIcon, XIcon } from '@heroicons/react/outline';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const CodeViewer = ({ file, repo, commit }) => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFileContent = async () => {
      if (!file || !repo || !commit) return;
      
      setLoading(true);
      setError(null);
      try {
        // In a real app, you would fetch the file content
        // const response = await fetch(`/api/repos/${repo.owner}/${repo.name}/content/${commit.sha}/${file.path}`);
        // const data = await response.json();
        
        // Mock data for demonstration
        const mockContent = `// ${file.path}\n// Content at commit ${commit.sha.slice(0, 7)}\n\nfunction ${file.name.replace('.js', '')}() {\n  return "This is a mock file content";\n}\n`;
        setContent(mockContent);
      } catch (err) {
        setError('Failed to load file content');
      } finally {
        setLoading(false);
      }
    };

    fetchFileContent();
  }, [file, repo, commit]);

  const getLanguage = (filename) => {
    const extension = filename.split('.').pop();
    switch (extension) {
      case 'js': return 'javascript';
      case 'jsx': return 'javascript';
      case 'ts': return 'typescript';
      case 'tsx': return 'typescript';
      case 'py': return 'python';
      case 'java': return 'java';
      case 'c': return 'c';
      case 'cpp': return 'cpp';
      case 'html': return 'html';
      case 'css': return 'css';
      case 'json': return 'json';
      case 'md': return 'markdown';
      default: return 'plaintext';
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-800 rounded-lg shadow-lg p-4 mt-4 h-48 flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading file content...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/20 rounded-lg shadow-lg p-4 mt-4">
        <div className="text-red-400">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-0 mt-4 overflow-hidden">
      <div className="flex items-center justify-between bg-gray-700 px-4 py-2 border-b border-gray-600">
        <div className="flex items-center">
          <DocumentTextIcon className="h-5 w-5 text-blue-400 mr-2" />
          <span className="text-sm font-medium text-gray-200">{file.path}</span>
        </div>
      </div>
      {content ? (
        <SyntaxHighlighter
          language={getLanguage(file.name)}
          style={atomOneDark}
          showLineNumbers={true}
          wrapLines={true}
          customStyle={{
            margin: 0,
            padding: '1rem',
            background: '#1F2937',
            fontSize: '0.875rem',
            lineHeight: '1.5',
          }}
        >
          {content}
        </SyntaxHighlighter>
      ) : (
        <div className="p-4 text-gray-500">No content to display</div>
      )}
    </div>
  );
};

export default CodeViewer;