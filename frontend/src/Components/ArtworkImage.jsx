import React, { useEffect, useState } from "react";

const ArtworkImage = ({ id, onClick }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8080/api/artwork/${id}`)
      .then((res) => res.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        setImageUrl(url);
      });
  }, [id]);

  return (
    <div 
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "12px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
        transition: "all 0.3s ease",
        transform: isHovered ? "scale(1.02)" : "scale(1)",
        cursor: "pointer",
        aspectRatio: "1/1",
        background: "linear-gradient(145deg, #f8f8f8, #ffffff)"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(imageUrl)}
    >
      <img
        src={imageUrl}
        alt="Artwork"
        style={{ 
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "transform 0.3s ease",
          transform: isHovered ? "scale(1.05)" : "scale(1)"
        }}
      />
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "30%",
        background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)",
        opacity: isHovered ? 1 : 0,
        transition: "opacity 0.3s ease"
      }} />
    </div>
  );
};

export default ArtworkImage;