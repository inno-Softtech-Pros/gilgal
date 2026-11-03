import { useEffect, useRef, useState } from "react";
import "./home.css";

/* ---------- Image paths (put these files in /public/images) ---------- */
const IMG = {
  logo: "/images/logo.png",
  hero: "/images/hero.jpg",
  intro1: "/images/intro-1.jpg",
  intro2: "/images/intro-2.jpg",
  pastor: "/images/pastor.jpg",
  phone: "/images/app-phone.png",
  appStore: "/images/app-store.png",
  playStore: "/images/google-play.png",
};

/* ---------- Static data ---------- */
const NAV_LINKS = ["Home", "About Us", "Media", "Gallery", "Events", "Contact", "Give"];

const INFO = [
  { icon: "🕘", title: "Sunday Service", text: "9:00 AM - 11:00 AM" },
  { icon: "📍", title: "Location", text: "Singasandra, Bangalore" },
  { icon: "👥", title: "Join Our Community", text: "All Are Welcome" },
];

const QUICK_CARDS = [
  { icon: "📖", title: "Daily Devotion", text: "Read Today", tone: "pink" },
  { icon: "✨", title: "Motivation", text: "Get Inspired", tone: "blue" },
  { icon: "📜", title: "Scripture", text: "Explore Word", tone: "green" },
];

const BELIEFS = [
  {
    title: "Our Mission",
    tone: "purple",
    text: "To glorify God by making disciples of Jesus Christ who are equipped to live out their faith and serve others with love and compassion.",
  },
  {
    title: "Our Vision",
    tone: "teal",
    text: "To be a church where everyone can find hope, healing, and home. A place where lives are transformed by God's grace and people are empowered to make a difference.",
  },
  {
    title: "Our Belief",
    tone: "olive",
    text: "We believe in the Bible as God's inspired Word, salvation through Jesus Christ alone, and the power of the Holy Spirit to transform lives and communities.",
  },
];

const EXPECT = [
  {
    icon: "🫂",
    text: "Come as you are! We have a relaxed, welcoming environment where you can feel comfortable being yourself.",
  },
  {
    icon: "🙌",
    text: "Our worship is contemporary and heartfelt, designed to help you connect with God in a meaningful way.",
  },
  {
    icon: "✝️",
    text: "Messages that apply biblical truth to everyday living, helping you grow in your faith and relationship with God.",
  },
];

// Add a youtubeId to show a video, leave it empty for a placeholder card
const SERMONS = [{ youtubeId: "" }, { youtubeId: "" }, { youtubeId: "" }];

const EVENTS = [
  {
    date: "Sunday, May 11",
    title: "Mother's Day Celebration",
    text: "Special service honoring mothers",
    img: "/images/event-1.jpg",
  },
  {
    date: "Friday, May 16",
    title: "Youth Night",
    text: "Fun activities and worship for teens",
    img: "/images/event-2.jpg",
  },
  {
    date: "Saturday, May 24",
    title: "Community Outreach",
    text: "Serving our local neighborhood",
    img: "",
  },
];

const FOOTER_COLS = [
  { title: "Home", links: ["Our Mission", "Our Vision", "Our Belief", "Events"] },
  { title: "About Us", links: ["Our Pastors", "Our Belief", "Our Doctrinal Foundation", "FAQs"] },
  { title: "Media", links: ["Live Stream", "Sermon", "Praise & Worship", "Podcast"] },
];

/* ---------- Hooks ---------- */

// Adds the "is-visible" class when an element scrolls into view
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.classList.add("is-visible");
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

