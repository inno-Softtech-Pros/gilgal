import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronDown, Search } from "lucide-react";

const IMG = "/images/gallery/events";

// Each event is a card on the Events tab and has its own photo page.
// Files live in public/images/gallery/events/. `cover` is the card photo; list more
// photo file names in `photos` and they appear on the event page and in "All".
// An event with a `layout` (width, height, tiles) shows its photos as an exact mosaic
// from the design; each tile is [x, y, width, height, objectPosition?], in the same order as `photos`.
const numbered = (prefix, count) =>
  Array.from({ length: count }, (_, i) => `${prefix}-${String(i + 1).padStart(2, "0")}.jpg`);

// Living Flame: first mosaic (20 photos, living-flame-01.jpg ... -20.jpg)
const LIVING_FLAME_W = 1370;
const LIVING_FLAME_H = 1235;
const LIVING_FLAME_TILES = [
  // Top block
  [0, 0, 324, 429],
  [349, 0, 324, 203],
  [697, 0, 208, 203],
  [929, 0, 209, 120],
  [1162, 0, 208, 263],
  [929, 144, 209, 120],
  [349, 227, 208, 203, "center top"], // living-flame-07: keeps the head in frame
  [581, 227, 324, 203],
  [929, 288, 441, 142],
  // Middle block
  [0, 454, 441, 257],
  [465, 454, 324, 385],
  [813, 454, 325, 179, "center top"], // living-flame-12: keeps the head in frame
  [1162, 454, 208, 385],
  [813, 658, 325, 181],
  [0, 735, 441, 299, "center 20%"], // living-flame-15: shows a bit more above the head
  [465, 863, 325, 171],
  [813, 863, 208, 372],
  [1046, 863, 324, 372],
  // Bottom row
  [0, 1058, 324, 177, "center 20%"], // living-flame-19: shows a bit more above the head
  [349, 1058, 440, 177, "center 20%"], // living-flame-20: shows a bit more above the head
];

// Living Flame '26: second mosaic (22 photos, living-flame-26-01.jpg ... -22.jpg),
// shown below the first one on the Living Flame page
const LIVING_FLAME_26_H = 1468;
const LIVING_FLAME_26_TILES = [
  [0, 0, 441, 281],
  [465, 0, 324, 233],
  [813, 0, 209, 146],
  [1046, 0, 324, 146],
  [813, 170, 209, 232],
  [1046, 170, 324, 394],
  [465, 259, 324, 143],
  [0, 305, 208, 283],
  [232, 305, 209, 119],
  [232, 448, 209, 140],
  [465, 427, 208, 325],
  [697, 427, 325, 325],
  [1046, 589, 324, 330],
  [0, 613, 441, 254],
  [465, 778, 557, 305],
  [1046, 943, 324, 248, "center 20%"], // living-flame-26-16: shows a bit more above the head
  [0, 891, 208, 300],
  [232, 891, 209, 300],
  [465, 1106, 324, 362],
  [813, 1106, 209, 362],
  [1046, 1216, 324, 252, "center 20%"], // living-flame-26-21: shows a bit more above the head
  [0, 1216, 441, 252, "center 20%"], // living-flame-26-22: shows a bit more above the head
];

const SECTION_GAP = 24; // space between the two mosaics, in design pixels
const LIVING_FLAME_26_OFFSET = LIVING_FLAME_H + SECTION_GAP;

