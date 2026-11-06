// frontend/src/components/footer/footer.jsx
import { NavLink } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import "./footer.css";

const COLUMNS = [
  {
    title: "Home",
    links: [
      ["Our Mission", "/home"],
      ["Our Vision", "/home"],
      ["Our Belief", "/home"],
    ]
  },
  {
    title: "About Us",
    links: [
      ["Our Pastors", "/about-us"],
      ["Our Beliefs", "/about-us"],
      ["Our Foundation", "/about-us"],
      ["FAQs", "/about-us"]
    ]
  },
  {
    title: "Media",
    links: [
      ["Live Streams", "/media"],
      ["Sermons", "/media"],
      ["Praise & Worship", "/media"],
      ["Podcasts", "/media"]
    ]
  }
];

export default function Footer() {
  return (
    <footer className="ft-main">
      <div className="ft-top">
        <div className="ft-brand">
          <NavLink to="/home" className="ft-brand-head">
            <img src="/gagiwc_logo_white-text_transp-bg.png" alt="Gilgal AG International Worship Centre" />
            <span>
              <strong>Gilgal AG</strong>
              <small>International Worship Centre</small>
            </span>
          </NavLink>
          <p>A place where faith, hope, and love come together. Join us as we worship and grow in Christ.</p>
          <div className="ft-social" aria-label="Social media links">
            <a href="#" aria-label="Facebook">
              f
            </a>
            <a href="#" aria-label="Instagram">
              ig
            </a>
            <a href="#" aria-label="YouTube">
              yt
            </a>
          </div>
        </div>

        {COLUMNS.map((column) => (
          <div className="ft-column" key={column.title}>
            <h4>{column.title}</h4>
            {column.links.map(([label, path]) => (
              <NavLink key={label} to={path}>
                {label}
              </NavLink>
            ))}
          </div>
        ))}

        <div className="ft-contact">
          <h4>Contact</h4>
          <p>
            <MapPin size={14} /> Singasandra, Bangalore
          </p>
          <p>
            <Phone size={14} /> +91 9160472878
          </p>
          <p>
            <Mail size={14} /> info@gilgalagchurch.com
          </p>
        </div>

        <nav className="ft-events" aria-label="Quick links">
          <NavLink to="/events">Events</NavLink>
          <NavLink to="/gallery">Gallery</NavLink>
          <NavLink to="/donations">Give</NavLink>
        </nav>
      </div>

      <div className="ft-bottom">
        <span>© {new Date().getFullYear()} Gilgal AG International Worship Centre. All rights reserved.</span>
        <div>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
