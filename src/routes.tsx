import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Calendar from "./pages/Calendar";
import Settings from "./pages/Settings";
import TaskDetail from "./pages/TaskDetail";

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/calendar" element={<Calendar />} />
    <Route path="/task/:id" element={<TaskDetail />} />
    <Route path="/settings" element={<Settings />} />
  </Routes>
);

export default AppRoutes;
