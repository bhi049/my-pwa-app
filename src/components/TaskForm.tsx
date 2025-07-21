import React, { useState } from "react";
import { Task, Priority } from "../types/Task";
import { saveTasks, loadTasks } from "../utils/storage";
import { v4 as uuidv4 } from "uuid";

const defaultPriority: Priority = "medium";

const TaskForm: React.FC<{ onTaskAdded?: (task: Task) => void }> = ({ onTaskAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [time, setTime] = useState("");
  const [priority, setPriority] = useState<Priority>(defaultPriority);
  const [tags, setTags] = useState("");

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
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0),
    };

    const currentTasks = loadTasks();
    const updatedTasks = [...currentTasks, task];
    saveTasks(updatedTasks);

    // optional callback
    onTaskAdded?.(task);

    // Reset form
    setTitle("");
    setDescription("");
    setDueDate("");
    setTime("");
    setPriority(defaultPriority);
    setTags("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task title" required />

      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />

      <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
      <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />

      <select value={priority} onChange={(e) => setPriority(e.target.value as Priority)}>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>

      <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Tags (comma-separated)" />

      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
