// frontend/src/components/layout/layout.jsx
import { useCallback, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../header/header";
import Footer from "../footer/footer";
import homeHero from "../../assets/home/banner.jpg";
import "./layout.css";


const HEROES = {
  "/home": {
    title: "Welcome to Gilgal AG Church",
    backgroundImage: homeHero,
  },
  "/media": {
    title: "Media",
    subtitle: "Sermons, teachings, and spiritual insights",
    backgroundImage: "/images/media-hero.jpg",
  },
  "/events": {
    title: "Events",
    subtitle: "Discover what is happening at Gilgal AG Church this month",
    // Photo lives at frontend/public/images/events-hero.jpg
    backgroundImage: "/images/events-hero.jpg",
  },
  "/about-us/journey": {
  title: "Our Journey",
  backgroundImage: "/images/about/hero.jpg",
},
};

// Drop empty values so a page calling setHeader({ backgroundImage: undefined })
// can't wipe out the image set above.
const withoutEmpty = (props = {}) =>
  Object.fromEntries(
    Object.entries(props).filter(([, value]) => value !== undefined && value !== null && value !== "")
  );


export default function Layout() {
  const { pathname } = useLocation();

  // "/events/", "/Events" and "/events" all use the same hero
  const routeKey = pathname.toLowerCase().replace(/\/+$/, "") || "/";

  // Remember which route set the override, so it doesn't leak onto other pages
  const [override, setOverride] = useState({ path: null, props: {} });

  const setHeader = useCallback(
    (props) => setOverride({ path: routeKey, props }),
    [routeKey]
  );

  const header = {
    ...(HEROES[routeKey] || {}),
    ...(override.path === routeKey ? withoutEmpty(override.props) : {}),
  };

  return (
    <div className="layout">
      <Header {...header} />

      <main className="layout-content">
        <Outlet context={{ setHeader }} />
      </main>

      <Footer />
    </div>
  );
}
