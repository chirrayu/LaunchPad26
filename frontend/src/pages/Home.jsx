import { useState, useEffect } from "react";
import { getItems } from "../api";
import ItemCard from "../components/ItemCard";

export default function Home() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getItems(search).then(setItems);
  }, [search]);

  return (
    <div>
      <h1 className="page-title">Board</h1>

      <div className="search-wrap">
        <span className="search-icon">🔍</span>
        <input
          className="search-input"
          type="text"
          placeholder='Search "AirPods", "wallet", "library"...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {items.length === 0 ? (
        <div className="empty-state">
          <div style={{ fontSize: "40px" }}>📭</div>
          <p>{search ? `No results for "${search}"` : "Nothing posted yet."}</p>
        </div>
      ) : (
        items.map((item) => <ItemCard key={item._id} item={item} />)
      )}
    </div>
  );
}
