import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Task } from "../types/Task";
import { loadTasks, saveTasks } from "../utils/storage";
import styles from "../styles/CalendarScreen.module.css";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm"; // ✅ import TaskForm

const CalendarScreen: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showForm, setShowForm] = useState(false); // ✅ toggle form

  useEffect(() => {
    const loaded = loadTasks();
    setTasks(loaded);
    setSelectedDate(new Date()); // Auto-select today
  }, []);

  const tasksByDate = tasks.reduce((acc, task) => {
    if (!task.dueDate) return acc;
    const key = new Date(task.dueDate).toDateString();
    if (!acc[key]) acc[key] = [];
    acc[key].push(task);
    return acc;
  }, {} as Record<string, Task[]>);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setShowForm(false); // Close form when selecting a new day
  };

  const handleToggleComplete = (id: string) => {
    const updated = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            completed: !task.completed,
            updatedAt: new Date(),
            completedAt: !task.completed ? new Date() : undefined,
          }
        : task
    );
    setTasks(updated);
    saveTasks(updated);
  };

  const handleAddTask = (newTask: Task) => {
    const updated = [...tasks, newTask];
    setTasks(updated);
    saveTasks(updated);
    setShowForm(false);
  };

  const renderDot = (date: Date) => {
    const key = date.toDateString();
    return tasksByDate[key] ? <div className={styles.dot} /> : null;
  };

  const tileContent = ({ date }: { date: Date }) => (
    <div className={styles.tile}>{renderDot(date)}</div>
  );

  const tasksForSelectedDate = selectedDate
    ? [...(tasksByDate[selectedDate.toDateString()] || [])].sort((a, b) =>
        a.dueDate && b.dueDate
          ? new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
          : 0
      )
    : [];

  return (
    <div className={styles.container}>
      <h2>Calendar</h2>

      <div className={styles.calendarWrapper}>
        <Calendar
          onClickDay={handleDateClick}
          tileContent={tileContent}
          value={selectedDate ?? new Date()}
        />
      </div>

      {selectedDate && (
        <div className={styles.dropdown}>
          <h3>
            Tasks on{" "}
            {selectedDate.toLocaleDateString(undefined, {
              weekday: "short",
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </h3>

          {tasksForSelectedDate.length === 0 ? (
            <p>No tasks</p>
          ) : (
            tasksForSelectedDate.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggleComplete={handleToggleComplete}
              />
            ))
          )}

          <button
            className={styles.addTaskBtn}
            onClick={() => setShowForm((prev) => !prev)}
          >
            {showForm ? "Close Form" : "Add Task"}
          </button>

          {showForm && (
            <TaskForm onTaskAdded={handleAddTask} defaultDueDate={selectedDate} />
          )}
        </div>
      )}
    </div>
  );
};

export default CalendarScreen;
