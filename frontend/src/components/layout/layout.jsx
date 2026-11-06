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
};


export default function Layout() {
  const { pathname } = useLocation();

  // Remember which route set the override, so it doesn't leak onto other pages
  const [override, setOverride] = useState({ path: null, props: {} });

  const setHeader = useCallback(
    (props) => setOverride({ path: pathname, props }),
    [pathname]
  );

  const header = {
    ...(HEROES[pathname] || {}),
    ...(override.path === pathname ? override.props : {}),
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

