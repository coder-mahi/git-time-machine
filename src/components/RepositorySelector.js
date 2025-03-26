import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RepositorySelector = () => {
  const [repoUrl, setRepoUrl] = useState('');
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const url = e.target.value;
    setRepoUrl(url);
    // Simple validation - check if it looks like a GitHub URL
    setIsValid(url.includes('github.com') || url.includes('gitlab.com') || url.includes('bitbucket.org'));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      const encodedUrl = encodeURIComponent(repoUrl);
      navigate(`/gitvisualize/${encodedUrl}`);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="repoUrl" className="block text-sm font-medium text-gray-700 mb-1">
            GitHub Repository URL
          </label>
          <input
            type="text"
            id="repoUrl"
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              isValid ? 'focus:ring-green-500 border-green-500' : 'focus:ring-blue-500 border-gray-300'
            }`}
            placeholder="https://github.com/username/repository"
            value={repoUrl}
            onChange={handleChange}
          />
          {repoUrl && !isValid && (
            <p className="mt-1 text-sm text-red-600">Please enter a valid GitHub, GitLab, or Bitbucket repository URL</p>
          )}
        </div>
        <button
          type="submit"
          disabled={!isValid}
          className={`w-full px-4 py-2 rounded-md text-white font-medium ${
            isValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Visualize Repository
        </button>
      </form>
      
      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-800 mb-2">Try these examples:</h3>
        <ul className="space-y-2">
          {[
            'facebook/react',
            'vuejs/vue',
            'angular/angular',
            'microsoft/vscode',
            'torvalds/linux'
          ].map(repo => (
            <li key={repo}>
              <button
                onClick={() => setRepoUrl(`https://github.com/${repo}`)}
                className="text-blue-600 hover:text-blue-800 hover:underline"
              >
                github.com/{repo}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RepositorySelector;