// frontend/src/components/layout/layout.jsx
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../header/header";
import Banner from "../banner/banner";
import Footer from "../footer/footer";
import "./layout.css";

export default function Layout() {
  const location = useLocation();
  const [header, setHeader] = useState({});
  const [banner, setBanner] = useState(null);

  return (
    <div className="layout">
      <Header {...header} />
      <Banner key={location.pathname}>{banner}</Banner>

      <main className="layout-content">
        <Outlet context={{ setHeader, setBanner }} />
      </main>

      <Footer />
    </div>
  );
}
