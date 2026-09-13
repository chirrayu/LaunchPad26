import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createItem } from "../api";

export default function PostItem() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    type: "lost",
    reporter_name: "",
    title: "",
    description: "",
    location: "",
    contact: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  function removeImage() {
    setImageFile(null);
    setImagePreview("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await createItem(form, imageFile);
    navigate("/");
  }

  return (
    <div>
      <h1 className="page-title">Post an Item</h1>

      <div className="form-card">
        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label className="form-label">Type <span className="required-star">*</span></label>
            <div className="type-toggle">
              <button
                type="button"
                className={`type-btn ${form.type === "lost" ? "active-lost" : ""}`}
                onClick={() => setForm({ ...form, type: "lost" })}
              >
                🔴 Lost
              </button>
              <button
                type="button"
                className={`type-btn ${form.type === "found" ? "active-found" : ""}`}
                onClick={() => setForm({ ...form, type: "found" })}
              >
                🟢 Found
              </button>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              Your Name <span className="required-star">*</span>
            </label>
            <input
              className="form-input"
              name="reporter_name"
              placeholder={form.type === "lost" ? "Who lost it?" : "Who found it?"}
              value={form.reporter_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Item Name <span className="required-star">*</span>
            </label>
            <input
              className="form-input"
              name="title"
              placeholder="e.g. AirPods, Blue Water Bottle"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <input
              className="form-input"
              name="description"
              placeholder="Color, brand, any identifying details"
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Location</label>
            <input
              className="form-input"
              name="location"
              placeholder="e.g. Near Library, Ground Floor Canteen"
              value={form.location}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Image</label>
            {imagePreview ? (
              <div className="image-preview-wrap">
                <img src={imagePreview} alt="preview" className="image-preview" />
                <button type="button" className="image-remove-btn" onClick={removeImage}>✕</button>
              </div>
            ) : (
              <div className="image-upload-area">
                <input type="file" accept="image/*" onChange={handleImageChange} />
                <div className="upload-icon">📷</div>
                <div className="upload-text">
                  <span>Click to upload</span> or drag &amp; drop
                </div>
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">
              Contact Info <span className="required-star">*</span>
            </label>
            <input
              className="form-input"
              name="contact"
              placeholder="Phone number or email"
              value={form.contact}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Post Item
          </button>

        </form>
      </div>
    </div>
  );
}
