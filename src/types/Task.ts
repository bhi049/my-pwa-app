export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;                 // Unique ID for each task
  title: string;              // Required task name
  description?: string;       // Optional notes/details
  completed: boolean;         // Track completion state
  completedAt?: Date;         // Timestamp when the task was completed
  priority: Priority;         // For color-coded urgency
  dueDate?: Date;             // Used for calendar export and sorting
  createdAt: Date;            // For sorting, history, syncing
  updatedAt: Date;            // Useful for autosave, sync logic
}