import { Injectable, signal, computed } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private defaultTasks: Task[] = [
    { id: 1, title: 'Apprendre Angular', priority: 'high', status: 'doing' },
    { id: 2, title: 'Créer TaskBoard Pro', priority: 'low', status: 'todo' },
  ];

  private tasksSignal = signal<Task[]>(this.defaultTasks);

  readonly tasks = this.tasksSignal.asReadonly();

  doingCount = computed(() => this.tasks().filter(t => t.status === 'doing').length);
  doneCount = computed(() => this.tasks().filter(t => t.status === 'done').length);
  todoCount = computed(() => this.tasks().filter(t => t.status === 'todo').length);

  progressPercentage = signal(0);

  constructor() {
  }

  private async calculatePercentageAsync() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const currentTasks = this.tasksSignal();
    const total = currentTasks.length;
    const done = currentTasks.filter(t => t.status === 'done').length;
    if (total === 0) this.progressPercentage.set(0);
    else this.progressPercentage.set(Math.round((done / total) * 100));
  }

  addTask(title: string, priority: 'high' | 'medium' | 'low') {
    const newTask: Task = { id: Date.now(), title, priority, status: 'todo' };
    this.tasksSignal.update(tasks => [newTask, ...tasks]);
    this.calculatePercentageAsync();
  }

  deleteTask(id: number) {
    this.tasksSignal.update(tasks => tasks.filter(t => t.id !== id));
    this.calculatePercentageAsync();
  }

  updateTask(updatedTask: Task) {
    this.tasksSignal.update(tasks =>
      tasks.map(t => t.id === updatedTask.id ? updatedTask : t)
    );
    this.calculatePercentageAsync();
  }
}
