import React, { useEffect, useState } from "react";
import axios from "axios";
import ArtworkImage from "./ArtworkImage";

const Artworks = () => {
  const [artworks, setArtworks] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:8080/api/artworks")
      .then((res) => {
        setArtworks(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching artworks:", err);
        setIsLoading(false);
      });
  }, []);

  const handleImageClick = (url) => {
    setPreviewUrl(url);
  };

  const closeModal = (e) => {
    if (e.target === e.currentTarget) {
      setPreviewUrl(null);
    }
  };

  return (
    <>
      {isLoading ? (
        <div style={styles.loadingContainer}>
          <div style={styles.loadingSpinner}></div>
          <p style={styles.loadingText}>Loading artworks...</p>
        </div>
      ) : (
        <div style={styles.galleryGrid}>
          {artworks.map((art) => (
            <ArtworkImage 
              key={art.id} 
              id={art.id} 
              onClick={handleImageClick} 
            />
          ))}
        </div>
      )}

      {/* Fullscreen Image Preview Modal */}
      {previewUrl && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.modalContent}>
            <img 
              src={previewUrl} 
              alt="Artwork preview" 
              style={styles.modalImage} 
            />
            <button 
              style={styles.closeButton}
              onClick={() => setPreviewUrl(null)}
              aria-label="Close preview"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const styles = {
  galleryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "30px",
    padding: "20px 0",
  },
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "300px",
    gap: "20px",
  },
  loadingSpinner: {
    width: "50px",
    height: "50px",
    border: "5px solid #f3f3f3",
    borderTop: "5px solid #4f46e5",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  loadingText: {
    color: "#6b7280",
    fontSize: "1.1rem",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.9)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    backdropFilter: "blur(5px)",
  },
  modalContent: {
    position: "relative",
    maxWidth: "90vw",
    maxHeight: "90vh",
  },
  modalImage: {
    maxWidth: "100%",
    maxHeight: "90vh",
    borderRadius: "12px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
  },
  closeButton: {
    position: "absolute",
    top: "-40px",
    right: "0",
    background: "none",
    border: "none",
    color: "white",
    fontSize: "2.5rem",
    cursor: "pointer",
    padding: "0 10px",
    opacity: 0.7,
    transition: "opacity 0.2s ease",
  },
  "@keyframes spin": {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" },
  },
};

export default Artworks;