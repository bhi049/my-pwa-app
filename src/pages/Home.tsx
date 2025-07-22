import React, { useEffect, useState, useRef } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import TaskCard from "../components/TaskCard";
import { Task } from "../types/Task";
import { loadTasks, saveTasks } from "../utils/storage";
import { FiPlus, FiMinus } from "react-icons/fi";
import styles from "../styles/Home.module.css";

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showForm, setShowForm] = useState(false);

  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTasks(loadTasks());
  }, []);

  const handleAddTask = (task: Task) => {
    const updated = [...tasks, task];
    setTasks(updated);
    saveTasks(updated);
    setShowForm(false); // Hide form after adding
  };

  const handleToggleForm = () => {
    setShowForm((prev) => !prev);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>My Tasks</h2>
      </div>

      {showForm && (
        <div ref={formRef}>
          <TaskForm onTaskAdded={handleAddTask} />
        </div>
      )}

      <div className={styles.taskList}>
        {tasks.length === 0 ? (
          <p className={styles.empty}>No tasks yet</p>
        ) : (
          tasks.map((task) => <TaskCard key={task.id} task={task} />)
        )}
      </div>

      {/* Floationg Add Task Button */}
<button
  className={styles.AddNoteButton}
  onClick={handleToggleForm}
  aria-label={showForm ? "Close Form" : "Add Task"}
>
  {showForm ? "Close" : "Add Note"}
</button>
</div>
  );
};

export default Home;
