const express = require("express");
const axios = require("axios");
const cors = require("cors");
const qs = require('querystring');
require("dotenv").config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

// ✅ Home route to check server is alive
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

  const redirectUri = process.env.REDIRECT_URI;

  const authUrl = `https://accounts.spotify.com/authorize` +
    `?response_type=code` +
    `&client_id=${process.env.CLIENT_ID}` +
    `&scope=${encodeURIComponent(scopes.join(" "))}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}`;

  console.log("🔁 Redirecting to Spotify with redirect URI:", redirectUri);
  res.redirect(authUrl);
});

// ✅ Spotify Callback Route
app.get("/callback", async (req, res) => {
     if (req.query.error) {
    return res.status(400).send("Spotify authorization denied.");
  }
  const code = req.query.code || null;
  if (!code) {
    return res.status(400).send("Authorization code missing.");
  }

  try {
    // 🔐 Exchange code for access token
    const response = await axios.post('https://accounts.spotify.com/api/token',
      qs.stringify({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: process.env.REDIRECT_URI,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    const access_token = response.data.access_token;

    // 👤 Get user profile
    const userProfile = await axios.get('https://api.spotify.com/v1/me', {
      headers: { Authorization: `Bearer ${access_token}` }
    });
    const userId = userProfile.data.id;

    // 🎨 Get top artists
    const topArtistsResponse = await axios.get('https://api.spotify.com/v1/me/top/artists', {
      headers: { Authorization: `Bearer ${access_token}` }
    });
    const topArtists = topArtistsResponse.data.items.slice(0, 5);

    // 🎶 Create playlist
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

    // 🎧 Collect track URIs
    let trackURIs = [];
    for (let artist of topArtists) {
      const tracksResponse = await axios.get(`https://api.spotify.com/v1/artists/${artist.id}/top-tracks?market=IN`, {
        headers: { Authorization: `Bearer ${access_token}` }
      });
      const topTracks = tracksResponse.data.tracks.slice(0, 2);
      topTracks.forEach(track => trackURIs.push(track.uri));
    }

    // ➕ Add tracks to playlist
    await axios.post(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      uris: trackURIs
    }, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json'
      }
    });

    // ✅ Redirect to frontend
    res.redirect(`${process.env.FRONTEND_URI}/success`);

  } catch (error) {
    console.error('❌ Error fetching access token:', error.response?.data || error.message);
    res.status(500).send("Something went wrong during token exchange.");
  }
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});