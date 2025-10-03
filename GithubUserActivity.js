import fetch from 'node-fetch';

// Function for sorting
function SortingUserActivity (data) {
  return data.sort((a,b) => new Date(b.created_at) - new Date(a.created_at));
}

// Function for Displaying data
function DisplayData (data) {
  console.log(data);
}

// Function for getting user activity ( simplified 13 lines into 12 )
async function getActivity(username) { 
  try { 
    const response = await fetch(`https://api.github.com/users/${username}/events`, {
      headers: { "User-Agent": "node.js"}
    });
    if (!response.ok) throw new Error(`HTTP error!, Status: ${response.status}`);
    const events = await response.json();
    const sorted = SortingUserActivity(events);
    DisplayData(sorted);
  } catch (err) {
    console.error("Failed to fetch user activity:", err.message);
  }
}

// Function for commit history of repositories ( simplified )
async function CommitHistory(username) { 
  try { 
    const response = await fetch(`https://api.github.com/users/${username}/events`, {
      headers: {"User-Agent": "node.js"}
    });
    if (!response.ok) throw new Error(`HTTP error!, Status ${response.status}`);
    const events = await response.json();
    const sorted = SortingUserActivity(events);
    const commits = sorted.filter(event => event.type === "PushEvent");
    DisplayData(commits);
  } catch (err) { 
    console.error("Failed to fetch commits history:", err.message);
  }
}

getActivity("octocat");
CommitHistory("octocat");