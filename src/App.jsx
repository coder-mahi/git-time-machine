import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
// import Timeline from './components/Timeline';
import FileExplorer from './components/FileExplorer';
import CommitDetail from './components/CommitDetail';
import CodeViewer from './components/CodeViewer';
import Navbar from './components/Navbar';
import RepoInput from './components/RepoInput';
import { fetchRepoData } from './api/gitService';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gitvisualize/:owner/:repo" element={<RepoVisualizer />} />
        </Routes>
      </div>
    </Router>
  );
};

const HomePage = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="max-w-3xl mx-auto mt-10">
        <h1 className="text-4xl font-bold mb-6 text-center text-blue-400">GitTimeMachine</h1>
        <p className="text-lg mb-8 text-center text-gray-300">
          Visualize GitHub repositories as interactive timelines
        </p>
        <RepoInput />
      </div>
    </div>
  );
};

const RepoVisualizer = () => {
  const { owner, repo } = useParams();
  const [repoData, setRepoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCommit, setSelectedCommit] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const loadRepoData = async() => {
      try {
        setLoading(true);
        const data = await fetchRepoData(owner, repo);
        setRepoData(data);
        if (data.commits.length>0)
          {
          setSelectedCommit(data.commits[0]);
        }
      } 
      catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadRepoData();
  }, [owner, repo]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay message={error} />;

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Timeline 
            commits={repoData.commits} 
            selectedCommit={selectedCommit}
            onSelectCommit={setSelectedCommit}
          />
          <CommitDetail commit={selectedCommit} />
        </div>
        <div className="lg:col-span-1">
          <FileExplorer 
            repoData={repoData} 
            selectedCommit={selectedCommit}
            onFileSelect={setSelectedFile}
          />
          {selectedFile && (
            <CodeViewer 
              file={selectedFile}
              repo={repoData}
              commit={selectedCommit}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

const ErrorDisplay = ({ message }) => (
  <div className="bg-red-900 text-white p-4 rounded-md">
    <p>Error: {message}</p>
  </div>
);

export default App;