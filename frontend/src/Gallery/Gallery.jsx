import { useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import EventsGallery, { EVENTS, PhotoMasonry, PhotoMosaic, eventPhotos } from "./Eventsgallery";
import "./Gallery.css";

const IMG = "/images/gallery";
const TABS = [
  { slug: "all", label: "All" },
  { slug: "worship", label: "Worship" },
  { slug: "events", label: "Events" },
  { slug: "youth", label: "Youth" },
  { slug: "children", label: "Children" },
];
const tabPath = (slug) => (slug === "all" ? "/gallery" : `/gallery/${slug}`);

// Worship: the exact mosaic from the 1440px design (1370 x 3127 px of photos).
// Each tile is [x, y, width, height, objectPosition?] in design pixels. The optional
// last value picks which part of a photo stays visible (default "center").
// Files: public/images/gallery/worship-01.jpg ... worship-41.jpg, in this order.
const GRID_W = 1370;
const GRID_H = 3127;
const WORSHIP_TILES = [
  [0, 0, 441, 470],
  [465, 0, 324, 284],
  [813, 0, 209, 130],
  [1046, 0, 324, 284],
  [813, 154, 209, 130],
  [465, 308, 324, 212],
  [813, 308, 557, 212],
  [0, 494, 441, 225],
  [465, 544, 557, 175],
  [1046, 544, 324, 492],
  [0, 743, 208, 264],
  [232, 743, 441, 264],
  [698, 743, 324, 408],
  [0, 1031, 441, 361],
  [465, 1031, 208, 120],
  [1046, 1060, 324, 332],
  [465, 1175, 208, 217],
  [697, 1175, 325, 217, "center 40%"], // worship-18: heads visible, bodies down to the chest
  [0, 1416, 325, 332],
  [349, 1416, 556, 332],
  [929, 1416, 441, 151],
  [929, 1591, 209, 157],
  [1162, 1591, 208, 157],
  [0, 1772, 557, 203],
  [581, 1772, 441, 397],
  [1046, 1772, 324, 198],
  [0, 1999, 325, 183],
  [349, 1999, 208, 251],
  [1046, 1994, 324, 407],
  [0, 2206, 325, 195],
  [581, 2193, 441, 208],
  [349, 2274, 208, 127],
  [0, 2425, 441, 475],
  [465, 2425, 324, 244, "center 25%"], // worship-34: shows a bit more above the head
  [813, 2425, 325, 153],
  [1162, 2425, 208, 153],
  [813, 2602, 209, 298],
  [1046, 2602, 324, 298],
  [465, 2693, 324, 434],
  [0, 2924, 441, 203],
  [813, 2924, 557, 203],
];

// Youth: the exact mosaic from the 1440px design (1370 x 1729 px of photos).
// Same tile format as Worship. Files: public/images/gallery/youth/youth-01.jpg ... youth-20.jpg
const YOUTH_W = 1370;
const YOUTH_H = 1729;
const YOUTH_TILES = [
  [0, 0, 325, 397],
  [349, 0, 324, 203],
  [697, 0, 208, 357],
  [929, 0, 441, 357],
  [349, 227, 324, 203],
  [697, 381, 208, 254],
  [929, 381, 208, 327],
  [1162, 381, 208, 327],
  [0, 421, 325, 214],
  [349, 454, 324, 181],
  [0, 659, 905, 393],
  [929, 732, 441, 320],
  [0, 1076, 325, 398],
  [349, 1079, 208, 392],
  [581, 1076, 324, 398],
  [929, 1076, 208, 328],
  [1162, 1076, 208, 328],
  [929, 1428, 441, 301],
  [0, 1498, 441, 231],
  [465, 1498, 440, 231],
];
const YOUTH_FILES = YOUTH_TILES.map((_, i) => `youth-${String(i + 1).padStart(2, "0")}.jpg`);

// Children: the exact mosaic from the 1440px design (1370 x 1996 px of photos).
// Files: public/images/gallery/children/children-01.jpg ... children-25.jpg
const CHILDREN_W = 1370;
const CHILDREN_H = 1996;
const CHILDREN_TILES = [
  [0, 0, 325, 433],
  [349, 0, 324, 182],
  [697, 0, 208, 182],
  [929, 0, 441, 247, "center top"], // children-04: keeps the top of the photo (heads) visible
  [349, 206, 556, 227],
  [929, 271, 441, 217, "center top"], // children-06: keeps the top of the photo (heads) visible
  [0, 456, 325, 404],
  [349, 457, 208, 204],
  [581, 457, 324, 204],
  [929, 512, 208, 349],
  [1162, 512, 208, 349],
  [349, 685, 324, 302],
  [697, 685, 208, 302],
  [0, 884, 325, 324],
  [929, 885, 441, 323],
  [349, 1011, 556, 197],
  [0, 1232, 208, 355],
  [232, 1232, 325, 270],
  [581, 1232, 324, 376],
  [929, 1232, 208, 376],
  [1162, 1232, 208, 376],
  [232, 1526, 325, 470],
  [0, 1611, 208, 385],
  [581, 1632, 441, 364, "center top"], // children-24: keeps the top of the photo (head) visible
  [1046, 1632, 324, 364],
];
const CHILDREN_FILES = CHILDREN_TILES.map((_, i) => `children-${String(i + 1).padStart(2, "0")}.jpg`);

const toPhotos = (files, folder, label) =>
  files.map((file, i) => ({ src: `${IMG}/${folder}/${file}`, alt: `${label} photo ${i + 1}` }));

const WORSHIP_PHOTOS = WORSHIP_TILES.map((_, i) => ({
  src: `${IMG}/worship-${String(i + 1).padStart(2, "0")}.jpg`,
  alt: `Worship moment ${i + 1}`,
}));
const YOUTH_PHOTOS = toPhotos(YOUTH_FILES, "youth", "Youth");
const CHILDREN_PHOTOS = toPhotos(CHILDREN_FILES, "children", "Children");

// "All" is every photo from Worship, Events, Youth and Children together.
const ALL_PHOTOS = [
  ...WORSHIP_PHOTOS,
  ...EVENTS.flatMap(eventPhotos),
  ...YOUTH_PHOTOS,
  ...CHILDREN_PHOTOS,
];

export default function Gallery() {
  const { tab = "all", eventSlug } = useParams();
  const activeTab = TABS.some((t) => t.slug === tab) ? tab : "all";
  const tabsRef = useRef(null);
  const lastView = useRef(`${activeTab}/${eventSlug}`);

  // Scroll back up to the tabs when the tab or event changes (not on first load)
  useEffect(() => {
    const view = `${activeTab}/${eventSlug}`;
    if (lastView.current !== view) {
      lastView.current = view;
      tabsRef.current?.scrollIntoView({ block: "start" });
    }
  }, [activeTab, eventSlug]);

  return (
    <div className="gallery">
      {/* Hero */}
      <section
        className="gallery-hero"
        style={{ backgroundImage: `url(${IMG}/gallery-hero.jpg)` }}
      >
        <h1 className="gallery-hero__title">GALLERY</h1>
        <p className="gallery-hero__subtitle">Moments from our church family</p>
      </section>

      {/* Category tabs */}
      <div className="gallery-tabs" ref={tabsRef}>
        <nav className="gallery-tabs__list" aria-label="Photo categories">
          {TABS.map(({ slug, label }) => (
            <Link
              key={slug}
              to={tabPath(slug)}
              className={`gallery-tab ${slug === activeTab ? "gallery-tab--active" : ""}`}
              aria-current={slug === activeTab ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Photos for the selected tab */}
      <section className={`gallery-grid ${activeTab === "events" && eventSlug ? "gallery-grid--album" : ""}`}>
        {activeTab === "all" && <PhotoMasonry photos={ALL_PHOTOS} />}
        {activeTab === "worship" && (
          <PhotoMosaic tiles={WORSHIP_TILES} width={GRID_W} height={GRID_H} photos={WORSHIP_PHOTOS} />
        )}
        {activeTab === "events" && <EventsGallery slug={eventSlug} />}
        {activeTab === "youth" && (
          <PhotoMosaic tiles={YOUTH_TILES} width={YOUTH_W} height={YOUTH_H} photos={YOUTH_PHOTOS} />
        )}
        {activeTab === "children" && (
          <PhotoMosaic tiles={CHILDREN_TILES} width={CHILDREN_W} height={CHILDREN_H} photos={CHILDREN_PHOTOS} />
        )}
      </section>
    </div>
  );
}