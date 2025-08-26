# GitHub User Activity CLI

A simple Node.js CLI project that fetches and displays the recent activity of a GitHub user.  
This project is based on the roadmap.sh challenge:  
[Project URL: https://roadmap.sh/projects/github-user-activity](https://roadmap.sh/projects/github-user-activity)

## Features
- Fetches recent GitHub events of any user.
- Sorts activity by date (newest first).
- Displays commit history (Push events).
- Uses only Node.js built-in `https` module (no external dependencies).

## Usage

### 1. Clone the repository
git clone https://github.com/<your-username>/github-user-activity.git
cd github-user-activity.

run the script: node index.js
By default, the script runs for the example user octocat.
#### 2. change Username:
getActivity("your-github-username");
CommitHistory("your-github-username");
