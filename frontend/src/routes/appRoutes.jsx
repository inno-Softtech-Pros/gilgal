// frontend/src/routes/appRoutes.jsx
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "../components/layout/layout";
import ProtectedRoute from "./protectedRoute";

import Home from "../pages/home/home";
import Events from "../pages/calendar/calendar";
import Media from "../pages/media/media";

import ComingSoon from "../pages/coming-soon/comingSoon";
import NotFound from "../pages/not-found/notFound";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/media" element={<Media />} />
      </Route>

      <Route path="/about-us" element={<ComingSoon />} />
      <Route path="/gallery" element={<ComingSoon />} />
      <Route path="/contact-us" element={<ComingSoon />} />
      <Route
        path="/donations"
        element={
          <ProtectedRoute>
            <ComingSoon />
          </ProtectedRoute>
        }
      />
      
      <Route path="/coming-soon" element={<ComingSoon />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
