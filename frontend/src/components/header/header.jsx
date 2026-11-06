// frontend/src/components/header/header.jsx
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AuthProvider } from "../../context/auth.jsx";
import "./header.css";

const LINKS = [
  ["Home", "/home"],
  ["About Us", "/about-us"],
  ["Events", "/events"],
  ["Media", "/media"],
  ["Gallery", "/gallery"],
  ["Contact", "/contact-us"]
];

export default function Header({ backgroundImage, title, subtitle }) {
  const { name, isAuthenticated, clearUser } = AuthProvider.useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignOut = async () => {
    const { signOut } = await import("aws-amplify/auth");
    clearUser();
    await signOut();
  };

  return (
    <header className="hd-main" style={backgroundImage ? { "--hd-background-image": `url("${backgroundImage}")` } : undefined}>
      <div className="hd-overlay" />
      <div className="hd-container">
        <NavLink className="hd-logo-box" to="/home" aria-label="Gilgal AG home">
          <img className="hd-logo-img" src="/gagiwc_logo_white-text_transp-bg.png" alt="Gilgal AG International Worship Centre" />
        </NavLink>

        <button
          className="hd-menu-button"
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>

        <div className={`hd-topbar ${menuOpen ? "is-open" : ""}`}>
          <nav className={`hd-nav-list ${menuOpen ? "is-open" : ""}`} aria-label="Main navigation">
            {LINKS.map(([label, path]) => (
              <NavLink
                key={path}
                className={({ isActive }) => (isActive ? "hd-nav-link active" : "hd-nav-link")}
                to={path}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </NavLink>
            ))}
            <NavLink className="hd-give-button" to="/donations" onClick={() => setMenuOpen(false)}>
              Give
            </NavLink>
          </nav>

          {isAuthenticated ? (
            <div className="hd-auth">
              <span className="hd-user-name">{name}</span>
              <button type="button" className="hd-signout-button" onClick={handleSignOut}>
                Sign Out
              </button>
            </div>
          ) : (
            <NavLink className="hd-signin-button" to="/coming-soon" onClick={() => setMenuOpen(false)}>
              Sign In
            </NavLink>
          )}
        </div>

        <div className="hd-feature-copy" aria-hidden="true">
          {title && <span className="hd-eyebrow">Gilgal AG Church</span>}
          {title && <h1>{title}</h1>}
          {subtitle && <p className="hd-subtitle">{subtitle}</p>}
        </div>
      </div>
    </header>
  );
}