// Wrapper that animates any card when it enters the viewport
function Reveal({ as: Tag = "div", delay = 0, className = "", children, ...rest }) {
  const ref = useReveal();
  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// Time left until the next Sunday service at 9:00 AM
function getNextService() {
  const now = new Date();
  const next = new Date(now);
  next.setHours(9, 0, 0, 0);
  const daysToSunday = (7 - now.getDay()) % 7;
  next.setDate(now.getDate() + daysToSunday);
  if (next <= now) next.setDate(next.getDate() + 7);
  return next;
}

function useCountdown() {
  const calc = () => {
    const diff = Math.max(0, getNextService() - new Date());
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff / 3600000) % 24),
      mins: Math.floor((diff / 60000) % 60),
      secs: Math.floor((diff / 1000) % 60),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

const pad = (n) => String(n).padStart(2, "0");

/* ---------- Page ---------- */
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const time = useCountdown();

  return (
    <div className="home">
      {/* ===== Hero + navbar ===== */}
      <header className="hero" style={{ backgroundImage: `url(${IMG.hero})` }}>
        <nav className="nav">
          <a href="/" className="nav__logo">
            <img src={IMG.logo} alt="Gilgal AG logo" />
          </a>
          <button
            className={`nav__toggle ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
          <ul className={`nav__links ${menuOpen ? "open" : ""}`}>
            {NAV_LINKS.map((l) => (
              <li key={l}>
                <a href={l === "Home" ? "/" : `/${l.toLowerCase().replace(/\s+/g, "-")}`}>{l}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hero__content">
          <h1>Welcome to Gilgal AG Church</h1>
          <a href="/contact" className="btn btn--gold">
            VISIT US
          </a>
        </div>
        <a href="#info" className="hero__scroll" aria-label="Scroll down" />
      </header>

      {/* ===== Info strip ===== */}
      <Reveal as="section" id="info" className="info-strip">
        {INFO.map((i) => (
          <div className="info-strip__item" key={i.title}>
            <span className="info-strip__icon">{i.icon}</span>
            <div>
              <strong>{i.title}</strong>
              <small>{i.text}</small>
            </div>
          </div>
        ))}
      </Reveal>

      {/* ===== Intro ===== */}
      <section className="intro">
        <Reveal as="img" className="intro__img intro__img--left reveal--left" src={IMG.intro1} alt="Members in conversation" />
        <Reveal as="img" className="intro__img intro__img--right reveal--right" src={IMG.intro2} alt="Open Bible" />

        <Reveal className="intro__text">
          <h2>Let's Grow in Faith Together</h2>
          <p>
            Gilgal AG is a Spirit-filled community in the heart of Bangalore, where you can
            experience the power of God's love. Join us on a transformative journey of faith,
            fellowship, and spiritual growth as we embrace the Holy Spirit's guidance and the
            timeless truth of God's Word.
          </p>
        </Reveal>

        <div className="intro__cards">
          {QUICK_CARDS.map((c, i) => (
            <Reveal as="a" href="#" key={c.title} delay={i * 120} className={`quick-card tone-${c.tone}`}>
              <span className="quick-card__icon">{c.icon}</span>
              <strong>{c.title}</strong>
              <small>{c.text}</small>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== Pastor message ===== */}
      <section className="pastor">
        <Reveal className="pastor__photo reveal--left">
          <img src={IMG.pastor} alt="Pr. Denny Sam" />
        </Reveal>
        <Reveal className="pastor__text reveal--right" delay={150}>
          <h2>
            Message from
            <br />
            Our Pastor
          </h2>
          <p>
            Welcome to Gilgal AG! I'm so glad you're here visiting our website. Whether you're
            searching for a church home, or simply curious, I believe it's not by accident that
            you've landed here. We opened our home in Bangalore as a place of worship in 1996.
            Since then, the Holy Spirit has faithfully led us in establishing Gilgal AG Church.
          </p>
          <p>
            What began with just five believers baptized in November 1996 has grown steadily over
            the years. Today, we gather every Sunday for worship at Singasandra, led and empowered
            by the Holy Spirit. Our heart is to see lives transformed by the Gospel of Jesus Christ
            and to build a community where everyone feels welcomed and loved as they grow in their
            faith. We believe God is moving powerfully today, and we would love for you to join us
            on this journey.
          </p>
          <p className="pastor__name">Pr. Denny Sam</p>
        </Reveal>
      </section>

      {/* ===== What we stand for ===== */}
      <section className="section">
        <Reveal as="h2" className="section__title">What we Stand for</Reveal>
        <div className="grid grid--3">
          {BELIEFS.map((b, i) => (
            <Reveal key={b.title} delay={i * 120} className={`belief-card tone-${b.tone}`}>
              <p>{b.text}</p>
              <h3>{b.title}</h3>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== What to expect ===== */}
      <section className="expect">
        <Reveal as="h2" className="section__title">What to Expect</Reveal>
        <div className="grid grid--3">
          {EXPECT.map((e, i) => (
            <Reveal key={i} delay={i * 120} className="expect__item">
              <span className="expect__icon">{e.icon}</span>
              <p>{e.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== App promo ===== */}
      <section className="app">
        <Reveal className="app__text">
          <span className="app__eyebrow">GILGAL AG CHURCH PRESENTS</span>
          <h2>
            Experience faith at your fingertips: Introducing{" "}
            <em>OurChurchLink App!</em>
          </h2>
          <p>
            Stay spiritually anchored wherever life takes you. Experience uninterrupted connection
            to Gilgal AG: stream live services with real-time prayer chat, receive dawn devotion,
            also access pastor sermon notes offline anytime.
          </p>
          <div className="app__download">
            <span>DOWNLOAD NOW</span>
            <a href="#" aria-label="Download on the App Store">
              <img src={IMG.appStore} alt="App Store" />
            </a>
            <a href="#" aria-label="Get it on Google Play">
              <img src={IMG.playStore} alt="Google Play" />
            </a>
          </div>
        </Reveal>
        <Reveal className="app__phone" delay={150}>
          <div className="app__circle" />
          <img src={IMG.phone} alt="OurChurchLink app preview" />
        </Reveal>
      </section>

      {/* ===== Sermons ===== */}
      <section className="section">
        <Reveal as="h2" className="section__title">Watch our latest Sermons</Reveal>
        <div className="grid grid--3">
          {SERMONS.map((s, i) => (
            <Reveal key={i} delay={i * 120} className="sermon-card">
              {s.youtubeId && (
                <iframe
                  src={`https://www.youtube.com/embed/${s.youtubeId}`}
                  title={`Sermon ${i + 1}`}
                  allowFullScreen
                  loading="lazy"
                />
              )}
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== Countdown ===== */}
      <section className="section countdown">
        <Reveal as="h2" className="section__title">Don't miss the next Service</Reveal>
        <Reveal className="countdown__row reveal--zoom" role="timer" aria-live="off">
          {[
            ["DAYS", time.days],
            ["HRS", time.hours],
            ["MINS", time.mins],
            ["SECS", time.secs],
          ].map(([label, value], i) => (
            <div className="countdown__unit" key={label}>
              {i > 0 && <span className="countdown__colon">:</span>}
              <div>
                <strong>{pad(value)}</strong>
                <small>{label}</small>
              </div>
            </div>
          ))}
        </Reveal>
      </section>

      {/* ===== Upcoming events ===== */}
      <section className="events">
        <Reveal className="events__intro reveal--left">
          <h2>Upcoming Events</h2>
          <p>Mark your calenders</p>
          <a href="/events" className="btn btn--gold btn--small">
            VIEW ALL EVENTS →
          </a>
        </Reveal>
        <div className="events__list">
          {EVENTS.map((e, i) => (
            <Reveal key={e.title} delay={i * 120} className="event-card">
              <div className="event-card__img">
                {e.img ? <img src={e.img} alt={e.title} /> : <div className="event-card__empty" />}
              </div>
              <small className="event-card__date">{e.date}</small>
              <h3>{e.title}</h3>
              <p>{e.text}</p>
              <a href="/events" className="event-card__link">
                VIEW DETAILS ↗
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="footer">
        <div className="footer__top">
          <div className="footer__brand">
            <div className="footer__brand-head">
              <img src={IMG.logo} alt="Gilgal AG logo" />
              <div>
                <strong>Gilgal AG</strong>
                <small>International Worship Center</small>
              </div>
            </div>
            <p>
              A place where faith, hope, and love come together. Experience the power of the Holy
              Spirit in worship and fellowship.
            </p>
            <div className="footer__social">
              <a href="#" aria-label="Facebook">f</a>
              <a href="#" aria-label="Instagram">◎</a>
              <a href="#" aria-label="YouTube">▶</a>
            </div>
          </div>

          {FOOTER_COLS.map((col) => (
            <div className="footer__col" key={col.title}>
              <h4>{col.title}</h4>
              <ul>
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="footer__col footer__contact">
            <h4>Contact</h4>
            <p>
              📍 Building No. 3 and 4, loke, 168/13, Hosur Rd, behind Dakshin Honda Showroom, Hal
              Layout, Singasandra, Bengaluru, Karnataka, 560068
            </p>
            <p>📞 +91 - 9880077023 / +91 - 9844072577</p>
          </div>

          <div className="footer__col footer__quick">
            <a href="/give">Give</a>
            <a href="/events">Events</a>
            <a href="/gallery">Gallery</a>
          </div>
        </div>

        <div className="footer__bottom">
          <small>©2026 Gilgal AG International Worship Center. All rights reserved.</small>
          <div>
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms-of-service">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
