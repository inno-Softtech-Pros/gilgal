import { useEffect, useRef, useState } from "react";
import "../home/home.css";// navbar + footer styles live here
import "./media.css";

/* ---------- Config ---------- */
const API_URL = import.meta.env.VITE_API_URL; // CRA: process.env.REACT_APP_API_URL
const CHURCH_ID = import.meta.env.VITE_CHURCH_ID; // CRA: process.env.REACT_APP_CHURCH_ID
const PAGE_SIZE = 9;
const DEFAULT_SPEAKER = "Rev. Denny Sam"; // used until the API returns a speaker field
const CHANNEL_NAME = "Gilgal AG International Worship Centre";

const IMG = {
  logo: "/images/logo.png",
  hero: "/images/media-hero.jpg",
};

const NAV_LINKS = ["Home", "About Us", "Media", "Gallery", "Events", "Contact", "Give"];

const FOOTER_COLS = [
  { title: "Home", links: ["Our Mission", "Our Vision", "Our Belief", "Events"] },
  { title: "About Us", links: ["Our Pastors", "Our Belief", "Our Doctrinal Foundation", "FAQs"] },
  { title: "Media", links: ["Live Stream", "Sermon", "Praise & Worship", "Podcast"] },
];

// path = endpoint on your backend; tabs without a path show "coming soon"
const TABS = [
  { key: "live", label: "Live Stream" },
  { key: "sermons", label: "Sermons", path: "latest", kicker: "Latest message", noun: "sermons" },
  { key: "music", label: "Praise & Worship", path: "music/latest", kicker: "Latest worship", noun: "songs" },
  { key: "podcast", label: "Podcast" },
];

/* ---------- Helpers ---------- */
const pad = (n) => String(n).padStart(2, "0");

// "PT1H2M38S" -> "1:02:38", "PT53M38S" -> "53:38"
const formatDuration = (iso) => {
  const m = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/.exec(iso || "");
  if (!m) return "";
  const [h, min, s] = [m[1] || 0, m[2] || 0, m[3] || 0].map(Number);
  return h ? `${h}:${pad(min)}:${pad(s)}` : `${min}:${pad(s)}`;
};

const formatDate = (iso) =>
  iso
    ? new Date(iso).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })
    : "";

const unique = (list) => [...new Set(list.filter(Boolean))].sort();

// [1, 2, 3, "…", 12] style page list
function getPages(current, total) {
  const wanted = new Set([1, 2, 3, total, current - 1, current, current + 1]);
  const nums = [...wanted].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b);
  const out = [];
  nums.forEach((n, i) => {
    if (i > 0 && n - nums[i - 1] > 1) out.push("…");
    out.push(n);
  });
  return out;
}

/* ---------- Data hook ---------- */
function useMedia(path, reloadKey) {
  const [state, setState] = useState({ items: [], status: "loading" });

  useEffect(() => {
    const controller = new AbortController();
    setState({ items: [], status: "loading" });

    fetch(`${API_URL}/sermons/${CHURCH_ID}/${path}?limit=50`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .then(({ data }) => setState({ items: data || [], status: "ready" }))
      .catch((err) => {
        if (err.name !== "AbortError") setState({ items: [], status: "error" });
      });

    return () => controller.abort();
  }, [path, reloadKey]);

  return state;
}

/* ---------- Icons ---------- */
const PlayIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <path d="M10 8l6 4-6 4V8z" fill="currentColor" stroke="none" />
  </svg>
);
const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-3.5-3.5" />
  </svg>
);
const LinkIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" />
    <path d="M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" />
  </svg>
);

/* ---------- Cards ---------- */
function Thumb({ item, onPlay, children }) {
  return (
    <button type="button" className="sm-thumb" onClick={() => onPlay(item)} aria-label={`Play ${item.title}`}>
      {item.thumbnail && <img src={item.thumbnail} alt="" loading="lazy" />}
      {children}
    </button>
  );
}

