import React from 'react';
import { UserIcon, CalendarIcon, CodeIcon, ArrowCircleRightIcon } from '@heroicons/react/outline';

const CommitDetail=({ commit}) =>{
  if(!commit) return null;
  return(
    <div className="bg-gray-800 rounded-lg shadow-lg p-4 mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-200 border-b border-gray-700 pb-2">
        Commit Detailss
      </h2>
      <div className="space-y-4">
      <div>
          <h3 className="text-lg font-medium text-white mb-2">{commit.message.split('\n')[0]}</h3>
          {commit.message.split('\n').length > 1 && (
            <p className="text-sm text-gray-300 whitespace-pre-line mt-2">
              {commit.message.split('\n').slice(1).join('\n')}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center">
            <UserIcon className="h-5 w-5 text-gray-400 mr-2" />
            <div>
              <p className="text-sm text-gray-400">Author</p>
              <p className="text-white">{commit.author.name}</p>
            </div>
          </div>

          <div className="flex items-center">
            <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
            <div>
              <p className="text-sm text-gray-400">Date</p>
              <p className="text-white">
                {new Date(commit.date).toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <CodeIcon className="h-5 w-5 text-gray-400 mr-2" />
            <div>
              <p className="text-sm text-gray-400">Commit Hash</p>
              <p className="text-white font-mono">{commit.sha}</p>
            </div>
          </div>

          <div className="flex items-center">
            <ArrowCircleRightIcon className="h-5 w-5 text-gray-400 mr-2" />
            <div>
              <p className="text-sm text-gray-400">Parent</p>
              <p className="text-white font-mono">
                {commit.parents?.[0]?.sha?.slice(0, 7) || 'None'}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-300 mb-2">Stats</h4>
          <div className="flex space-x-4">
            <div className="bg-gray-700 px-3 py-1 rounded-md">
              <span className="text-green-400 text-sm">+{commit.stats?.additions || 0}</span>
            </div>
            <div className="bg-gray-700 px-3 py-1 rounded-md">
              <span className="text-red-400 text-sm">-{commit.stats?.deletions || 0}</span>
            </div>
            <div className="bg-gray-700 px-3 py-1 rounded-md">
              <span className="text-gray-300 text-sm">{commit.stats?.total || 0} changes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommitDetail;