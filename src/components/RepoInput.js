import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchIcon } from '@heroicons/react/outline';

const RepoInput = () => {
  const [repoUrl, setRepoUrl] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    try {
      // Parse GitHub URL
      let owner, repo;
      
      if (repoUrl.includes('github.com')) {
        // Full GitHub URL
        const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
        if (!match || match.length < 3) {
          throw new Error('Invalid GitHub repository URL');
        }
        [owner, repo] = match.slice(1, 3);
      } else {
        // owner/repo format
        const parts = repoUrl.split('/');
        if (parts.length !== 2 || !parts[0] || !parts[1]) {
          throw new Error('Please enter in format: owner/repo');
        }
        [owner, repo] = parts;
      }

      // Remove .git if present
      repo = repo.replace(/\.git$/, '');
      
      navigate(`/gitvisualize/${owner}/${repo}`);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="repo-url" className="block text-sm font-medium text-gray-300 mb-1">
            GitHub Repository URL
          </label>
          <div className="flex rounded-md shadow-sm">
            <div className="relative flex-grow focus-within:z-10">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="repo-url"
                className="block w-full rounded-l-md pl-10 bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="owner/repo or https://github.com/owner/repo"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-600 text-sm font-medium rounded-r-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              Visualize
            </button>
          </div>
          {error && (
            <p className="mt-2 text-sm text-red-400">{error}</p>
          )}
        </div>
        <div className="text-sm text-gray-400">
          <p>Example: <span className="text-blue-400 cursor-pointer" onClick={() => setRepoUrl('facebook/react')}>facebook/react</span></p>
        </div>
      </form>
    </div>
  );
};

export default RepoInput;