import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import PostItem from "./pages/PostItem";
import ItemDetail from "./pages/ItemDetail";

export default function App() {
  return (
    <BrowserRouter>
      <nav className="navbar">
        <Link to="/" className="navbar-brand">🔍 Lost &amp; Found</Link>
        <Link to="/post" className="navbar-link">+ Post Item</Link>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post" element={<PostItem />} />
          <Route path="/items/:id" element={<ItemDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
