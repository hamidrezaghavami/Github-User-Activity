import https from 'https';

// Function for sorting
function SortingUserActivity (data) {
  return data.sort((a,b) => new Date(b.created_at) - new Date(a.created_at));
}

// Function for Displaying data
function DisplayData (data) { 
  console.log(data);
}

// Function for getting user activity

function getActivity(username) {
  https.get(`https://api.github.com/users/${username}/events`, {
    headers: { "User-Agent": "node.js" }
  }, res => {
    let data = "";
    res.on("data", chunk => data += chunk);
    res.on("end", () => {
      const events = JSON.parse(data);
      const sorted = SortingUserActivity(events);
      DisplayData(sorted);
    });
  }).on("error", err => console.error(err));
}

// Function for commit history of repositories
function CommitHistory(username) { 
  https.get(`https://api.github.com/users/${username}/events`, {
    headers: { "User-Agent": "node.js" }
  }, res => { 
    let data = ""; 
    res.on("data", chunk => data += chunk);
    res.on("end", () => { 
      const events = JSON.parse(data);
      const sorted = SortingUserActivity(events);
      const commits = sorted.filter(event => event.type === "PushEvent");
      DisplayData(commits);
    });
  }) .on("error", err => console.error(err));
}

getActivity("octocat");
CommitHistory("octocat");