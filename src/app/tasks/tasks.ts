import {Component, inject} from '@angular/core';
import {TaskService} from '../core/services/task';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Task} from '../core/models/task.model';

@Component({
  selector: 'app-tasks',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks {
  private taskService = inject(TaskService);
  private fb = inject(FormBuilder);

  tasks = this.taskService.tasks;

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
      status: newStatus as 'todo' | 'doing' | 'done'
    };

    this.taskService.updateTask(updatedTask);
    this.editingTaskId = null;
  }
}
