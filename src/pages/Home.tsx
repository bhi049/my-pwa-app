import React, { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import TaskCard from "../components/TaskCard";
import { Task } from "../types/Task";
import { loadTasks, saveTasks } from "../utils/storage";
import styles from "../styles/Home.module.css";

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setTasks(loadTasks());
  }, []);

  const handleAddTask = (task: Task) => {
    const updated = [...tasks, task];
    setTasks(updated);
    saveTasks(updated);
    setShowForm(false); // Hide form after adding
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>My Tasks</h2>
        <button className={styles.addButton} onClick={() => setShowForm(!showForm)}>
          Add Task
        </button>
      </div>

      {showForm && <TaskForm onTaskAdded={handleAddTask} />}

      <div className={styles.taskList}>
        {tasks.length === 0 ? (
          <p className={styles.empty}>No tasks yet</p>
        ) : (
          tasks.map((task) => <TaskCard key={task.id} task={task} />)
        )}
      </div>
    </div>
  );
};

export default Home;