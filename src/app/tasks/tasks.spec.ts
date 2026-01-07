import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Tasks } from './tasks';
import {TaskService} from '../core/services/task';
describe('Tasks Component', () => {
  let component: Tasks;
  let fixture: ComponentFixture<Tasks>;
  let taskService: TaskService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tasks],

      providers: [TaskService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Tasks);
    component = fixture.componentInstance;

    taskService = TestBed.inject(TaskService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should have invalid form initially (button disabled)', () => {

    expect(component.taskForm.valid).toBe(false);

    const btnAdd = fixture.nativeElement.querySelector('.btn-add');
    expect(btnAdd.disabled).toBe(true);
  });

  it('should enable button when form is valid', () => {
    component.taskForm.controls['title'].setValue('Nouvelle Tâche Test');
    fixture.detectChanges();

    const btnAdd = fixture.nativeElement.querySelector('.btn-add');
    expect(btnAdd.disabled).toBe(false);
  });

  it('should add task via service on submit', () => {
    component.taskForm.setValue({ title: 'Acheter du pain', priority: 'high' });
    const initialCount = taskService.tasks().length;
    component.onSubmit();
    expect(taskService.tasks().length).toBe(initialCount + 1);

    expect(component.taskForm.value.priority).toBe('low');
  });

  it('should display list of tasks', () => {
    const taskElements = fixture.nativeElement.querySelectorAll('.task-item');
    expect(taskElements.length).toBeGreaterThan(0);
  });

  it('should switch to edit mode when clicking modify', () => {
    expect(component.editingTaskId).toBeNull();

    const editBtn = fixture.nativeElement.querySelector('.btn-warning');
    editBtn.click();
    fixture.detectChanges();

    expect(component.editingTaskId).not.toBeNull();

    const editModeDiv = fixture.nativeElement.querySelector('.edit-mode');
    expect(editModeDiv).toBeTruthy();

    const inputTitle = fixture.nativeElement.querySelector('.edit-input');
    expect(inputTitle).toBeTruthy();
  });
});
