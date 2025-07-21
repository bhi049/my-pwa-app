import React, { useEffect, useState } from "react";
import { Task } from "../types/Task";
import { loadTasks } from "../utils/storage";
import TaskItem from "./TaskItem";

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const stored = loadTasks();
    const sorted = stored.sort((a, b) => {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });
    setTasks(sorted);
  }, []);

  if (tasks.length === 0) {
    return <p>No Tasks yet. Add some above!</p>;
  }

  return (
    <div style={{ marginTop: "1rem" }}>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
