import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getItem, deleteItem, imageUrl } from "../api";

export default function ItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);

  useEffect(() => {
    getItem(id).then(setItem);
  }, [id]);

  async function handleDelete() {
    await deleteItem(id);
    navigate("/");
  }

  if (!item) return <p style={{ color: "var(--text-muted)" }}>Loading...</p>;

  const img = imageUrl(item.image);

  return (
    <div>
      <div className="detail-card">

        {img && <img src={img} alt={item.title} className="detail-image" />}

        <div className="detail-header">
          <span className={`badge ${item.type === "lost" ? "badge-lost" : "badge-found"}`}>
            {item.type === "lost" ? "Lost" : "Found"}
          </span>
          {item.reporter_name && (
            <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>
              {item.type === "lost" ? "Lost by" : "Found by"}:{" "}
              <strong style={{ color: "var(--text)" }}>{item.reporter_name}</strong>
            </span>
          )}
        </div>

        <div className="detail-title">{item.title}</div>
        {item.description && <div className="detail-desc">{item.description}</div>}

        <div className="detail-meta">
          {item.location && <div className="detail-meta-row">📍 {item.location}</div>}
          <div className="detail-meta-row">🕐 {new Date(item.created_at).toLocaleString()}</div>
        </div>

        <hr className="detail-divider" />

        <div className="contact-box">
          <div className="contact-label">Contact Owner</div>
          <div className="contact-value">{item.contact}</div>
        </div>

        <div className="btn-group">
          <button className="btn btn-ghost" onClick={() => navigate("/")}>
            ← Back
          </button>
          <button className="btn btn-danger" onClick={handleDelete}>
            Delete Post
          </button>
        </div>

      </div>
    </div>
  );
}
