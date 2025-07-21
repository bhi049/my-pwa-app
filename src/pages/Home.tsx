import React, { useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { Task } from "../types/Task";
import { loadTasks, saveTasks } from "../utils/storage";

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(loadTasks());

  const handleTaskAdded = (newTask: Task) => {
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  return (
    <div style={{ padding: "1rem", maxWidth: "600px", margin: "0 auto" }}>
      <h2>My Tasks</h2>
      <TaskForm onTaskAdded={handleTaskAdded} />
      <TaskList key={tasks.length} />
    </div>
  );
};

export default Home;