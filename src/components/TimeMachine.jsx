import { useContext } from 'react';
import { GitContext } from '../contexts/GitContext';
import CommitGraph from './CommitGraph';
import TimeControls from './TimeControls';
import CodeViewer from './CodeViewer';
import AuthorStats from './AuthorStats';

export default function TimeMachine() {
  const { commits, currentCommit, setCurrentCommit } = useContext(GitContext);

  return (
    <div className="time-machine">
      <div className="visualization-panel">
        <CommitGraph commits={commits} currentCommit={currentCommit} />
        <AuthorStats commits={commits} />
      </div>
      <div className="code-panel">
        <TimeControls 
          commits={commits} 
          currentCommit={currentCommit}
          onCommitSelect={setCurrentCommit}
        />
        <CodeViewer commit={currentCommit} />
      </div>
    </div>
  );
}