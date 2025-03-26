import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { Octokit } from 'octokit';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// GitHub API client
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

// API Routes
app.get('/api/repos/:owner/:repo', async (req, res) => {
  try {
    const { owner, repo } = req.params;
    
    // Get repository info
    const repoInfo = await octokit.rest.repos.get({
      owner,
      repo,
    });
    
    // Get commits
    const commits = await octokit.rest.repos.listCommits({
      owner,
      repo,
      per_page: 100,
    });
    
    // Process commits data
    const processedCommits = commits.data.map(commit => ({
      sha: commit.sha,
      message: commit.commit.message,
      author: {
        name: commit.commit.author.name,
        email: commit.commit.author.email,
        date: commit.commit.author.date,
      },
      parents: commit.parents.map(parent => ({ sha: parent.sha })),
      url: commit.html_url,
    }));
    
    res.json({
      owner,
      name: repo,
      description: repoInfo.data.description,
      stars: repoInfo.data.stargazers_count,
      forks: repoInfo.data.forks_count,
      commits: processedCommits,
    });
  } catch (error) {
    console.error('Error fetching repo data:', error);
    res.status(500).json({ error: 'Failed to fetch repository data' });
  }
});

app.get('/api/repos/:owner/:repo/tree/:sha', async (req, res) => {
  try {
    const { owner, repo, sha } = req.params;
    
    const tree = await octokit.rest.git.getTree({
      owner,
      repo,
      tree_sha: sha,
      recursive: 1,
    });
    
    // Process tree data into hierarchical structure
    const processedTree = processGitTree(tree.data.tree);
    
    res.json(processedTree);
  } catch (error) {
    console.error('Error fetching tree:', error);
    res.status(500).json({ error: 'Failed to fetch file tree' });
  }
});

app.get('/api/repos/:owner/:repo/content/:sha/:path', async (req, res) => {
  try {
    const { owner, repo, sha, path } = req.params;
    
    const content = await octokit.rest.repos.getContent({
      owner,
      repo,
      path,
      ref: sha,
    });
    
    // Decode content if it's base64 encoded
    let fileContent;
    if (content.data.content) {
      fileContent = Buffer.from(content.data.content, 'base64').toString('utf-8');
    } else {
      fileContent = 'No content available';
    }
    
    res.json({
      content: fileContent,
      encoding: content.data.encoding,
      size: content.data.size,
      path: content.data.path,
    });
  } catch (error) {
    console.error('Error fetching file content:', error);
    res.status(500).json({ error: 'Failed to fetch file content' });
  }
});

// Helper function to process GitHub tree into hierarchical structure
function processGitTree(tree) {
  const root = {
    name: 'root',
    type: 'directory',
    path: '',
    children: [],
  };
  
  tree.forEach(item => {
    const pathParts = item.path.split('/');
    let current = root;
    
    for (let i = 0; i < pathParts.length; i++) {
      const part = pathParts[i];
      const isLast = i === pathParts.length - 1;
      
      if (isLast) {
        current.children.push({
          name: part,
          type: item.type === 'blob' ? 'file' : 'directory',
          path: item.path,
          sha: item.sha,
          size: item.size,
          url: item.url,
        });
      } else {
        let dir = current.children.find(child => child.name === part && child.type === 'directory');
        
        if (!dir) {
          dir = {
            name: part,
            type: 'directory',
            path: pathParts.slice(0, i + 1).join('/'),
            children: [],
          };
          current.children.push(dir);
        }
      
        current = dir;
      }
    }
  });
  
  return root;
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});