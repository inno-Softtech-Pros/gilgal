import { Link } from "react-router-dom";
import { ArrowDownCircle, MapPin, Phone } from "lucide-react";
import logo from "../../assets/logo-light.png";
import "./Footer.css";

const IMG = "/images/footer";

const FOOTER_COLUMNS = [
  {
    title: "Home",
    to: "/",
    links: ["Our Mission", "Our Vision", "Our Belief", "Events"],
  },
  {
    title: "About Us",
    to: "/about",
    links: ["Our Pastors", "Our Belief", "Our Doctrinal Foundation", "FAQs"],
  },
  {
    title: "Media",
    to: "/media",
    links: ["Live Stream", "Sermon", "Praise & Worship", "Podcast"],
  },
];

const QUICK_LINKS = [
  { label: "Give", to: "/give" },
  { label: "Events", to: "/events" },
  { label: "Gallery", to: "/gallery" },
];

// Small inline brand icons (Lucide no longer ships brand logos)
const SOCIALS = [
  {
    label: "Facebook",
    icon: (
      <path
        fill="currentColor"
        d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1z"
      />
    ),
  },
  {
    label: "Instagram",
    icon: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="4.5" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="3.6" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="17" cy="7" r="1.2" fill="currentColor" />
      </>
    ),
  },
  {
    label: "YouTube",
    icon: (
      <>
        <rect x="3" y="6" width="18" height="12" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M10 9.5v5l4.5-2.5z" fill="currentColor" />
      </>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="gf">
      <div className="gf__top">
        <div className="gf__inner">
          <div className="gf__brand">
            <div className="gf__logo">
              <img src={logo} alt="" />
              <div>
                <strong>Gilgal AG</strong>
                <span>International Worship Center</span>
              </div>
            </div>
            <p>
              A place where faith, hope, and love come together: Experience the
              power of the Holy Spirit in worship and fellowship.
            </p>
            <div className="gf__social">
              {/* Replace the # with the real social links */}
              {SOCIALS.map(({ label, icon }) => (
                <a key={label} href="#" aria-label={label}>
                  <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
                    {icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {FOOTER_COLUMNS.map(({ title, to, links }) => (
            <div key={title} className="gf__col">
              <h4><Link to={to}>{title}</Link></h4>
              <ul>
                {links.map((label) => (
                  <li key={label}>
                    {/* Point these at real sections/routes later */}
                    <Link to={to}>{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="gf__col gf__contact">
            <h4>Contact</h4>
            <p>
              <MapPin size={22} strokeWidth={1.75} aria-hidden="true" />
              <span>
                Building No. 3 and 4, lake,
                <br />
                168/13, Hosur Rd, behind
                <br />
                Dakshin Honda Showroom, Hal
                <br />
                Layout, Singasandra,
                <br />
                Bengaluru, Karnataka, 560068
              </span>
            </p>
            <p>
              <Phone size={22} strokeWidth={1.75} aria-hidden="true" />
              <span>
                +91 - 9880077023 /
                <br />
                +91 - 9844072577
              </span>
            </p>
          </div>

          <ul className="gf__quick">
            {QUICK_LINKS.map(({ label, to }) => (
              <li key={to}><Link to={to}>{label}</Link></li>
            ))}
          </ul>
        </div>

        {/* App download card, overlaps the bottom edge of the photo */}
        <div className="gf__app">
          <div className="gf__app-info">
            <img
              className="gf__app-icon"
              src={`${IMG}/app-icon.png`}
              alt="OurChurchLink app icon"
            />
            <div>
              <h3>Get OurChurchLink App</h3>
              <p>
                Stay connected with sermons, real-time prayer chat, updates and
                more.
              </p>
            </div>
          </div>
          <span className="gf__app-divider" aria-hidden="true" />
          <div className="gf__app-download">
            <p>
              <ArrowDownCircle size={22} strokeWidth={1.75} aria-hidden="true" />
              Download Now
            </p>
            <div className="gf__app-badges">
              {/* Replace the # with the real store links */}
              <a href="#" aria-label="Download on the App Store">
                <img src={`${IMG}/footer-app-store.png`} alt="" />
              </a>
              <a href="#" aria-label="Get it on Google Play">
                <img src={`${IMG}/footer-google-play.png`} alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="gf__bottom">
        <div className="gf__bottom-inner">
          <span>©2026 Gilgal AG International Worship Center. All rights reserved.</span>
          <span>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}