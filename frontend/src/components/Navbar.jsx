import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import logoLight from "../assets/logo-light.png"; // white text, for the transparent bar over the hero
import logoDark from "../assets/logo-dark.png"; // black text, for the white bar
import "./Navbar.css";

// A link with `children` gets a dropdown (opens on hover / keyboard focus on desktop,
// always listed under its parent in the mobile menu).
const NAV_LINKS = [
  { label: "Home", to: "/" },
  {
    label: "About Us",
    to: "/about",
    children: [
      { label: "Our Journey", to: "/about/journey" },
      //{ label: "Our Leadership Team", to: "/about/leadership" },
    ],
  },
  { label: "Media", to: "/media" },
  { label: "Gallery", to: "/gallery" },
  { label: "Events", to: "/events" },
  { label: "Contact", to: "/contact" },
  { label: "Give", to: "/give" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const closeMenu = () => setOpen(false);
  const solid = scrolled || open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <header className={`navbar ${solid ? "navbar--solid" : ""}`}>
      <nav className="navbar__inner" aria-label="Main navigation">
        <Link to="/" className="navbar__logo" onClick={closeMenu}>
          <img src={solid ? logoDark : logoLight} alt="Gilgal - Home" />
        </Link>

        <button
          type="button"
          className="navbar__toggle"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="navbar-menu"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>

        <ul
          id="navbar-menu"
          className={`navbar__menu ${open ? "navbar__menu--open" : ""}`}
        >
          {NAV_LINKS.map(({ label, to, children }) => (
            <li
              key={to}
              className={`navbar__item ${children ? "navbar__item--sub" : ""}`}
            >
              <NavLink
                to={to}
                end={to === "/"}
                className="navbar__link"
                onClick={closeMenu}
              >
                {label}
                {children && (
                  <ChevronDown
                    className="navbar__caret"
                    size={16}
                    strokeWidth={2.25}
                    aria-hidden="true"
                  />
                )}
              </NavLink>

              {children && (
                <ul className="navbar__submenu">
                  {children.map((child) => (
                    <li key={child.to}>
                      <NavLink
                        to={child.to}
                        className="navbar__sublink"
                        onClick={closeMenu}
                      >
                        {child.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}