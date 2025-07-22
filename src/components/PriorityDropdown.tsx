import React, { useState } from "react";
import styles from "../styles/PriorityDropdown.module.css";

const options = [
  { value: "high", label: "High", color: "🔴" },
  { value: "medium", label: "Medium", color: "🟡" },
  { value: "low", label: "Low", color: "🟢" },
];

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const PriorityDropdown: React.FC<Props> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);

  const current = options.find((opt) => opt.value === value) || options[1];

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.selector}
        onClick={() => setOpen(!open)}
        type="button"
      >
        <span className={styles.dot}>{current.color}</span>
        {current.label}
        <span className={styles.arrow}>▾</span>
      </button>

      {open && (
        <ul className={styles.dropdown}>
          {options.map((opt) => (
            <li
              key={opt.value}
              className={`${styles.option} ${
                opt.value === value ? styles.selected : ""
              }`}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
            >
              <span className={styles.dot}>{opt.color}</span> {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PriorityDropdown;
