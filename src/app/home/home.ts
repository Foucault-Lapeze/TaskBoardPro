import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Task } from '../core/models/task.model';
import {TaskService} from '../core/services/task';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  private taskService = inject(TaskService);
  private fb = inject(FormBuilder);

  tasks = this.taskService.tasks;

  // --- C'EST CE QU'IL MANQUAIT ---
  editingTaskId: number | null = null;

  taskForm = this.fb.group({
    title: ['', Validators.required],
    priority: ['low']
  });

  onSubmit() {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;
      this.taskService.addTask(
        formValue.title as string,
        formValue.priority as 'high' | 'medium' | 'low'
      );
      this.taskForm.reset({ priority: 'low' });
    }
  }

  onDelete(id: number) {
    this.taskService.deleteTask(id);
  }

  startEdit(id: number) {
    this.editingTaskId = id;
  }

  cancelEdit() {
    this.editingTaskId = null;
  }

  saveEdit(task: Task, newTitle: string, newStatus: string) {
    const updatedTask: Task = {
      ...task,
      title: newTitle,
      // On force le typage ici car on sait que le select renvoie ces valeurs
      status: newStatus as 'todo' | 'doing' | 'done'
    };

    this.taskService.updateTask(updatedTask);
    this.editingTaskId = null;
  }
}
