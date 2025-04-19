import { useContext } from 'react';
import { GitContext } from '../contexts/GitContext';

export default function TimeControls({ onCommitSelect }) {
  const { commits, currentCommit } = useContext(GitContext);
  
  const handlePrevious = () => {
    const index = commits.findIndex(c => c.hash === currentCommit.hash);
    if (index > 0) onCommitSelect(commits[index - 1]);
  };
  
  const handleNext = () => {
    const index = commits.findIndex(c => c.hash === currentCommit.hash);
    if (index < commits.length - 1) onCommitSelect(commits[index + 1]);
  };

  return (
    <div className="time-controls">
      <button onClick={handlePrevious} disabled={!commits.length}>
        ⏮ Previous
      </button>
      <input 
        type="range" 
        min="0" 
        max={commits.length - 1} 
        value={commits.findIndex(c => c.hash === currentCommit.hash)} 
        onChange={(e) => onCommitSelect(commits[e.target.value])}
      />
      <button onClick={handleNext} disabled={!commits.length}>
        Next ⏭
      </button>
      <span>{currentCommit?.date?.toLocaleDateString()}</span>
    </div>
  );
}