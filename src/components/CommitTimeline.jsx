import React from 'react';
import { format } from 'date-fns';
const CommitTimeline = ({ commits, onSelectCommit, selectedCommit }) => {
  return(

    <div className="space-y-4">

      {commits.map((commit) => (
      <div key={commit.hash}
      onClick={() => onSelectCommit(commit)}
      className={`p-4 border-l-4 rounded cursor-pointer transition-all duration-200 ${
            selectedCommit?.hash === commit.hash 
              ? 'border-blue-600 bg-blue-50' 
              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
          }`}>

  <div className="flex justify-between items-start">
      <h3 className="font-medium text-gray-900">{commit.subject}</h3>
      
      <span className="text-xs text-gray-500">
          {format(new Date(commit.date), 'MMM dd, yyyy HH:mm')}
            </span>
          </div>

          <div className="flex items-center mt-2">
            <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs text-gray-600">
              {commit.author.charAt(0)}
            </div>
            <span className="ml-2 text-sm text-gray-600">{commit.author}</span>
            <span className="ml-2 text-xs text-gray-400 truncate">{commit.email}</span>
          </div>
          {commit.body && (
            <p className="mt-2 text-sm text-gray-500 line-clamp-2">{commit.body}</p>
          )}
          <div className="mt-2">
            <span className="inline-block px-2 py-1 text-xs font-mono bg-gray-100 rounded text-gray-600">
              {commit.hash.substring(0, 7)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommitTimeline;