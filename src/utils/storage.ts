import { Task } from "../types/Task";

const STORAGE_KEY = "tasks";

// save tasks to local storage as JSON
export function saveTasks(tasks: Task[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// load tasks from local storage and parse dates
export function loadTasks(): Task[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  try {
    const parsed: any[] = JSON.parse(raw);
    return parsed.map(parseTask);
  } catch (error) {
    console.error("Failed to parse tasks:", error);
    return [];
  }
}

// Parse a raw object from localStorage into a typed Task.
function parseTask(raw: any): Task {
  return {
    ...raw,
    dueDate: raw.dueDate ? new Date(raw.dueDate) : undefined,
    createdAt: new Date(raw.createdAt),
    updatedAt: new Date(raw.updatedAt),
  };
}

