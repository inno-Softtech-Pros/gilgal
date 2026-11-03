import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div style={{ minHeight: "60vh", display: "grid", placeItems: "center", textAlign: "center" }}>
      <div>
        <h1>Page not found</h1>
        <p>This page doesn't exist yet.</p>
        <Link to="/">Back to home</Link>
      </div>
    </div>
  );
}