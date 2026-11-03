import { Routes, Route } from "react-router-dom";

import Home from "../pages/home/home";
import Media from "../pages/media/media";
import NotFound from "../pages/notFound";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/media" element={<Media />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}