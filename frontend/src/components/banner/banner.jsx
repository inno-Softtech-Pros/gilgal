// frontend/src/components/banner/banner.jsx
import { useState } from "react";
import { X } from "lucide-react";
import "./banner.css";

export default function Banner({ children }) {
  const [dismissed, setDismissed] = useState(false);

  if (!children || dismissed) return null;

  return (
    <div className="banner">
      <div className="banner__content">{children}</div>
      <button type="button" className="banner__close" onClick={() => setDismissed(true)} aria-label="Close banner">
        <X size={18} />
      </button>
    </div>
  );
}
