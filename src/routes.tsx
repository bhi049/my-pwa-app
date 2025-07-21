import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Calendar from "./pages/Calendar";
import Settings from "./pages/Settings";

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/calendar" element={<Calendar />} />
    <Route path="/settings" element={<Settings />} />
  </Routes>
);

export default AppRoutes;
