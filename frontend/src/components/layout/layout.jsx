// frontend/src/components/layout/layout.jsx
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../header/header";
import Footer from "../footer/footer";
import "./layout.css";

export default function Layout() {
  const [header, setHeader] = useState({});

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
