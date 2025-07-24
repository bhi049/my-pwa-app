import React from "react";
import { Task } from "../types/Task";
import styles from "../styles/TaskCard.module.css";
import { useNavigate } from "react-router-dom";
import { FiCheckCircle, FiCircle } from "react-icons/fi";
interface Props {
  task: Task;
  onToggleComplete?: (id: string) => void; // Optional prop for handling completion toggle
}

const getPriorityClass = (priority: Task["priority"]) => {
  switch (priority) {
    case "high":
      return styles.high;
    case "medium":
      return styles.medium;
    case "low":
      return styles.low;
    default:
      return "";
  }
};

const TaskCard: React.FC<Props> = ({ task, onToggleComplete = () => {} }) => {
  const navigate = useNavigate();

  const handleOpen = () => {
    navigate(`/task/${task.id}`);
  };

  const handleToggleComplete = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    onToggleComplete(task.id);
  };

  const dueDateStr = task.dueDate
    ? new Intl.DateTimeFormat(undefined, {
        dateStyle: "medium",
        timeStyle: task.dueDate.getHours() > 0 ? "short" : undefined,
      }).format(task.dueDate)
    : "No due date";

  return (
    <div
      className={`${styles.card} ${getPriorityClass(task.priority)} ${
        task.completed ? styles.completed : ""
      }`}
      onClick={handleOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleOpen()}
    >
      <div className={styles.cardContent}>
        <div className={styles.textGroup}>
          <h3>{task.title}</h3>
          {task.description && <p>{task.description}</p>}
          <small>{dueDateStr}</small>
        </div>

        {/* Checkmark toggle button */}
        <button className={styles.checkBtn} onClick={handleToggleComplete} aria-label="Toggle complete">
          {task.completed ? <FiCheckCircle size={20} /> : <FiCircle size={20} />}
        </button>
      </div>
    </div>

  );
};

export default TaskCard;
