import React, { useEffect, useState } from "react";
import axios from "axios";

const ProfileSection = () => {
  const [artist, setArtist] = useState({ id: "", name: "", about: "" });

  useEffect(() => {
    axios.get("http://localhost:8080/api/admin/profile").then((res) => {
      setArtist(res.data);
    });
  }, []);

  const handleUpdate = () => {
    axios.put("http://localhost:8080/api/admin/profile/update", artist).then(() => {
      alert("Profile updated successfully!");
    });
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      <label>Name: </label>
      <input
        type="text"
        value={artist.name}
        onChange={(e) => setArtist({ ...artist, name: e.target.value })}
      /><br /><br />
      <label>About: </label>
      <textarea
        value={artist.about}
        onChange={(e) => setArtist({ ...artist, about: e.target.value })}
      /><br /><br />
      <button onClick={handleUpdate}>Update Profile</button>
    </div>
  );
};

export default ProfileSection;