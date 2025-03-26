import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const BranchGraph = ({ commits, branches, selectedBranch, onSelectCommit }) => {
  const svgRef = useRef();
  const tooltipRef = useRef();
  
  useEffect(() => {
    if (!commits.length || !svgRef.current) return;

    // Clear previous graph
    d3.select(svgRef.current).selectAll('*').remove();
    
    const width = svgRef.current.clientWidth;
    const height = Math.max(600, commits.length * 20);
    const margin = { top: 50, right: 50, bottom: 50, left: 100 };
    
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .style('background', 'white');
    
    // Create scales
    const x = d3.scaleTime()
      .domain(d3.extent(commits, d => new Date(d.date)))
      .range([margin.left, width - margin.right]);
    
    const y = d3.scaleLinear()
      .domain([0, commits.length - 1])
      .range([margin.top, height - margin.bottom]);
    
    // Create axes
    const xAxis = g => g
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(5).tickSizeOuter(0));
    
    const yAxis = g => g
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(5).tickFormat(d => commits[d]?.hash.substring(0, 7) || '').tickSizeOuter(0));
    
    svg.append('g').call(xAxis);
    svg.append('g').call(yAxis);
    
    // Draw commit dots
    svg.selectAll('.commit')
      .data(commits)
      .enter()
      .append('circle')
      .attr('cx', d => x(new Date(d.date)))
      .attr('cy', (d, i) => y(i))
      .attr('r', 5)
      .attr('fill', '#3b82f6')
      .on('mouseover', (event, d) => {
        d3.select(tooltipRef.current)
          .style('opacity', 1)
          .html(`
            <div class="p-2 bg-white border rounded shadow">
              <strong>${d.subject}</strong><br>
              ${d.author}<br>
              ${new Date(d.date).toLocaleString()}
            </div>
          `)
          .style('left', `${event.pageX + 10}px`)
          .style('top', `${event.pageY + 10}px`);
      })
      .on('mouseout', () => {
        d3.select(tooltipRef.current).style('opacity', 0);
      })
      .on('click', (event, d) => {
        onSelectCommit(d);
      });
    
    // Draw lines between commits
    svg.selectAll('.commit-line')
      .data(commits.slice(0, -1))
      .enter()
      .append('line')
      .attr('x1', d => x(new Date(d.date)))
      .attr('y1', (d, i) => y(i))
      .attr('x2', (d, i) => x(new Date(commits[i + 1].date)))
      .attr('y2', (d, i) => y(i + 1))
      .attr('stroke', '#9ca3af')
      .attr('stroke-width', 1);
    
    // Add title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', margin.top / 2)
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .style('font-weight', 'bold')
      .text(`Commit History - ${selectedBranch} Branch`);
    
  }, [commits, selectedBranch]);
  
  return (
    <div className="relative">
      <svg ref={svgRef} className="w-full border rounded" />
      <div 
        ref={tooltipRef} 
        className="absolute opacity-0 pointer-events-none transition-opacity duration-200"
      />
    </div>
  );
};

export default BranchGraph;