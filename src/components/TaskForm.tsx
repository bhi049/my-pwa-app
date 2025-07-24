import React, { useState, useEffect } from "react";
import { Task, Priority } from "../types/Task";
import { saveTasks, loadTasks } from "../utils/storage";
import { v4 as uuidv4 } from "uuid";
import PriorityDropdown from "./PriorityDropdown";
import styles from "../styles/TaskForm.module.css";

const defaultPriority: Priority = "medium";

interface TaskFormProps {
  onTaskAdded?: (task: Task) => void;
  defaultDueDate?: Date; // Accept date passed from CalendarScreen
}

const TaskForm: React.FC<TaskFormProps> = ({ onTaskAdded, defaultDueDate }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [time, setTime] = useState("");
  const [priority, setPriority] = useState<Priority>(defaultPriority);

  // Convert defaultDueDate into yyyy-mm-dd format on first render
  useEffect(() => {
    if (defaultDueDate) {
      const iso = defaultDueDate.toISOString();
      setDueDate(iso.slice(0, 10)); // yyyy-mm-dd
      setTime(iso.slice(11, 16));   // hh:mm
    }
  }, [defaultDueDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Title is required.");
      return;
    }

    const now = new Date();
    const task: Task = {
      id: uuidv4(),
      title: title.trim(),
      description: description.trim() || undefined,
      completed: false,
      priority,
      dueDate: dueDate ? new Date(`${dueDate}T${time || "12:00"}`) : undefined,
      createdAt: now,
      updatedAt: now,
    };

    const currentTasks = loadTasks();
    const updatedTasks = [...currentTasks, task];
    saveTasks(updatedTasks);

    onTaskAdded?.(task);

    // Reset form
    setTitle("");
    setDescription("");
    setDueDate("");
    setTime("");
    setPriority(defaultPriority);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
      />

      <textarea
        className={styles.textarea}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />

      <input
        className={styles.input}
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <input
        className={styles.input}
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />

      <PriorityDropdown
        value={priority}
        onChange={(val) => setPriority(val as Priority)}
      />

      <button type="submit" className={styles.button}>Add Task</button>
    </form>
  );
};

export default TaskForm;
