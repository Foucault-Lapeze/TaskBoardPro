import { Injectable, signal } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksSignal = signal<Task[]>([
    { id: 1, title: 'Apprendre Angular', priority: 'high', status: 'doing' },
    { id: 2, title: 'Créer TaskBoard Pro', priority: 'low', status: 'todo' },
  ]);

  readonly tasks = this.tasksSignal.asReadonly();

  constructor() { }

  addTask(title: string, priority: 'high' | 'medium' | 'low') {
    const newTask: Task = {
      id: Date.now(),
      title,
      priority,
      status: 'todo'
    };
    this.tasksSignal.update(tasks => [...tasks, newTask]);
  }

  deleteTask(id: number) {
    this.tasksSignal.update(tasks => tasks.filter(t => t.id !== id));
  }

  updateTask(updatedTask: Task) {
    this.tasksSignal.update(tasks =>
      tasks.map(t => t.id === updatedTask.id ? updatedTask : t)
    );
  }
}
