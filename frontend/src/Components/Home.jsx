import React, { useEffect, useState } from "react";
import axios from "axios";
import Artworks from "./ArtWorks";

const Home = () => {
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/")
      .then((res) => setArtist(res.data))
      .catch((err) => console.error("Error fetching artist:", err));
  }, []);

  return (
    <div style={styles.container}>
      {/* Hero Section with Artist Info */}
      <div style={styles.hero}>
        <div style={styles.backgroundTexture} />
        <div style={styles.artistInfo}>
          <h1 style={styles.artistName}>{artist?.name}</h1>
          <div style={styles.divider} />
          <p style={styles.artistAbout}>{artist?.about}</p>
        </div>
      </div>

      {/* Artworks Gallery Section */}
      <section style={styles.gallerySection}>
        <h2 style={styles.sectionTitle}>Artworks Gallery</h2>
        <div style={styles.galleryGrid}>
          <Artworks />
        </div>
      </section>
    </div>
  );
};

const styles = {
  container: {
    padding: 0,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  hero: {
    position: "relative",
    padding: "80px 20px",
    textAlign: "center",
    background: "linear-gradient(135deg, #f9f5ff 0%, #f0f4ff 100%)",
    marginBottom: "60px",
    overflow: "hidden",
  },
  backgroundTexture: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgwLDAsMCwwLjAzKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgZmlsbD0idXJsKCNwYXR0ZXJuKSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIvPjwvc3ZnPg==')",
    opacity: 0.6,
  },
  artistInfo: {
    position: "relative",
    maxWidth: "800px",
    margin: "0 auto",
    padding: "40px",
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: "16px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.05)",
  },
  artistName: {
    fontSize: "3.5rem",
    fontWeight: 700,
    margin: "0 0 20px 0",
    background: "linear-gradient(90deg, #4f46e5, #c026d3)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    letterSpacing: "-0.05em",
  },
  artistAbout: {
    fontSize: "1.1rem",
    lineHeight: 1.8,
    color: "#4b5563",
    fontWeight: 400,
    maxWidth: "600px",
    margin: "0 auto",
  },
  divider: {
    height: "2px",
    width: "100px",
    background: "linear-gradient(90deg, rgba(79,70,229,0.2), rgba(79,70,229,0.8), rgba(79,70,229,0.2))",
    margin: "30px auto",
  },
  gallerySection: {
    padding: "0 20px 60px",
  },
  sectionTitle: {
    fontSize: "2rem",
    fontWeight: 600,
    color: "#111827",
    textAlign: "center",
    marginBottom: "40px",
    position: "relative",
  },
  galleryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "30px",
    padding: "20px 0",
  },
};

export default Home;