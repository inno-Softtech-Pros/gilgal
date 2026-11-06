import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./pages/AboutUs/About";
import Journey from "./pages/AboutUs/Journey";
import Leadership from "./pages/AboutUs/Leadership";
import Gallery from "./pages/Gallery/Gallery";

// Temporary placeholder until each page is built.
// The navbar is transparent over the top of the page, so give it a dark backdrop.
const Page = ({ title }) => (
  <section
    style={{
      minHeight: "70vh",
      padding: "160px 24px 48px",
      background: "#0b1a33",
      color: "#fff",
    }}
  >
    <h1>{title}</h1>
  </section>
);

const PLACEHOLDER_ROUTES = [
  { path: "/", title: "Home" },
  { path: "/media", title: "Media" },
  { path: "/events", title: "Events" },
  { path: "/contact", title: "Contact" },
  { path: "/give", title: "Give" },
];

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          {PLACEHOLDER_ROUTES.map(({ path, title }) => (
            <Route key={path} path={path} element={<Page title={title} />} />
          ))}
          <Route path="/about" element={<About />} />
          <Route path="/about/journey" element={<Journey />} />
          <Route path="/about/leadership" element={<Leadership />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/gallery/:tab" element={<Gallery />} />
          <Route path="/gallery/:tab/:eventSlug" element={<Gallery />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}