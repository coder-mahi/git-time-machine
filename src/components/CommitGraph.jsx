import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './CommitGraph.scss';

export default function CommitGraph({ commits, currentCommit }) {
  const svgRef = useRef();

  useEffect(() => {
    if (!commits.length) return;
    
    // D3 visualization code here
    const svg = d3.select(svgRef.current);
    // ... visualization implementation
    
  }, [commits, currentCommit]);

  return (
    <div className="commit-graph">
      <svg ref={svgRef} width="100%" height="500" />
    </div>
  );
}