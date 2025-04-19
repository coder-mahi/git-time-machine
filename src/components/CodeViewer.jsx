import React, { useState, useContext } from 'react';
import { GitContext } from '../contexts/GitContext';
import { getFileDiff } from '../utils/gitHelpers';
import SyntaxHighlighter from 'react-syntax-highlighter';

export default function CodeViewer() {
  const { currentCommit } = useContext(GitContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [diff, setDiff] = useState(null);

  useEffect(() => {
    if (selectedFile && currentCommit) {
      getFileDiff(selectedFile, currentCommit.hash)
        .then(setDiff)
        .catch(console.error);
    }
  }, [selectedFile, currentCommit]);

  return (
    <div className="code-viewer">
      {diff ? (
        <>
          <div className="file-header">
            <h3>{selectedFile}</h3>
            <span>{diff.linesAdded} added, {diff.linesRemoved} removed</span>
          </div>
          <SyntaxHighlighter 
            language={selectedFile.split('.').pop()} 
            showLineNumbers
          >
            {diff.content}
          </SyntaxHighlighter>
        </>
      ) : (
        <div className="no-file-selected">
          Select a file to view its history
        </div>
      )}
    </div>
  );
}