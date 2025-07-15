const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Backend working!");
});

// ✅ Spotify Login Route
app.get("/login", (req, res) => {
  const scopes = [
    "user-read-private",
    "user-read-email",
    "playlist-modify-public",
    "playlist-modify-private",
    "user-top-read"
  ];

  const authUrl = `https://accounts.spotify.com/authorize` +
    `?response_type=code` +
    `&client_id=${process.env.CLIENT_ID}` +
    `&scope=${encodeURIComponent(scopes.join(" "))}` +
    `&redirect_uri=${encodeURIComponent(process.env.REDIRECT_URI)}`;

  res.redirect(authUrl);
});

app.get("/callback", async (req, res) => {
  const code = req.query.code || null;

  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', null, {
      params: {
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: process.env.REDIRECT_URI,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const access_token = response.data.access_token;

    // For now, just send token to browser
    // 🔍 Get user's top artists using the token
const topArtistsResponse = await axios.get('https://api.spotify.com/v1/me/top/artists', {
  headers: {
    Authorization: `Bearer ${access_token}`
  }
});

const topArtists = topArtistsResponse.data.items.slice(0, 5); // get top 5
const userProfile = await axios.get('https://api.spotify.com/v1/me', {headers:{
    Authorization: `Bearer ${access_token}`
}
});
const userId = userProfile.data.id;
const newPlaylist = await axios.post(`https://api.spotify.com/v1/users/${userId}/playlists`, {
  name: "VibeWave 🎶 - Made Just for You",
  description: "A custom playlist based on your top artists ❤️",
  public: false
}, {
  headers: {
    Authorization: `Bearer ${access_token}`,
    'Content-Type': 'application/json'
  }
});
const playlistId = newPlaylist.data.id;

let trackURIs = [];

for (let artist of topArtists) {
  const tracksResponse = await axios.get(`https://api.spotify.com/v1/artists/${artist.id}/top-tracks?market=IN`, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });

  const topTracks = tracksResponse.data.tracks.slice(0, 2); // Pick top 2 tracks per artist
  topTracks.forEach(track => trackURIs.push(track.uri));
}
// Step 3: Add tracks to the playlist
await axios.post(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
  uris: trackURIs
}, {
  headers: {
    Authorization: `Bearer ${access_token}`,
    'Content-Type': 'application/json'
  }
});

res.redirect(`${process.env.FRONTEND_URI}/success`);

  } catch (error) {
    console.error('Error fetching access token:', error.response.data);
    res.send("Error during token exchange.");
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});

