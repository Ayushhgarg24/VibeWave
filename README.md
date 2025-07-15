# 🎧 VibeWave — Personalized Spotify Playlist Generator

> Built with ❤️ by [Ayush Garg](https://github.com/Ayushhgarg24) — Full Stack Dev & Engineer at Heart 💻⚡

**VibeWave** is a full-stack web application that connects with your Spotify account, analyzes your top artists, and automatically creates a custom playlist just for you — filled with bangers from your favorite artists.  

---

## 🧠 How it Works (In Simple Terms)

1. **You log in with Spotify**
2. App fetches your **top artists** using Spotify's Web API
3. For each top artist, it pulls **their top tracks**
4. It then **creates a private playlist** in your account
5. Boom — you get your own 🔥 curated playlist

---

## ⚙️ Tech Stack

| Frontend                     | Backend                | APIs / Services       |
|-----------------------------|------------------------|------------------------|
| React.js (CRA)              | Node.js + Express.js   | Spotify Web API 🎵     |
| HTML5, CSS3 (inline styles) | Axios, dotenv, cors    | OAuth 2.0 Auth Flow    |

---

## 🖥️ Features

- 🔐 Spotify OAuth Authentication
- 🎵 Fetches user's top artists
- 📥 Pulls top 2 tracks per artist
- 🎼 Creates & populates a new playlist in your account
- 🔁 Works for any Spotify user — just log in
- 🔥 Live preview of playlist using Spotify Embed

---

## 🧪 Demo (Localhost)

![VibeWave Screenshot](https://i.imgur.com/BWVibeWaveDemo.png)

> Or visit: `http://localhost:3000` (React frontend)  
> Backend runs at: `http://localhost:5000`

---

## 📂 Project Structure

VibeWave/
├── client/ # React frontend
│ ├── public/
│ └── src/
│ ├── App.js
│ └── components/
├── Server/ # Node.js backend
│ ├── index.js
│ └── .env
├── .gitignore
└── README.md

csharp
Copy
Edit

---

## 🧠 Backend Code Explained (`Server/index.js`)

```js
// Set up server
const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
const PORT = 5000;

// 🔐 Spotify Login Endpoint
app.get("/login", (req, res) => {
  const scopes = [ /* scopes here */ ];
  const authUrl = `https://accounts.spotify.com/authorize?...`;
  res.redirect(authUrl);
});

app.get("/callback", async (req, res) => {
  const code = req.query.code;
  
  const response = await axios.post('https://accounts.spotify.com/api/token', {
    // Access Token logic
  });

  const access_token = response.data.access_token;

  // Get user's top artists
  const topArtists = await axios.get('https://api.spotify.com/v1/me/top/artists', { headers });

  // Create Playlist
  const userId = await axios.get('https://api.spotify.com/v1/me', { headers });
  const playlist = await axios.post(`https://api.spotify.com/v1/users/${userId}/playlists`, {...});

  // Add top 2 songs from each artist
  for (...) {
    const tracks = await axios.get(`https://api.spotify.com/v1/artists/${artist.id}/top-tracks`);
    trackURIs.push(...);
  }

  // Add tracks to playlist
  await axios.post(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, { uris: trackURIs });

  res.send(`<h2>✅ Playlist Created Successfully!</h2>`);
});
 ```

---

## 💻 Frontend Code Highlights

```js
function Home() {
  const handleLogin = () => {
    window.location.href = "http://localhost:5000/login";
  };

  return (
    <div style={styles.container}>
      <h1>🎧 VibeWave</h1>
      <p>Create your personalized Spotify playlist in seconds</p>
      <button onClick={handleLogin}>Login with Spotify</button>
    </div>
  );
}
```

Success.jsx

function Success() {
  return (
    <div style={styles.container}>
      <h2>✅ Playlist Created Successfully!</h2>
      <iframe src="https://open.spotify.com/embed/playlist/..." ... />
      <a href="https://open.spotify.com/playlist/..." target="_blank">
        Open on Spotify
      </a>
    </div>
  );
}

# 🚀 Run Locally
Backend (Server)

cd Server
npm install
node index.js
Frontend (Client)
cd client
npm install
npm start
🛡️ Security Notes
✅ Never push .env to GitHub

✅ Use .gitignore properly

✅ For production, store secrets in hosting config/environment

📬 Contact Me
🔗 GitHub: Ayushhgarg24

💼 LinkedIn: ayushgarg

📧 Email: ayush.garg@example.com (replace with your real email)

⭐ Give a Star
If you like this project or it helped you build your own, drop a ⭐ on the VibeWave repo. Let’s make the world vibe! 🎵
