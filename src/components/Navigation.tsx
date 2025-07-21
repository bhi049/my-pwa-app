import React from "react";
import { NavLink } from "react-router-dom";

const Navigation: React.FC = () => {
  return (
    <nav
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "space-around",
        padding: "0.5rem 0",
        background: "#f8f8f8",
        borderTop: "1px solid #ccc",
        zIndex: 100,
      }}
    >
      <NavLink to="/" style={({ isActive }) => ({ color: isActive ? "blue" : "gray" })}>
        📝 Tasks
      </NavLink>
      <NavLink to="/calendar" style={({ isActive }) => ({ color: isActive ? "blue" : "gray" })}>
        📅 Calendar
      </NavLink>
      <NavLink to="/settings" style={({ isActive }) => ({ color: isActive ? "blue" : "gray" })}>
        ⚙️ Settings
      </NavLink>
    </nav>
  );
};

export default Navigation;
