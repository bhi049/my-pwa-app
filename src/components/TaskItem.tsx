import React from "react";
import { Task } from "../types/Task";

interface Props {
  task: Task;
}

const getPriorityColor = (priority: Task["priority"]) => {
  switch (priority) {
    case "high":
      return "red";
    case "medium":
      return "orange";
    case "low":
      return "green";
    default:
      return "gray"; // Fallback color if priority is not recognized
  }
}

const TaskItem: React.FC<Props> = ({ task }) => {
  const dueDateStr = task.dueDate
    ? new Intl.DateTimeFormat(undefined, {
      dateStyle: "medium",
      timeStyle: task.dueDate.getHours() > 0 ? "short" : undefined,
    }).format(task.dueDate)
    : "No due date";

      return (
    <div
      style={{
        borderLeft: `4px solid ${getPriorityColor(task.priority)}`,
        padding: "0.75rem",
        marginBottom: "0.5rem",
        background: task.completed ? "#eee" : "#fff",
        borderRadius: "8px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      }}
    >
      <h3 style={{ margin: 0 }}>{task.title}</h3>
      {task.description && <p style={{ margin: "4px 0" }}>{task.description}</p>}
      <small>{dueDateStr}</small>
    </div>
  );
}

export default TaskItem;