// // Frameworks & Libraries

// Pages & Components

// Styling
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export const UserProfile = () => {
  const [profile, setProfile] = useState({
    name: "Jane Doe",
    email: "jane@example.com",
    bio: "Software engineer. Coffee enthusiast. Avid reader.",
    image: "https://via.placeholder.com/150",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProfile(formData);
    setIsEditing(false);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-3">
            <div className="text-center">
              <img
                src={profile.image}
                alt="Profile"
                className="rounded-circle mb-3"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
              <h4>{profile.name}</h4>
              <p className="text-muted">{profile.email}</p>
              <p>{profile.bio}</p>
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? "Cancel" : "Edit Profile"}
              </button>
            </div>

            {isEditing && (
              <form onSubmit={handleSubmit} className="mt-3">
                <div className="mb-2">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Name"
                    required
                  />
                </div>
                <div className="mb-2">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Email"
                    required
                  />
                </div>
                <div className="mb-2">
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    className="form-control"
                    rows="3"
                    placeholder="Bio"
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Save Changes
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
