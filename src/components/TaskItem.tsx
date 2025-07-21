import React from "react";
import { Task } from "../types/Task";
import TaskCard from "./TaskCard";

interface Props {
  task: Task;
}

const TaskItem: React.FC<Props> = ({ task }) => {
  return <TaskCard task={task} />;
};

export default TaskItem;