export const EVENTS = [
  {
    slug: "praisequake-25",
    title: "PraiseQuake ‘25",
    category: "Worship",
    cover: "praisequake-25.jpg",
    photos: numbered("praisequake-25", 27), // praisequake-25-01.jpg ... -27.jpg
    layout: {
      width: 1370,
      height: 1957,
      tiles: [
        [0, 0, 441, 294],
        [465, 0, 208, 364],
        [697, 0, 325, 172],
        [1046, 0, 324, 172],
        [697, 196, 208, 168],
        [929, 196, 441, 294],
        [0, 318, 208, 364],
        [232, 318, 208, 246],
        [465, 388, 440, 176],
        [929, 514, 209, 248],
        [1162, 514, 208, 248],
        [232, 588, 325, 174],
        [581, 588, 324, 174],
        [0, 706, 208, 284],
        [232, 786, 441, 204],
        [697, 786, 325, 487],
        [1046, 786, 324, 410],
        [0, 1014, 325, 403],
        [349, 1014, 324, 259],
        [1046, 1220, 324, 425],
        [349, 1297, 673, 348],
        [0, 1441, 325, 204],
        [0, 1669, 325, 288],
        [348, 1669, 208, 288],
        [581, 1669, 208, 288],
        [813, 1669, 208, 288],
        [1046, 1669, 324, 288],
      ],
    },
  },
  {
    // One Living Flame card: the '26 photos are part of this event
    slug: "living-flame",
    title: "Living Flame",
    category: "Worship",
    cover: "living-flame.jpg",
    photos: [
      ...numbered("living-flame", 20), // living-flame-01.jpg ... -20.jpg
      ...numbered("living-flame-26", 22), // living-flame-26-01.jpg ... -22.jpg
    ],
    layout: {
      width: LIVING_FLAME_W,
      height: LIVING_FLAME_26_OFFSET + LIVING_FLAME_26_H,
      tiles: [
        ...LIVING_FLAME_TILES,
        ...LIVING_FLAME_26_TILES.map(([x, y, ...rest]) => [x, y + LIVING_FLAME_26_OFFSET, ...rest]),
      ],
    },
  },
  {
    slug: "vbs",
    title: "VBS",
    category: "Kids",
    cover: "vbs.jpg",
    photos: numbered("vbs", 13), // vbs-01.jpg ... -13.jpg
    layout: {
      width: 1370,
      height: 907,
      tiles: [
        [0, 0, 441, 286],
        [465, 0, 324, 207],
        [813, 0, 325, 362],
        [1162, 0, 208, 168],
        [1162, 192, 208, 170],
        [465, 231, 324, 207],
        [0, 310, 208, 325],
        [232, 310, 209, 325],
        [465, 462, 324, 173],
        [813, 386, 557, 249],
        // Bottom row
        [0, 659, 557, 248],
        [581, 659, 324, 248],
        [929, 659, 441, 248],
      ],
    },
  },
];

export const eventPhotos = ({ title, cover, photos }) =>
  [cover, ...photos]
    .filter(Boolean)
    .map((file, i) => ({ src: `${IMG}/${file}`, alt: `${title} photo ${i + 1}` }));

// Natural-shape photo wall, used by All, Youth, Children and each event page
export function PhotoMasonry({ photos, empty = "Photos coming soon." }) {
  if (!photos || photos.length === 0) return <p className="gallery-grid__empty">{empty}</p>;
  return (
    <ul className="gallery-masonry">
      {photos.map(({ src, alt }) => (
        <li key={src}>
          <img src={src} alt={alt} loading="lazy" />
        </li>
      ))}
    </ul>
  );
}

// Exact mosaic: every tile is placed in % of the design's photo area
const pct = (value, total) => `${(value / total) * 100}%`;

// Safe version: skips any tile that has no matching photo instead of crashing
export function PhotoMosaic({ tiles, width, height, photos }) {
  return (
    <ul className="gallery-grid__canvas" style={{ "--ratio": `${width} / ${height}` }}>
      {tiles.map(([x, y, w, h, focus], i) => {
        const photo = photos[i];
        if (!photo) return null;
        return (
          <li
            key={i}
            className="gallery-tile"
            style={{ left: pct(x, width), top: pct(y, height), width: pct(w, width), height: pct(h, height) }}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              style={focus ? { objectPosition: focus } : undefined}
              loading="lazy"
            />
          </li>
        );
      })}
    </ul>
  );
}

