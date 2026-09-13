import { useNavigate } from "react-router-dom";
import { imageUrl } from "../api";

export default function ItemCard({ item }) {
  const navigate = useNavigate();
  const img = imageUrl(item.image);

  return (
    <div className="item-card" onClick={() => navigate(`/items/${item._id}`)}>
      <div className="card-top">
        <span className={`badge ${item.type === "lost" ? "badge-lost" : "badge-found"}`}>
          {item.type === "lost" ? "Lost" : "Found"}
        </span>
        <span className="card-time">{new Date(item.created_at).toLocaleString()}</span>
      </div>

      <div className="item-card-inner">
        {img && <img src={img} alt={item.title} className="card-thumbnail" />}
        <div className="card-content">
          <div className="card-title">{item.title}</div>
          {item.description && <div className="card-desc">{item.description}</div>}
          {item.reporter_name && (
            <div className="card-reporter">
              {item.type === "lost" ? "Lost by" : "Found by"}: {item.reporter_name}
            </div>
          )}
        </div>
      </div>

      <div className="card-footer" style={{ marginTop: "12px" }}>
        <span className="card-location">📍 {item.location || "No location"}</span>
        <span className="card-link">View details →</span>
      </div>
    </div>
  );
}
