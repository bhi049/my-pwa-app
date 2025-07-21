import React from "react";
import { Task } from "../types/Task";
import styles from "../styles/TaskCard.module.css";

interface Props {
  task: Task;
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

const TaskCard: React.FC<Props> = ({ task }) => {
  const dueDateStr = task.dueDate
    ? new Intl.DateTimeFormat(undefined, {
        dateStyle: "medium",
        timeStyle: task.dueDate.getHours() > 0 ? "short" : undefined,
      }).format(task.dueDate)
    : "No due date";

  return (
    <div className={`${styles.card} ${getPriorityClass(task.priority)}`}>
      <h3>{task.title}</h3>
      {task.description && <p>{task.description}</p>}
      <small>{dueDateStr}</small>
    </div>
  );
};

export default TaskCard;
