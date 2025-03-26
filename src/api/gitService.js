// export const fetchRepoData = async (owner, repo) => {
//     // In a real app, this would call your backend API
//     // const response = await fetch(`/api/repos/${owner}/${repo}`);
//     // return await response.json();
    
//     // Mock data for demonstration
//     return {
//       owner,
//       name: repo,
//       description: `${owner}/${repo} repository`,
//       stars: Math.floor(Math.random() * 10000),
//       forks: Math.floor(Math.random() * 1000),
//       commits: generateMockCommits(owner, repo),
//       tree: null, // Will be fetched per commit
//     };
//   };
  
//   const generateMockCommits = (owner, repo) => {
//     const commitCount = 15 + Math.floor(Math.random() * 10);
//     const commits = [];
    
//     for (let i = 0; i < commitCount; i++) {
//       const daysAgo = commitCount - i;
//       const date = new Date();
//       date.setDate(date.getDate() - daysAgo);
      
//       commits.push({
//         sha: `commit${i}${Math.random().toString(36).substring(2, 8)}`,
//         message: `Commit message ${i + 1}\nThis is a detailed description of the changes made in this commit.`,
//         author: {
//           name: i % 3 === 0 ? 'Developer One' : i % 3 === 1 ? 'Developer Two' : 'Developer Three',
//           email: `dev${i % 3 + 1}@example.com`,
//           date: date.toISOString(),
//         },
//         parents: i > 0 ? [{ sha: `commit${i - 1}` }] : [],
//         stats: {
//           additions: Math.floor(Math.random() * 100),
//           deletions: Math.floor(Math.random() * 50),
//           total: Math.floor(Math.random() * 120),
//         },
//         url: `https://github.com/${owner}/${repo}/commit/commit${i}`,
//       });
//     }
    
//     return commits;
//   };


import axios from 'axios';

export const fetchRepoData = async (owner, repo) => {
  try {
    const response = await axios.get(`/api/repos/${owner}/${repo}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching repo data:', error);
    throw new Error('Failed to fetch repository data');
  }
};

export const fetchFileContent = async (owner, repo, sha, path) => {
  try {
    const response = await axios.get(`/api/repos/${owner}/${repo}/content/${sha}/${path}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching file content:', error);
    throw new Error('Failed to fetch file content');
  }
};