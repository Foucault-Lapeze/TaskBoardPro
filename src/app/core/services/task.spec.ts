import { TestBed } from '@angular/core/testing';
import { Task } from '../models/task.model';
import {TaskService} from './task';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have initial tasks', () => {
    const tasks = service.tasks();

    expect(tasks.length).toBe(2);
    expect(tasks[1].priority).toBe('low');
  });

  it('should add a new task', () => {
    const initialCount = service.tasks().length;

    service.addTask('Nouvelle Tâche Test', 'medium');

    const tasks = service.tasks();
    // addTask ajoute au DEBUT du tableau (unshift), donc c'est l'index 0
    const addedTask = tasks[0];

    expect(tasks.length).toBe(initialCount + 1);
    expect(addedTask.title).toBe('Nouvelle Tâche Test');
    expect(addedTask.priority).toBe('medium');
    expect(addedTask.status).toBe('todo');
    expect(addedTask.id).toBeDefined();
  });

  it('should delete a task by id', () => {
    // On supprime l'ID 1 qui existe par défaut
    service.deleteTask(1);

    const tasks = service.tasks();
    const taskFound = tasks.find(t => t.id === 1);

    // Il restait 2 tâches, on en enlève 1 -> il en reste 1
    expect(tasks.length).toBe(1);
    expect(taskFound).toBeUndefined();
  });

  it('should update an existing task', () => {
    // On cherche l'ID 2 qui existe par défaut
    const originalTask = service.tasks().find(t => t.id === 2)!;

    const modifiedTask: Task = {
      ...originalTask,
      title: 'Titre Modifié',
      status: 'done'
    };

    service.updateTask(modifiedTask);

    const updatedTaskInService = service.tasks().find(t => t.id === 2);

    expect(updatedTaskInService?.status).toBe('done');
    expect(updatedTaskInService?.title).toBe('Titre Modifié');
    // La priorité n'a pas changé, elle reste 'low'
    expect(updatedTaskInService?.priority).toBe('low');
  });

  it('should not change list if deleting non-existent id', () => {
    const initialCount = service.tasks().length;

    service.deleteTask(999); // ID qui n'existe pas

    expect(service.tasks().length).toBe(initialCount);
  });
});
