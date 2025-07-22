import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Task } from "../types/Task";
import { loadTasks } from "../utils/storage";
import styles from "../styles/CalendarScreen.module.css";

const CalendarScreen: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    setTasks(loadTasks());
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
  };

  const renderDot = (date: Date) => {
    const key = date.toDateString();
    if (tasksByDate[key]) {
      return <div className={styles.dot} />;
    }
    return null;
  };

  const tileContent = ({ date }: { date: Date }) => (
    <div className={styles.tile}>
      {renderDot(date)}
    </div>
  );

  const tasksForSelectedDate = selectedDate
    ? tasksByDate[selectedDate.toDateString()] || []
    : [];

  return (
<div className={styles.container}>
  <h2>Calendar</h2>

  <div className={styles.calendarWrapper}>
    <Calendar
      onClickDay={handleDateClick}
      tileContent={tileContent}
    />
  </div>

  {selectedDate && (
    <div className={styles.dropdown}>
      <h3>Tasks on {selectedDate.toDateString()}</h3>
      {tasksForSelectedDate.length === 0 ? (
        <p>No tasks</p>
      ) : (
        tasksForSelectedDate.map((task) => (
          <div key={task.id} className={styles.taskCard}>
            <strong>{task.title}</strong>
            <p>{task.description || "No description"}</p>
            <span className={styles[task.priority]}>{task.priority}</span>
          </div>
        ))
      )}
    </div>
  )}
</div>
  );
};

export default CalendarScreen;
