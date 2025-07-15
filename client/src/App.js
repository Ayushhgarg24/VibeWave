import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function Home() {
  const handleLogin = () => {
    console.log("Redirecting to:", `${process.env.REACT_APP_BACKEND_URI}/login`);
window.location.href = `${process.env.REACT_APP_BACKEND_URI}/login`;
  };

  return (
    <div style={styles.container}>
      <h1>🎧 MakeMeAPlaylist</h1>
      <p>Generate a custom playlist based on your top Spotify artists</p>
      <button onClick={handleLogin} style={styles.button}>
        Login with Spotify
      </button>

      <footer style={styles.footer}>
        <p>
          Built by <strong>Ayush Garg</strong> — Full Stack Dev & Engineer at Heart 💻⚡
        </p>
        <p>
          <a href="mailto:ayushgarg241204@gmail.com" style={styles.footerLink}>Email</a> |{" "}
          <a href="https://github.com/Ayushhgarg24" target="_blank" rel="noreferrer" style={styles.footerLink}>GitHub</a> |{" "}
          <a href="http://www.linkedin.com/in/ayushh-garg" target="_blank" rel="noreferrer" style={styles.footerLink}>LinkedIn</a>
        </p>
      </footer>
    </div>
  );
}


function Success() {
  return (
    <div style={styles.container}>
      <h2>✅ Playlist Created Successfully!</h2>
      <p>Your personalized playlist is ready:</p>

      <iframe
        src="https://open.spotify.com/embed/playlist/53vB4kUrV7mpS5NPjqlZCT?utm_source=generator"
        width="100%"
        height="352"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        style={{ borderRadius: "12px", marginTop: "20px" }}
        title="Spotify Playlist"
      ></iframe>

      <a
        href="https://open.spotify.com/playlist/53vB4kUrV7mpS5NPjqlZCT"
        target="_blank"
        rel="noopener noreferrer"
        style={styles.link}
      >
        Open Spotify
      </a>

      <footer style={styles.footer}>
        <p>
          Built by <strong>Ayush Garg</strong> — Full Stack Dev & Engineer at Heart 💻⚡
        </p>
        <p>
          <a href="mailto:ayushgarg241204@gmail.com" style={styles.footerLink}>Email</a> |{" "}
          <a href="https://github.com/Ayushhgarg24" target="_blank" rel="noreferrer" style={styles.footerLink}>GitHub</a> |{" "}
          <a href="http://www.linkedin.com/in/ayushh-garg" target="_blank" rel="noreferrer" style={styles.footerLink}>LinkedIn</a>
        </p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "#121212",
    color: "white",
    fontFamily: "sans-serif"
  },
  button: {
    padding: "12px 24px",
    fontSize: "16px",
    backgroundColor: "#1DB954",
    color: "#fff",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    marginTop: "20px"
  },
  link: {
    marginTop: "20px",
    color: "#1DB954",
    textDecoration: "none",
    fontWeight: "bold"
  },
  footer: {
  position: "absolute",
  bottom: "20px",
  textAlign: "center",
  color: "#aaa",
  fontSize: "14px"
},
footerLink: {
  color: "#1DB954",
  textDecoration: "none",
  margin: "0 8px"
}
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  );
}

export default App;