// Dropdown options: "All" first, then one option per event box.
// `value` is the selected event slug ("" means All).
const EVENT_OPTIONS = [
  { slug: "", title: "All" },
  ...EVENTS.map(({ slug, title }) => ({ slug, title })),
];

// Custom event dropdown: a search bar on top, then All and the event names
function EventDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const wrapRef = useRef(null);

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

  const toggle = () => {
    setOpen((o) => !o);
    setFilter("");
  };

  const pick = (slug) => {
    onChange(slug);
    setOpen(false);
    setFilter("");
  };

  const selected = EVENT_OPTIONS.find((option) => option.slug === value) || EVENT_OPTIONS[0];
  const term = filter.trim().toLowerCase();
  const options = EVENT_OPTIONS.filter((option) => option.title.toLowerCase().includes(term));

  return (
    <div className={`events-select ${open ? "events-select--open" : ""}`} ref={wrapRef}>
      <button
        type="button"
        className="events-select__button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={toggle}
      >
        <span>{selected.title}</span>
        <ChevronDown size={32} strokeWidth={2.5} aria-hidden="true" />
      </button>

      {open && (
        <div className="events-select__panel">
          <label className="events-select__search">
            <Search size={18} strokeWidth={2} aria-hidden="true" />
            <input
              type="search"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Search event..."
              aria-label="Search events in the list"
              autoFocus
            />
          </label>

          {options.length > 0 ? (
            <ul className="events-select__list" role="listbox" aria-label="Events">
              {options.map(({ slug, title }) => (
                <li key={slug || "all"} role="option" aria-selected={slug === value}>
                  <button
                    type="button"
                    className={`events-select__option ${slug === value ? "events-select__option--selected" : ""}`}
                    onClick={() => pick(slug)}
                  >
                    {title}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="events-select__empty">No event found.</p>
          )}
        </div>
      )}
    </div>
  );
}

function EventList() {
  const [selectedSlug, setSelectedSlug] = useState("");
  const [query, setQuery] = useState("");
  const search = query.trim().toLowerCase();
  const visible = EVENTS.filter(
    (event) =>
      (!selectedSlug || event.slug === selectedSlug) &&
      event.title.toLowerCase().includes(search)
  );

  return (
    <>
      <div className="events-controls">
        <EventDropdown value={selectedSlug} onChange={setSelectedSlug} />

        <label className="events-search">
          <Search size={28} strokeWidth={2} aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search here..."
            aria-label="Search events"
          />
        </label>
      </div>

      {visible.length > 0 ? (
        <ul className="events-grid">
          {visible.map(({ slug, title, cover }) => (
            <li key={slug} className="event-card">
              <Link to={`/gallery/events/${slug}`}>
                {cover ? (
                  <img src={`${IMG}/${cover}`} alt="" loading="lazy" />
                ) : (
                  <span className="event-card__placeholder" />
                )}
                <span className="event-card__title">{title}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="gallery-grid__empty">No events found.</p>
      )}
    </>
  );
}

function EventAlbum({ event }) {
  const { layout, photos } = event;
  const items = layout
    ? photos.map((file, i) => ({ src: `${IMG}/${file}`, alt: `${event.title} photo ${i + 1}` }))
    : eventPhotos(event);

  return (
    <>
      <Link to="/gallery/events" className="event-album__back" aria-label="Back to all events">
        <ArrowLeft size={18} strokeWidth={2.5} aria-hidden="true" />
      </Link>
      <h2 className="sr-only">{event.title}</h2>
      {layout ? (
        <PhotoMosaic tiles={layout.tiles} width={layout.width} height={layout.height} photos={items} />
      ) : (
        <PhotoMasonry photos={items} />
      )}
    </>
  );
}

export default function EventsGallery({ slug }) {
  if (!slug) return <EventList />;

  const event = EVENTS.find((item) => item.slug === slug);
  if (!event) {
    return (
      <p className="gallery-grid__empty">
        We couldn’t find that event. <Link to="/gallery/events">Back to all events</Link>
      </p>
    );
  }
  return <EventAlbum event={event} />;
}