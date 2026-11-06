// frontend/src/components/header/header.jsx
import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { AuthProvider } from "../../context/auth.jsx";
import "./header.css";

// [label, path, optional dropdown items]
// Change "/our-journey" if your Journey page uses a different route.
const LINKS = [
  ["Home", "/home"],
  ["About Us", "/about-us", [["Our Journey", "/about-us/journey"]]],
  ["Events", "/events"],
  ["Media", "/media"],
  ["Gallery", "/gallery"],
  ["Contact", "/contact-us"],
];

function NavDropdown({ label, path, items, onNavigate }) {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  // The group is highlighted on the parent page and any dropdown page
  const groupActive = [path, ...items.map(([, to]) => to)].some(
    (to) => pathname === to || pathname.startsWith(`${to}/`)
  );

  // Close when clicking outside or pressing Esc
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const handleNavigate = (e) => {
    setOpen(false);
    e.currentTarget.blur(); // lets the hover menu close after a click
    onNavigate();
  };

  return (
    <div
      ref={wrapRef}
      className={`hd-dropdown ${open ? "is-open" : ""} ${groupActive ? "active" : ""}`}
    >
      <NavLink className="hd-nav-link" to={path} onClick={handleNavigate}>
        {label}
      </NavLink>
      <button
        type="button"
        className="hd-dropdown-toggle"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={`${label} menu`}
        onClick={() => setOpen((o) => !o)}
      >
        <ChevronDown size={14} strokeWidth={2.5} aria-hidden="true" />
      </button>

      <ul className="hd-dropdown-menu" role="menu">
        {items.map(([itemLabel, to]) => (
          <li key={to} role="none">
            <NavLink
              role="menuitem"
              className={({ isActive }) => (isActive ? "hd-dropdown-item active" : "hd-dropdown-item")}
              to={to}
              onClick={handleNavigate}
            >
              {itemLabel}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Header({ backgroundImage, title, subtitle }) {
  const { name, isAuthenticated, clearUser } = AuthProvider.useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignOut = async () => {
    const { signOut } = await import("aws-amplify/auth");
    clearUser();
    await signOut();
  };

  const closeMenu = () => setMenuOpen(false);

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
            {LINKS.map(([label, path, items]) =>
              items ? (
                <NavDropdown key={path} label={label} path={path} items={items} onNavigate={closeMenu} />
              ) : (
                <NavLink
                  key={path}
                  className={({ isActive }) => (isActive ? "hd-nav-link active" : "hd-nav-link")}
                  to={path}
                  onClick={closeMenu}
                >
                  {label}
                </NavLink>
              )
            )}
            <NavLink className="hd-give-button" to="/donations" onClick={closeMenu}>
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
            <NavLink className="hd-signin-button" to="/coming-soon" onClick={closeMenu}>
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