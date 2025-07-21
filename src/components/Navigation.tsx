import React from "react";
import { NavLink } from "react-router-dom";
import { FiList, FiCalendar, FiSettings } from "react-icons/fi";
import styles from "../styles/Navigation.module.css";

const Navigation: React.FC = () => {
  return (
    <nav className={styles.nav}>
      <NavLink to="/" className={({ isActive }) => isActive ? styles.active : ""}>
        <div className={styles.tab}>
          <FiList className={styles.icon} />
          <span>Tasks</span>
        </div>
      </NavLink>
      <NavLink to="/calendar" className={({ isActive }) => isActive ? styles.active : ""}>
        <div className={styles.tab}>
          <FiCalendar className={styles.icon} />
          <span>Calendar</span>
        </div>
      </NavLink>
      <NavLink to="/settings" className={({ isActive }) => isActive ? styles.active : ""}>
        <div className={styles.tab}>
          <FiSettings className={styles.icon} />
          <span>Settings</span>
        </div>
      </NavLink>
    </nav>
  );
};

export default Navigation;
