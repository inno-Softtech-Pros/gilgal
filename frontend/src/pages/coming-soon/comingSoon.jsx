// frontend/src/pages/comingSoon.jsx
import { Link } from "react-router-dom";
import "./comingSoon.css";

export default function ComingSoon({
  variant = "page",
  title = "Something beautiful is coming",
  description = "We’re preparing this part of the website and will share it here soon.",
  onClose
}) {
  const content = (
    <section
      className="cs-card"
      role={variant === "modal" ? "dialog" : undefined}
      aria-modal={variant === "modal" ? "true" : undefined}
      aria-labelledby="coming-soon-title"
    >
      {variant === "modal" && (
        <button className="cs-close" type="button" onClick={onClose} aria-label="Close coming soon message">
          ×
        </button>
      )}
      <div className="cs-mark" aria-hidden="true">
        <span className="cs-mark-ring" />
        <span className="cs-mark-clock">◷</span>
      </div>
      <p className="cs-eyebrow">In the works</p>
      <h1 id="coming-soon-title">{title}</h1>
      <p className="cs-description">{description}</p>
      <div className="cs-actions">
        <Link className="cs-primary" to="/home">
          Back to home
        </Link>
      </div>
    </section>
  );

  if (variant === "modal") {
    return (
      <div className="cs-modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose?.()}>
        {content}
      </div>
    );
  }

  return <main className="cs-page">{content}</main>;
}
