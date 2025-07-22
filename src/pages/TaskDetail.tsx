import { useNavigate, useParams } from "react-router-dom";
import { Task } from "../types/Task";
import { loadTasks, saveTasks } from "../utils/storage";
import styles from "../styles/TaskDetail.module.css";

const TaskDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const tasks = loadTasks();
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return <p style={{ padding: "1rem" }}>Task not found.</p>;
  }

  const handleDelete = () => {
    const updated = tasks.filter((t) => t.id !== id);
    saveTasks(updated);
    navigate("/");
  };

  const handleEdit = () => {
    // You can navigate to /edit/:id or open a modal later
    alert("Edit functionality coming soon!");
  };

  return (
    <div className={styles.container}>
      <h2>{task.title}</h2>
      {task.description && <p>{task.description}</p>}
      {task.dueDate && <p><strong>Due:</strong> {task.dueDate.toLocaleString()}</p>}
      <p><strong>Priority:</strong> {task.priority}</p>

      <div className={styles.actions}>
        <button className={styles.edit} onClick={handleEdit}>Edit</button>
        <button className={styles.delete} onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default TaskDetail;