function FeaturedCard({ item, tab, onPlay }) {
  return (
    <article className="sm-feature">
      <Thumb item={item} onPlay={onPlay} />
      <div className="sm-feature__body">
        <p className="sm-feature__kicker">{tab.kicker}</p>
        <h2>{item.title}</h2>
        {item.description && <p className="sm-feature__desc">{item.description}</p>}
        <div className="sm-channel">
          <img src={IMG.logo} alt="" />
          <div>
            <strong>{CHANNEL_NAME}</strong>
            <small>{formatDate(item.date)}</small>
          </div>
        </div>
        <div className="sm-feature__actions">
          <button type="button" className="sm-btn" onClick={() => onPlay(item)}>
            <PlayIcon /> Watch Now
          </button>
          {item.notesUrl && (
            <a className="sm-notes" href={item.notesUrl} target="_blank" rel="noopener noreferrer">
              Sermon Notes (PDF)
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function MediaCard({ item, onPlay, onCopy }) {
  return (
    <article className="sm-card">
      <Thumb item={item} onPlay={onPlay}>
        {item.duration && <span className="sm-duration">{formatDuration(item.duration)}</span>}
      </Thumb>
      <div className="sm-card__body">
        <h3>{item.title}</h3>
        <div className="sm-meta">
          <span>{item.speaker || DEFAULT_SPEAKER}</span>
          <span>{formatDate(item.date)}</span>
        </div>
        <div className="sm-actions">
          <button type="button" className="sm-btn" onClick={() => onPlay(item)}>
            <PlayIcon /> Watch Video
          </button>
          <button
            type="button"
            className="sm-icon-btn"
            onClick={() => onCopy(item.videoUrl)}
            aria-label={`Copy link to ${item.title}`}
            title="Copy link"
          >
            <LinkIcon />
          </button>
        </div>
      </div>
    </article>
  );
}

/* ---------- List for one tab ---------- */
function MediaList({ tab }) {
  const [reloadKey, setReloadKey] = useState(0);
  const { items, status } = useMedia(tab.path, reloadKey);

  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({ topic: "", speaker: "", series: "" });
  const [page, setPage] = useState(1);
  const [playing, setPlaying] = useState(null);
  const [toast, setToast] = useState("");
  const gridRef = useRef(null);

  // The newest item is featured at the top, the rest go in the grid
  const featured = items[0];
  const rest = items.slice(1);

  const q = query.trim().toLowerCase();
  const filtered = rest.filter(
    (i) =>
      (!q || `${i.title} ${i.description || ""}`.toLowerCase().includes(q)) &&
      (!filters.topic || i.topic === filters.topic) &&
      (!filters.speaker || i.speaker === filters.speaker) &&
      (!filters.series || i.series === filters.series)
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const pageItems = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  // Dropdowns only appear once the API sends topic / speaker / series values
  const dropdowns = [
    { key: "topic", label: "Topic", options: unique(rest.map((i) => i.topic)) },
    { key: "speaker", label: "Speaker", options: unique(rest.map((i) => i.speaker)) },
    { key: "series", label: "Series", options: unique(rest.map((i) => i.series)) },
  ].filter((d) => d.options.length > 0);

  const goTo = (n) => {
    setPage(n);
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const play = (item) => {
    if (item.id) setPlaying(item);
    else window.open(item.videoUrl, "_blank", "noopener");
  };

  const copyLink = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      setToast("Link copied");
    } catch {
      setToast("Couldn't copy the link");
    }
    setTimeout(() => setToast(""), 2000);
  };

  useEffect(() => {
    if (!playing) return;
    const onKey = (e) => e.key === "Escape" && setPlaying(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [playing]);

  if (status === "error") {
    return (
      <div className="sm-wrap sm-state">
        <p>We couldn't load the {tab.noun} right now.</p>
        <button type="button" className="sm-btn" onClick={() => setReloadKey((k) => k + 1)}>
          Try again
        </button>
      </div>
    );
  }

  if (status === "ready" && items.length === 0) {
    return (
      <div className="sm-wrap sm-state">
        <p>No {tab.noun} have been added yet. Check back soon.</p>
      </div>
    );
  }

  return (
    <div className="sm-wrap">
      {status === "loading" ? (
        <>
          <div className="sm-feature sm-skeleton" style={{ minHeight: 320 }} />
          <div className="sm-grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="sm-card sm-skeleton" style={{ minHeight: 300 }} />
            ))}
          </div>
        </>
      ) : (
        <>
          <FeaturedCard item={featured} tab={tab} onPlay={play} />

          <form className="sm-filters" role="search" onSubmit={(e) => e.preventDefault()}>
            <label className="sm-search">
              <SearchIcon />
              <input
                type="search"
                placeholder={`Search ${tab.noun} by keyword...`}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
              />
            </label>
            {dropdowns.map((d) => (
              <select
                key={d.key}
                aria-label={d.label}
                value={filters[d.key]}
                onChange={(e) => {
                  setFilters((f) => ({ ...f, [d.key]: e.target.value }));
                  setPage(1);
                }}
              >
                <option value="">{d.label}</option>
                {d.options.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            ))}
          </form>

          <div ref={gridRef} className="sm-grid">
            {pageItems.map((item) => (
              <MediaCard key={item.id} item={item} onPlay={play} onCopy={copyLink} />
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="sm-state">Nothing matches your search. Try a different keyword.</p>
          )}

          {totalPages > 1 && (
            <nav className="sm-pages" aria-label="Pagination">
              <button type="button" disabled={current === 1} onClick={() => goTo(current - 1)} aria-label="Previous page">
                ‹
              </button>
              {getPages(current, totalPages).map((p, i) =>
                p === "…" ? (
                  <span key={`gap-${i}`} aria-hidden="true">…</span>
                ) : (
                  <button
                    key={p}
                    type="button"
                    aria-current={p === current ? "page" : undefined}
                    onClick={() => goTo(p)}
                  >
                    {p}
                  </button>
                )
              )}
              <button type="button" disabled={current === totalPages} onClick={() => goTo(current + 1)} aria-label="Next page">
                ›
              </button>
            </nav>
          )}
        </>
      )}

      {playing && (
        <div className="sm-modal" role="dialog" aria-modal="true" aria-label={playing.title} onClick={() => setPlaying(null)}>
          <div className="sm-modal__box" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="sm-modal__close" onClick={() => setPlaying(null)} aria-label="Close video">
              ×
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${playing.id}?autoplay=1&rel=0`}
              title={playing.title}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {toast && <div className="sm-toast" role="status">{toast}</div>}
    </div>
  );
}

/* ---------- Page ---------- */
export default function Media() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [tabKey, setTabKey] = useState("sermons");
  const tab = TABS.find((t) => t.key === tabKey);

  return (
    <div className="home media-page">
      <header className="hero media-hero" style={{ backgroundImage: `linear-gradient(rgba(5,12,30,.6), rgba(5,12,30,.6)), url(${IMG.hero})` }}>
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
                <a
                  href={l === "Home" ? "/" : `/${l.toLowerCase().replace(/\s+/g, "-")}`}
                  aria-current={l === "Media" ? "page" : undefined}
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="media-hero__content">
          <h1>Media</h1>
          <p>Sermons, teachings, and spiritual insights</p>
        </div>
      </header>

      <div className="media-tabs" role="tablist" aria-label="Media sections">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            role="tab"
            aria-selected={t.key === tabKey}
            onClick={() => setTabKey(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <main className="media-main">
        {tab.path ? (
          <MediaList key={tab.key} tab={tab} />
        ) : (
          <div className="sm-wrap sm-state">
            <p>{tab.label} is coming soon.</p>
          </div>
        )}
      </main>

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