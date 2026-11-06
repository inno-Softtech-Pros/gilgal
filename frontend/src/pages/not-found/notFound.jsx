// frontend/src/pages/notFound.jsx
import { Link } from "react-router-dom";
import "./notFound.css";

export default function NotFound() {
  return (
    <section className="nf-page" aria-labelledby="not-found-title">
      <div className="nf-orbit nf-orbit-one" aria-hidden="true" />
      <div className="nf-orbit nf-orbit-two" aria-hidden="true" />
      <div className="nf-card">
        <p className="nf-code">404</p>
        <p className="nf-eyebrow">This path has wandered off</p>
        <h1 id="not-found-title">Page not found</h1>
        <p className="nf-copy">The page may have moved, or it may not exist yet. Let’s guide you back to familiar ground.</p>
        <div className="nf-actions">
          <Link className="nf-primary" to="/home">
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
