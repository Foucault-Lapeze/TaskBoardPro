export type TaskPriority = 'high' | 'medium' | 'low';

export interface Task {
  id: number;
  title: string;
  priority: TaskPriority;
  status: 'todo' | 'doing' | 'done';
}
