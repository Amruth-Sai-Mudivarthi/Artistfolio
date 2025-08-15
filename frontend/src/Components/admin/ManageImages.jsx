import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageImages = () => {
  const [artworks, setArtworks] = useState([]);
  const [newImage, setNewImage] = useState(null); // For new artwork upload

  // State variables for adding new artwork
  const [artName, setArtName] = useState("");
  const [artDescription, setArtDescription] = useState("");
  const [artType, setArtType] = useState("");
  const [cost, setCost] = useState("");

  // State variables for updating existing artwork
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [currentArtwork, setCurrentArtwork] = useState(null); // Stores the artwork object being edited
  const [updatedArtName, setUpdatedArtName] = useState("");
  const [updatedArtDescription, setUpdatedArtDescription] = useState("");
  const [updatedArtType, setUpdatedArtType] = useState("");
  const [updatedCost, setUpdatedCost] = useState("");
  const [updatedImage, setUpdatedImage] = useState(null); // For updating the image

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = () => {
    axios.get("http://localhost:8080/api/artworks").then((res) => {
      setArtworks(res.data);
    });
  };

  const handleUpload = () => {
    if (!newImage || !artName || !artDescription || !artType || !cost) {
      alert("Please fill in all fields and select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", newImage);

    const artworkDetails = {
      artName: artName,
      artDescription: artDescription,
      artType: artType,
      cost: parseFloat(cost),
    };

    formData.append("artwork", new Blob([JSON.stringify(artworkDetails)], {
      type: "application/json"
    }));

    axios
      .post("http://localhost:8080/api/admin/artwork", formData)
      .then(() => {
        alert("Artwork uploaded successfully!");
        setNewImage(null);
        setArtName("");
        setArtDescription("");
        setArtType("");
        setCost("");
        document.getElementById("imageUploadInput").value = "";
        fetchImages();
      })
      .catch((error) => {
        console.error("Error uploading artwork:", error);
        alert("Failed to upload artwork. Please try again.");
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/api/admin/artwork/${id}`)
      .then(() => {
        alert("Artwork deleted!");
        fetchImages();
      })
      .catch((error) => {
        console.error("Error deleting artwork:", error);
        alert("Failed to delete artwork. Please try again.");
      });
  };

  // --- NEW / MODIFIED UPDATE LOGIC ---

  const handleUpdateClick = (artworkToUpdate) => {
    setCurrentArtwork(artworkToUpdate);
    setUpdatedArtName(artworkToUpdate.artName);
    setUpdatedArtDescription(artworkToUpdate.artDescription);
    setUpdatedArtType(artworkToUpdate.artType);
    setUpdatedCost(artworkToUpdate.cost);
    setUpdatedImage(null); // Clear any previously selected image for update
    setShowUpdateModal(true);
  };

  const handleSaveUpdate = () => {
    if (!currentArtwork) return; // Should not happen if modal is open correctly

    // Basic validation for updated fields (adjust as needed)
    if (!updatedArtName || !updatedArtDescription || !updatedArtType || !updatedCost) {
      alert("Please fill in all fields for the update.");
      return;
    }

    const formData = new FormData();

    // Only append image if a new one is selected
    if (updatedImage) {
      formData.append("image", updatedImage);
    }

    const updatedArtworkDetails = {
      // Send the ID so the backend knows which artwork to update
      id: currentArtwork.id,
      artName: updatedArtName,
      artDescription: updatedArtDescription,
      artType: updatedArtType,
      cost: parseFloat(updatedCost),
      // Backend will handle imageName, imageType, imageData from the 'image' part
      // or retain old ones if no new image is provided.
    };

    formData.append("artwork", new Blob([JSON.stringify(updatedArtworkDetails)], {
      type: "application/json"
    }));

    axios
      .put(`http://localhost:8080/api/admin/artwork/${currentArtwork.id}`, formData)
      .then(() => {
        alert("Artwork updated successfully!");
        setShowUpdateModal(false); // Close modal
        fetchImages(); // Refresh artwork list
      })
      .catch((error) => {
        console.error("Error updating artwork:", error);
        alert("Failed to update artwork. Please try again.");
      });
  };

  const handleCloseModal = () => {
    setShowUpdateModal(false);
    setCurrentArtwork(null); // Clear current artwork on close
  };

  // --- END NEW / MODIFIED UPDATE LOGIC ---


  return (
    <div>
      <h2>Manage Artworks</h2>

      <div>
        <h3>Upload New Artwork</h3>
        <input
          type="file"
          id="imageUploadInput"
          onChange={(e) => setNewImage(e.target.files[0])}
        />
        <br />
        <input
          type="text"
          placeholder="Art Name"
          value={artName}
          onChange={(e) => setArtName(e.target.value)}
          style={styles.inputField}
        />
        <input
          type="text"
          placeholder="Art Description"
          value={artDescription}
          onChange={(e) => setArtDescription(e.target.value)}
          style={styles.inputField}
        />
        <input
          type="text"
          placeholder="Art Type"
          value={artType}
          onChange={(e) => setArtType(e.target.value)}
          style={styles.inputField}
        />
        <input
          type="number"
          placeholder="Cost"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          style={styles.inputField}
        />
        <button onClick={handleUpload} style={styles.uploadButton}>
          Upload Artwork
        </button>
      </div>

      <hr style={styles.separator} />

      <h3>Existing Artworks</h3>
      <div style={styles.gallery}>
        {artworks.map((art) => (
          <div key={art.id} style={styles.card}>
            <img
              src={`data:${art.imageType};base64,${art.imageData}`}
              alt={art.artName || "Artwork"}
              style={styles.image}
            />
            <p>
              <strong>Name:</strong> {art.artName}
            </p>
            <p>
              <strong>Type:</strong> {art.artType}
            </p>
            <p>
              <strong>Description:</strong> {art.artDescription}
            </p>
            <p>
              <strong>Cost:</strong> ₹{art.cost ? parseFloat(art.cost).toFixed(2) : "N/A"}
            </p>
            <button onClick={() => handleDelete(art.id)} style={styles.deleteButton}>
              Delete
            </button>{" "}
            {/* Changed onClick to handleUpdateClick */}
            <button onClick={() => handleUpdateClick(art)} style={styles.updateButton}>
              Update Artwork
            </button>
          </div>
        ))}
      </div>

      {/* --- Update Modal JSX --- */}
      {showUpdateModal && currentArtwork && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3>Update Artwork (ID: {currentArtwork.id})</h3>
            <input
              type="text"
              placeholder="Art Name"
              value={updatedArtName}
              onChange={(e) => setUpdatedArtName(e.target.value)}
              style={styles.inputField}
            />
            <input
              type="text"
              placeholder="Art Description"
              value={updatedArtDescription}
              onChange={(e) => setUpdatedArtDescription(e.target.value)}
              style={styles.inputField}
            />
            <input
              type="text"
              placeholder="Art Type"
              value={updatedArtType}
              onChange={(e) => setUpdatedArtType(e.target.value)}
              style={styles.inputField}
            />
            <input
              type="number"
              placeholder="Cost"
              value={updatedCost}
              onChange={(e) => setUpdatedCost(e.target.value)}
              style={styles.inputField}
            />
            <input
              type="file"
              onChange={(e) => setUpdatedImage(e.target.files[0])}
              style={{ ...styles.inputField, border: "none" }}
            />
            <p style={{ fontSize: '0.9em', color: '#666' }}>
                {updatedImage ? `New image selected: ${updatedImage.name}` : "Select new image (optional)"}
            </p>
            <div style={styles.modalActions}>
              <button onClick={handleSaveUpdate} style={styles.uploadButton}>
                Save Changes
              </button>
              <button onClick={handleCloseModal} style={styles.deleteButton}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  gallery: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    marginTop: "20px",
    justifyContent: "center",
  },
  card: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "15px",
    width: "250px",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    maxHeight: "180px",
    objectFit: "cover",
    borderRadius: "6px",
    marginBottom: "10px",
  },
  inputField: {
    display: "block",
    width: "calc(100% - 22px)",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "4px",
    border: "1px solid #ddd",
  },
  uploadButton: {
    backgroundColor: "#28a745",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
    fontWeight: "bold",
    marginRight: "10px", // Added for spacing in modal
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    color: "white",
    padding: "8px 15px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "5px",
  },
  updateButton: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "8px 15px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  separator: {
    margin: "30px 0",
    border: "0",
    borderTop: "1px solid #eee",
  },
  // Modal styles
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
    width: "400px",
    maxWidth: "90%",
    position: "relative",
  },
  modalActions: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "flex-end", // Align buttons to the right
  }
};

export default ManageImages;