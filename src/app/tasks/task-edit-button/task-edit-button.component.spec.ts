import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskEditButtonComponent } from './task-edit-button.component';

describe('TaskEditButtonComponent', () => {
  let component: TaskEditButtonComponent;
  let fixture: ComponentFixture<TaskEditButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskEditButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskEditButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
