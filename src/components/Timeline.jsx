import React from 'react';
import { ChevronRightIcon } from '@heroicons/react/outline';

const Timeline = ({ commits, selectedCommit, onSelectCommit }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-4 mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-200 border-b border-gray-700 pb-2">
        Commit Timeline
      </h2>
      <div className="space-y-4">
        {commits.map((commit) => (
          <div
            key={commit.sha}
            className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
              selectedCommit?.sha === commit.sha
                ? 'bg-blue-900 border-l-4 border-blue-400'
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
            onClick={() => onSelectCommit(commit)}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <div className="h-3 w-3 rounded-full bg-blue-400"></div>
              </div>
              <div className="ml-3 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-white">
                    {commit.message.split('\n')[0]}
                  </h3>
                  <span className="text-xs text-gray-400">
                    {new Date(commit.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  {commit.author.name} • {commit.sha.substring(0, 7)}
                </p>
                {selectedCommit?.sha === commit.sha && (
                  <div className="mt-2 flex items-center text-xs text-blue-300">
                    <span>Viewing this commit</span>
                    <ChevronRightIcon className="h-3 w-3 ml-1" />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;